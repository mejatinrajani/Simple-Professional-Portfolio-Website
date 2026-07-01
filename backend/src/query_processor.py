"""
Query processing module for RAG Pipeline
Handles query rewriting, expansion, and intent detection
"""
from typing import List, Dict, Any
from groq import Groq
from src.config import (
    GROQ_API_KEY,
    LLM_MODEL,
    QUERY_REWRITING_PROMPT,
    INTENT_DETECTION_PROMPT,
    NUM_QUERIES_TO_GENERATE,
    GENERATION_TEMPERATURE,
)
from src.models import QueryAnalysis


class QueryProcessor:
    """Processes and analyzes user queries"""

    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY)
        self.conversation_history = {}

    def rewrite_query(self, query: str) -> List[str]:
        """
        Generate alternative query phrasings for better retrieval
        Returns the original query plus expanded versions
        """
        try:
            # UPDATED: Using Groq's correct chat.completions API syntax
            response = self.client.chat.completions.create(
                model=LLM_MODEL,
                max_tokens=500,
                temperature=GENERATION_TEMPERATURE,
                messages=[
                    {
                        "role": "user",
                        "content": QUERY_REWRITING_PROMPT.format(query=query)
                    }
                ]
            )

            # UPDATED: Correct path to extract text from Groq response
            response_text = response.choices[0].message.content
            
            # Parse response - should be queries separated by newlines
            rewritten_queries = [q.strip() for q in response_text.split('\n') if q.strip()]

            # Include original query
            all_queries = [query] + rewritten_queries[:NUM_QUERIES_TO_GENERATE - 1]
            return all_queries

        except Exception as e:
            print(f"Query rewriting error: {e}")
            # Fallback: return original query if rewriting fails
            return [query]

    def detect_intent(self, query: str) -> str:
        """
        Classify user's intent to provide context-aware responses
        Categories: greeting, skills_query, project_query, experience_query,
                    education_query, availability_query, general_inquiry
        """
        try:
            # UPDATED: Using Groq's correct chat.completions API syntax
            response = self.client.chat.completions.create(
                model=LLM_MODEL,
                max_tokens=50,
                temperature=0.1,  # Very low temp for classification
                messages=[
                    {
                        "role": "user",
                        "content": INTENT_DETECTION_PROMPT.format(query=query)
                    }
                ]
            )

            # UPDATED: Correct path to extract text from Groq response
            intent = response.choices[0].message.content.strip().lower()
            return intent

        except Exception as e:
            print(f"Intent detection error: {e}")
            return "general_inquiry"

    def is_followup_question(self, query: str, conversation_id: str) -> bool:
        """
        Determine if query is a follow-up to previous conversation
        """
        if conversation_id not in self.conversation_history:
            return False

        # Check for common follow-up patterns
        followup_keywords = [
            "tell me more", "what about", "can you explain",
            "how does that work", "more details", "elaborate",
            "and you", "what else", "any other"
        ]

        query_lower = query.lower()
        return any(keyword in query_lower for keyword in followup_keywords)

    def requires_context(self, intent: str) -> bool:
        """
        Determine if query needs RAG context retrieval
        Some intents might be handled without retrieval
        """
        no_retrieval_intents = ["greeting"]
        return intent not in no_retrieval_intents

    def analyze_query(self, query: str, conversation_id: str = None) -> QueryAnalysis:
        """
        Full query analysis pipeline
        Returns comprehensive query information for retrieval
        """
        # Detect intent
        intent = self.detect_intent(query)

        # Check if follow-up
        is_followup = self.is_followup_question(query, conversation_id) if conversation_id else False

        # Expand query for better retrieval
        expanded_queries = self.rewrite_query(query)

        # Determine if context retrieval needed
        requires_ctx = self.requires_context(intent)

        analysis = QueryAnalysis(
            original_query=query,
            expanded_queries=expanded_queries,
            intent=intent,
            is_followup=is_followup,
            requires_context=requires_ctx
        )

        return analysis

    def get_conversation_history(self, conversation_id: str) -> List[Dict[str, str]]:
        """Get conversation history for context"""
        if conversation_id in self.conversation_history:
            return self.conversation_history[conversation_id]
        return []

    def add_to_conversation_history(
        self,
        conversation_id: str,
        role: str,
        content: str
    ):
        """Add message to conversation history"""
        if conversation_id not in self.conversation_history:
            self.conversation_history[conversation_id] = []

        self.conversation_history[conversation_id].append({ 
            "role": role,
            "content": content
        })

        # Keep only last 10 messages to avoid memory issues
        if len(self.conversation_history[conversation_id]) > 10:
            self.conversation_history[conversation_id] = self.conversation_history[conversation_id][-10:]