"""
Main FastAPI application for Jatin's Portfolio RAG Chatbot
Advanced Vector RAG Pipeline with query rewriting, hybrid search, and cross-encoder reranking
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging
from src.routes import router
from src.config import LOG_LEVEL, LOG_FILE

# Setup logging
os.makedirs("./logs", exist_ok=True)
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Jatin's Portfolio RAG Chatbot",
    description="Advanced Vector RAG Pipeline with query rewriting, hybrid search, and cross-encoder reranking",
    version="1.0.0"
)

# CORS middleware for frontend integration
# Configure for your frontend domain(s)
cors_origins = [
    "http://localhost:5173",      # Vite dev server
    "http://localhost:3000",       # Alternative dev port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Add production URLs here when deploying
# cors_origins.extend([
#     "https://yourdomain.com",
#     "https://www.yourdomain.com",
# ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Mount static files if they exist
if os.path.exists("./public"):
    app.mount("/public", StaticFiles(directory="./public"), name="public")

# Include routes
app.include_router(router, prefix="/api", tags=["chat"])


@app.on_event("startup")
async def startup_event():
    """Initialize RAG pipeline on startup"""
    logger.info("Starting Jatin's Portfolio RAG Chatbot...")

    try:
        # Initialize and ingest data
        from src.ingest import DataIngestionPipeline
        pipeline = DataIngestionPipeline()

        logger.info("Checking if vector store exists...")
        try:
            # Try to load existing collection
            pipeline.get_collection()
            logger.info("Loaded existing vector store")
        except:
            # If not exists, create new one
            logger.info("Creating new vector store and ingesting data...")
            chunks = pipeline.ingest()
            logger.info(f"Successfully ingested {len(chunks)} chunks")

    except Exception as e:
        logger.error(f"Failed to initialize RAG pipeline: {e}")
        raise


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "Jatin's Portfolio RAG Chatbot",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/api/health",
            "stats": "/api/stats",
            "reingest": "/api/reingest",
        }
    }


@app.get("/docs", include_in_schema=False)
async def swagger_ui():
    """Swagger UI documentation"""
    pass


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_excludes=["vector_store/*", "*.sqlite3", "*.db"],
        log_level="info"
    )
