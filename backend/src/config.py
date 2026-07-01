"""
Configuration settings for the Advanced RAG Pipeline
"""
import os
from dotenv import load_dotenv

load_dotenv()

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Model Configuration
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
RERANKING_MODEL = "cross-encoder/ms-marco-MiniLM-L-12-v2"
LLM_MODEL = "llama-3.3-70b-versatile"
GENERATION_TEMPERATURE = 0.3  # Lower temp to reduce hallucination
MAX_TOKENS = 1024

# RAG Configuration
CHUNK_SIZE = 500  # Characters per chunk
CHUNK_OVERLAP = 100  # Overlap between chunks
TOP_K_RETRIEVAL = 10  # Initial retrieval candidates
TOP_K_RERANKED = 5  # Final reranked results
HYBRID_SEARCH_ALPHA = 0.6  # Weight for vector search (1-alpha for BM25)

# Reranking Thresholds
RERANKING_THRESHOLD = -100.0
SEMANTIC_SIMILARITY_THRESHOLD = 0.0

# Vector Store Configuration
VECTOR_STORE_PATH = "./vector_store"
CHROMADB_COLLECTION_NAME = "jatin_portfolio"

# Data Configuration
DATA_PATH = "./data/jatin_info.json"

# Response Configuration
MAX_CONTEXT_LENGTH = 3000  # Max characters of context to include
CITATION_FORMAT = "markdown"  # or "html"

# Query Processing
QUERY_REWRITING_ENABLED = True
MULTI_QUERY_ENABLED = True
NUM_QUERIES_TO_GENERATE = 3

# Groq API Configuration
GROQ_REQUEST_TIMEOUT = 30
GROQ_MAX_RETRIES = 3

# System Prompt for LLM
SYSTEM_PROMPT = """You are Jatin Rajani's AI assistant, helping visitors learn about his experience, skills, and projects.

IMPORTANT RULES:
1. ONLY answer questions based on the provided context from Jatin's resume and portfolio data
2. If information is not in the context, clearly state: "I don't have that information in Jatin's portfolio"
3. Never make up or assume information about projects, experiences, or skills
4. Be conversational, friendly, and professional
5. Cite specific projects, companies, or achievements when relevant
6. For technical questions, provide specific examples from the context
7. If asked about something outside Jatin's resume, politely redirect to what's available

Context will be provided below. Use ONLY this context to answer questions."""

# Prompt Templates
QUERY_REWRITING_PROMPT = """Given a user query, generate 3 alternative phrasings of the same query for better retrieval.
Return only the queries, one per line, without numbering or explanations.

Original query: {query}"""

INTENT_DETECTION_PROMPT = """Classify the user's intent into one category:
- greeting: General greetings and salutations
- skills_query: Questions about technical skills and expertise
- project_query: Questions about specific projects
- experience_query: Questions about work experience or internships
- education_query: Questions about education and background
- availability_query: Questions about availability, location, work type
- general_inquiry: Other questions

User query: {query}

Respond with only the category name."""

# Logging Configuration
LOG_LEVEL = "INFO"
LOG_FILE = "./logs/rag_pipeline.log"
