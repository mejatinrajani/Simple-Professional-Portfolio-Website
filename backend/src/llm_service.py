"""
LLM Service module for RAG Pipeline
Handles generation using Groq API with hallucination prevention
"""
import time
from typing import List, Dict, Any, Tuple
from groq import Groq
from src.config import (
    GROQ_API_KEY,
    LLM_MODEL,
    GENERATION_TEMPERATURE,
    MAX_TOKENS,
    MAX_CONTEXT_LENGTH,
    SYSTEM_PROMPT,
)
from src.models import RerankingResult


class LLMService:
    """
    Manages LLM generation using Groq API
    Focuses on accurate, grounded responses without hallucination
    """

    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY)
        self.model = LLM_MODEL

    def assemble_context(
        self,
        results: List[RerankingResult],
        max_length: int = MAX_CONTEXT_LENGTH
    ) -> Tuple[str, List[Dict[str, Any]]]:
        """
        Assemble context from reranked results with deduplication
        Tracks seen chunk_ids to prevent duplicate content
        Respects max_length to avoid token limit issues
        """
        context_parts = []
        sources = []
        current_length = 0
        seen_chunk_ids = set() 

        for result in results:
            if result.chunk_id in seen_chunk_ids:
                continue

            # Safely extract metadata using getattr to prevent crashes
            metadata = getattr(result, "metadata", {})
            
            source_info = {
                "section": getattr(result, "source", "Unknown"),
                "subsection": metadata.get("section", ""),
                "relevance_score": round(getattr(result, "reranking_score", 0.0), 3),
            }

            text_to_add = f"[Source: {source_info['section']}]\n{result.content}\n\n"

            if current_length + len(text_to_add) > max_length:
                break

            context_parts.append(text_to_add)
            sources.append(source_info)
            seen_chunk_ids.add(result.chunk_id) 
            current_length += len(text_to_add)

        context = "".join(context_parts)
        return context, sources

    def generate_response(
        self,
        query: str,
        context: str,
        conversation_history: List[Dict[str, str]] = None
    ) -> Tuple[str, float]:
        """
        Generate response using Groq API
        Returns: (response_text, confidence_score)
        """
        if not context:
            fallback_response = (
                "I don't have specific information about that in Jatin's portfolio. "
                "Could you try rephrasing your question or ask about his skills, "
                "projects, or experience?"
            )
            return fallback_response, 0.3

        messages = []

        if conversation_history:
            for msg in conversation_history[-4:]: 
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })

        user_message = f"""Based on the following information about Jatin, answer this question:

Question: {query}

Available Information:
{context}

Remember:
- Only use information from the provided context
- If the answer isn't in the context, say so explicitly
- Include specific details from the context when relevant"""

        messages.append({
            "role": "user",
            "content": user_message
        })

        try:
            api_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

            # CRITICAL FIX: All parameters must be explicitly named (keyword arguments)
            response = self.client.chat.completions.create(
                model=self.model,
                max_tokens=MAX_TOKENS,
                temperature=GENERATION_TEMPERATURE,
                messages=api_messages
            )

            response_text = response.choices[0].message.content
            confidence = self._calculate_confidence(response_text, context)
            
            return response_text, confidence

        except Exception as e:
            print(f"LLM generation error: {e}")
            error_response = (
                "I encountered an error while generating a response. "
                "Please try again or rephrase your question."
            )
            return error_response, 0.0

    def _calculate_confidence(self, response: str, context: str) -> float:
        """Calculate confidence score based on response heuristics."""
        confidence = 0.7 

        negative_phrases = [
            "i don't know", "i'm not sure", "i don't have",
            "i'm not aware", "unclear", "not found",
            "unable to find", "cannot determine"
        ]

        response_lower = response.lower()
        for phrase in negative_phrases:
            if phrase in response_lower:
                confidence -= 0.3
                break

        if len(response) > 200: 
            confidence += 0.1

        if "[" in response or "(" in response: 
            confidence += 0.05

        question_count = response.count("?")
        if question_count > 2:
            confidence -= 0.1

        return max(0.0, min(1.0, confidence))

    def validate_response(self, response: str, context: str) -> Tuple[bool, str]:
        """Validate that response is grounded in provided context."""
        hallucination_indicators = [
            "i believe", "i think", "probably", "might",
            "could be", "seems like", "i imagine"
        ]

        response_lower = response.lower()
        hallucination_count = sum(
            1 for indicator in hallucination_indicators
            if indicator.lower() in response_lower
        )

        if hallucination_count > 3:
            return False, "Response contains too much speculation"

        if "i don't have" in response_lower or "not in" in response_lower:
            return True, "Appropriately indicates missing information"

        return True, "Valid response"

    def generate_with_validation(
        self,
        query: str,
        context: str,
        conversation_history: List[Dict[str, str]] = None,
        max_retries: int = 2
    ) -> Tuple[str, float, bool]:
        """Generate response with validation and retries."""
        for attempt in range(max_retries):
            
            # Fetch tuple safely
            result = self.generate_response(query, context, conversation_history)
            
            # Safety check to prevent NoneType unpacking crash
            if result is None:
                return "I encountered an internal error formatting the response.", 0.0, False
                
            response, confidence = result

            is_valid, reason = self.validate_response(response, context)

            if is_valid:
                return response, confidence, True

            print(f"Validation failed (attempt {attempt + 1}): {reason}")

        return response, confidence, False