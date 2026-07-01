"""
Reranking module for RAG Pipeline
Uses cross-encoder for semantic relevance scoring
"""
from typing import List
import numpy as np
from sentence_transformers import CrossEncoder
from src.config import (
    RERANKING_MODEL,
    TOP_K_RERANKED,
    RERANKING_THRESHOLD,
)
from src.models import RetrievalResult, RerankingResult


class CrossEncoderReranker:
    """
    Reranks retrieved results using a cross-encoder model
    Provides more accurate relevance scoring than embeddings alone
    """

    def __init__(self):
        self.model = CrossEncoder(RERANKING_MODEL)

    def rerank(
        self,
        query: str,
        results: List[RetrievalResult],
        top_k: int = TOP_K_RERANKED,
        threshold: float = RERANKING_THRESHOLD
    ) -> List[RerankingResult]:
        """
        Rerank results using cross-encoder
        Filters out low-relevance results based on threshold
        """
        if not results:
            return []

        # Prepare pairs for cross-encoder
        query_result_pairs = []
        for result in results:
            query_result_pairs.append([query, result.content])

        # Get cross-encoder scores
        try:
            scores = self.model.predict(query_result_pairs)
        except Exception as e:
            print(f"Cross-encoder error: {e}")
            # Fallback: return original results
            return [
                RerankingResult(
                    chunk_id=r.chunk_id,
                    content=r.content,
                    score=r.score,
                    source=r.source,
                    reranking_score=r.score,
                )
                for r in results
            ]

        # Create reranked results
        reranked = []
        for result, ce_score in zip(results, scores):
            # Normalize cross-encoder score to [0, 1] if needed
            normalized_score = 1 / (1 + np.exp(-ce_score))  # Sigmoid

            # Apply threshold
            if normalized_score < threshold:
                continue

            reranked_result = RerankingResult(
                chunk_id=result.chunk_id,
                content=result.content,
                score=result.score,
                source=result.source,
                reranking_score=float(normalized_score),
            )
            reranked.append(reranked_result)

        # Sort by reranking score
        reranked.sort(key=lambda x: x.reranking_score, reverse=True)

        # Return top-k
        return reranked[:top_k]

    def filter_by_relevance(
        self,
        query: str,
        results: List[RetrievalResult],
        threshold: float = RERANKING_THRESHOLD
    ) -> List[RetrievalResult]:
        """
        Filter results by relevance without reordering
        Useful for ensuring only relevant results are used
        """
        if not results:
            return []

        query_result_pairs = [[query, result.content] for result in results]

        try:
            scores = self.model.predict(query_result_pairs)
        except Exception as e:
            print(f"Relevance filtering error: {e}")
            return results

        filtered = []
        for result, ce_score in zip(results, scores):
            normalized_score = 1 / (1 + np.exp(-ce_score))

            if normalized_score >= threshold:
                filtered.append(result)

        return filtered
