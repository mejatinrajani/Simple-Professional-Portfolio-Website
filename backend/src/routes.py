"""
FastAPI routes for RAG Pipeline
Exposes chat and management endpoints
"""
import time
import uuid
from fastapi import APIRouter, HTTPException
from src.models import ConversationMessage, ChatResponse, RAGMetrics
from src.query_processor import QueryProcessor
from src.retriever import HybridRetriever
from src.reranker import CrossEncoderReranker
from src.llm_service import LLMService

router = APIRouter()

# Initialize services
query_processor = QueryProcessor()
retriever = HybridRetriever()
reranker = CrossEncoderReranker()
llm_service = LLMService()


@router.post("/chat")
async def chat(message: ConversationMessage) -> ChatResponse:
    """
    Main chat endpoint for portfolio RAG
    Processes query through full RAG pipeline
    """
    try:
        # Generate conversation ID if not provided
        conversation_id = message.conversation_id or str(uuid.uuid4())

        # Start timing
        start_time = time.time()
        retrieval_start = time.time()

        # Step 1: Query Analysis
        query_analysis = query_processor.analyze_query(
            message.message,
            conversation_id
        )

        # Step 2: Retrieval
        if query_analysis.requires_context:
            # Use expanded queries for better retrieval
            retrieved_results = retriever.retrieve_for_queries(
                query_analysis.expanded_queries,
                top_k=10
            )
        else:
            retrieved_results = []

        retrieval_time = (time.time() - retrieval_start) * 1000

        # Step 3: Reranking
        reranking_start = time.time()
        reranked_results = reranker.rerank(
            query_analysis.original_query,
            retrieved_results,
            top_k=5
        )
        reranking_time = (time.time() - reranking_start) * 1000

        # Step 4: Context Assembly
        context, sources = llm_service.assemble_context(reranked_results)

        # Step 5: LLM Generation
        generation_start = time.time()
        conversation_history = query_processor.get_conversation_history(conversation_id)

        response_text, confidence = llm_service.generate_response(
            query_analysis.original_query,
            context,
            conversation_history
        )

        generation_time = (time.time() - generation_start) * 1000

        # Add to conversation history
        query_processor.add_to_conversation_history(
            conversation_id,
            "user",
            message.message
        )
        query_processor.add_to_conversation_history(
            conversation_id,
            "assistant",
            response_text
        )

        # Prepare metrics
        total_time = (time.time() - start_time) * 1000
        metrics = RAGMetrics(
            retrieval_time_ms=retrieval_time,
            reranking_time_ms=reranking_time,
            generation_time_ms=generation_time,
            total_time_ms=total_time,
            num_chunks_retrieved=len(retrieved_results),
            num_chunks_reranked=len(reranked_results),
            avg_confidence=confidence,
        )

        # Prepare retrieval details
        retrieval_details = {
            "query_analysis": {
                "original_query": query_analysis.original_query,
                "expanded_queries": query_analysis.expanded_queries,
                "intent": query_analysis.intent,
                "is_followup": query_analysis.is_followup,
            },
            "retrieval_count": len(retrieved_results),
            "reranked_count": len(reranked_results),
            "context_length": len(context),
        }

        return ChatResponse(
            answer=response_text,
            sources=sources,
            conversation_id=conversation_id,
            confidence_score=confidence,
            retrieval_details=retrieval_details,
        )

    except Exception as e:
        print(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "jatin-portfolio-rag",
        "timestamp": time.time(),
    }


@router.post("/reingest")
async def reingest():
    """
    Reingest data and rebuild vector stores
    Useful after updating jatin_info.json
    """
    try:
        from src.ingest import DataIngestionPipeline

        pipeline = DataIngestionPipeline()
        chunks = pipeline.ingest()

        # Reinitialize retriever with new data
        global retriever
        retriever = HybridRetriever()

        return {
            "status": "success",
            "message": f"Reingested {len(chunks)} chunks",
            "chunks_count": len(chunks),
        }

    except Exception as e:
        print(f"Reingest error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def stats():
    """Get RAG pipeline statistics"""
    return {
        "service": "jatin-portfolio-rag",
        "models": {
            "embedding": "sentence-transformers/all-MiniLM-L6-v2",
            "reranking": "cross-encoder/ms-marco-MiniLM-L-12-v2",
            "llm": "mixtral-8x7b-32768 (Groq)",
        },
        "configuration": {
            "chunk_size": 500,
            "top_k_retrieval": 10,
            "top_k_reranked": 5,
            "hybrid_search_alpha": 0.6,
        },
    }
