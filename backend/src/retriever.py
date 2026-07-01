"""
Retrieval module for RAG Pipeline
Implements hybrid search combining BM25 and vector similarity
"""
import time
from typing import List, Tuple
import numpy as np
from sentence_transformers import SentenceTransformer
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from src.config import (
    EMBEDDING_MODEL,
    TOP_K_RETRIEVAL,
    HYBRID_SEARCH_ALPHA,
    SEMANTIC_SIMILARITY_THRESHOLD,
)
from src.models import RetrievalResult
from src.ingest import DataIngestionPipeline

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')


class HybridRetriever:
    """
    Implements hybrid search combining:
    1. Dense vector search (semantic similarity)
    2. Sparse BM25 search (keyword matching)
    """

    def __init__(self):
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
        self.ingest_pipeline = DataIngestionPipeline()
        self.collection = self.ingest_pipeline.get_collection()
        
        # --- NEW CODE: Rebuild BM25 from ChromaDB on Startup ---
        db_data = self.collection.get(include=["documents", "metadatas"])
        
        if db_data and db_data["documents"]:
            from src.models import ChunkData
            print(f"Rebuilding BM25 index from {len(db_data['documents'])} saved documents...")
            
            # Reconstruct dummy chunks just for the BM25 builder
            chunks = []
            for doc, meta in zip(db_data["documents"], db_data["metadatas"]):
                chunks.append(ChunkData(
                    content=doc, 
                    source=meta.get("source", ""), 
                    section="", 
                    metadata=meta
                ))
            
            self.ingest_pipeline.build_bm25_index(chunks)
        else:
            print("WARNING: ChromaDB is empty! Please run ingest.py")
            
        self.bm25_index = self.ingest_pipeline.bm25_index
        self.bm25_corpus = self.ingest_pipeline.bm25_corpus

    def dense_search(self, query: str, top_k: int = TOP_K_RETRIEVAL) -> List[Tuple[str, float]]:
        """
        Vector similarity search using ChromaDB
        Returns: [(chunk_id, score), ...]
        """
        # Generate query embedding
        query_embedding = self.embedding_model.encode(query, convert_to_numpy=True)

        # Search in ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=top_k,
            include=["embeddings", "metadatas", "documents", "distances"]
        )

        # Convert distances to similarity scores (cosine similarity)
        # ChromaDB returns distances, we convert to similarity
        dense_results = []
        if results["ids"] and len(results["ids"]) > 0:
            for chunk_id, distance in zip(results["ids"][0], results["distances"][0]):
                # Convert distance to similarity (for cosine distance)
                similarity = 1 - distance
                dense_results.append((chunk_id, similarity))

        return dense_results

    def sparse_search(self, query: str, top_k: int = TOP_K_RETRIEVAL) -> List[Tuple[str, float]]:
        """
        BM25 keyword-based search with NLTK tokenization
        Returns: [(chunk_id, score), ...]
        """
        if self.bm25_index is None or not self.bm25_corpus:
            return []

        # Tokenize query with NLTK
        stemmer = PorterStemmer()
        stop_words = set(stopwords.words('english'))

        tokens = word_tokenize(query.lower())
        query_tokens = [
            stemmer.stem(token)
            for token in tokens
            if token.isalnum() and token not in stop_words
        ]

        # If no valid tokens after filtering, return empty
        if not query_tokens:
            return []

        # Get BM25 scores
        scores = self.bm25_index.get_scores(query_tokens)

        # Get top-k indices
        top_indices = np.argsort(scores)[-top_k:][::-1]

        sparse_results = []
        for idx in top_indices:
            if scores[idx] > 0:  # Only include positive scores
                sparse_results.append((str(idx), float(scores[idx])))

        return sparse_results

    def normalize_scores(
        self,
        dense_results: List[Tuple[str, float]],
        sparse_results: List[Tuple[str, float]]
    ) -> Tuple[dict, dict]:
        """Normalize scores to [0, 1] range for fair comparison"""
        # Normalize dense scores
        dense_dict = dict(dense_results)
        if dense_dict:
            max_dense = max(dense_dict.values()) if dense_dict else 1
            dense_dict = {k: v / max_dense if max_dense > 0 else v for k, v in dense_dict.items()}

        # Normalize sparse scores
        sparse_dict = dict(sparse_results)
        if sparse_dict:
            max_sparse = max(sparse_dict.values()) if sparse_dict else 1
            sparse_dict = {k: v / max_sparse if max_sparse > 0 else v for k, v in sparse_dict.items()}

        return dense_dict, sparse_dict

    def hybrid_search(
        self,
        query: str,
        top_k: int = TOP_K_RETRIEVAL,
        alpha: float = HYBRID_SEARCH_ALPHA
    ) -> List[RetrievalResult]:
        """
        Hybrid search combining dense and sparse retrieval
        alpha: weight for dense search (1-alpha for sparse)
        Higher alpha = more weight on semantic similarity
        """
        # Perform both searches
        dense_results = self.dense_search(query, top_k)
        sparse_results = self.sparse_search(query, top_k)

        # Normalize scores
        dense_dict, sparse_dict = self.normalize_scores(dense_results, sparse_results)

        # Combine scores
        combined_scores = {}
        all_chunk_ids = set(dense_dict.keys()) | set(sparse_dict.keys())

        for chunk_id in all_chunk_ids:
            dense_score = dense_dict.get(chunk_id, 0)
            sparse_score = sparse_dict.get(chunk_id, 0)
            # Weighted combination
            combined_score = alpha * dense_score + (1 - alpha) * sparse_score
            combined_scores[chunk_id] = combined_score

        # Sort by combined score and get top-k
        sorted_results = sorted(
            combined_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )[:top_k]

        # Fetch actual documents and metadata
        retrieval_results = []
        for chunk_id, score in sorted_results:
            if score < SEMANTIC_SIMILARITY_THRESHOLD:
                continue

            try:
                doc_result = self.collection.get(
                    ids=[chunk_id],
                    include=["documents", "metadatas"]
                )

                if doc_result["ids"]:
                    content = doc_result["documents"][0]
                    metadata = doc_result["metadatas"][0] if doc_result["metadatas"] else {}

                    result = RetrievalResult(
                        chunk_id=chunk_id,
                        content=content,
                        score=score,
                        source=metadata.get("source", ""),
                        metadata=metadata
                    )
                    retrieval_results.append(result)
            except Exception as e:
                print(f"Error fetching chunk {chunk_id}: {e}")
                continue

        return retrieval_results

    def retrieve_for_queries(
        self,
        queries: List[str],
        top_k: int = TOP_K_RETRIEVAL,
        alpha: float = HYBRID_SEARCH_ALPHA
    ) -> List[RetrievalResult]:
        """
        Retrieve for multiple query variations and deduplicate
        This is used with query rewriting to improve recall
        """
        all_results = {}  # chunk_id -> best RetrievalResult

        for query in queries:
            results = self.hybrid_search(query, top_k, alpha)
            for result in results:
                if result.chunk_id not in all_results:
                    all_results[result.chunk_id] = result
                else:
                    # Keep result with higher score
                    if result.score > all_results[result.chunk_id].score:
                        all_results[result.chunk_id] = result

        # Sort by score and return
        sorted_results = sorted(
            all_results.values(),
            key=lambda x: x.score,
            reverse=True
        )

        return sorted_results
