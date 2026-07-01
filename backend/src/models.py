"""
Data models for RAG Pipeline
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from enum import Enum


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Message(BaseModel):
    """Single message in conversation"""
    role: MessageRole
    content: str


class ConversationMessage(BaseModel):
    """User message for chat endpoint"""
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Response from chat endpoint"""
    answer: str
    sources: List[Dict[str, Any]]
    conversation_id: str
    confidence_score: float
    retrieval_details: Optional[Dict[str, Any]] = None


class ChunkData(BaseModel):
    """Represents a chunk of text with metadata"""
    content: str
    source: str  # Section name from jatin_info.json
    section: str  # Subsection
    metadata: Dict[str, Any]


class RetrievalResult(BaseModel):
    """Result from retrieval"""
    chunk_id: str
    content: str
    score: float
    source: str
    metadata: Dict[str, Any]


class RerankingResult(BaseModel):
    """Result after reranking"""
    chunk_id: str
    content: str
    score: float
    source: str
    reranking_score: float
    metadata: Dict[str, Any] = {}


class QueryAnalysis(BaseModel):
    """Analysis of user query"""
    original_query: str
    expanded_queries: List[str]
    intent: str
    is_followup: bool
    requires_context: bool


class GenerationContext(BaseModel):
    """Context passed to LLM for generation"""
    query: str
    retrieved_chunks: List[str]
    sources: List[Dict[str, Any]]
    chat_history: Optional[List[Message]] = None


class RAGMetrics(BaseModel):
    """Metrics for RAG pipeline performance"""
    retrieval_time_ms: float
    reranking_time_ms: float
    generation_time_ms: float
    total_time_ms: float
    num_chunks_retrieved: int
    num_chunks_reranked: int
    avg_confidence: float
