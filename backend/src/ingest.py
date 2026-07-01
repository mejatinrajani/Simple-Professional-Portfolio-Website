"""
Data ingestion and chunking for RAG Pipeline
Processes jatin_info.json and creates embeddings
"""
import json
import os
from typing import List, Dict, Any
import chromadb
from sentence_transformers import SentenceTransformer
from rank_bm25 import BM25Okapi
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from src.config import (
    DATA_PATH,
    VECTOR_STORE_PATH,
    CHROMADB_COLLECTION_NAME,
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    EMBEDDING_MODEL,
)
from src.models import ChunkData

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')


class DataIngestionPipeline:
    """Handles data loading, chunking, and embedding generation"""

    def __init__(self):
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
        self.chroma_client = chromadb.PersistentClient(path=VECTOR_STORE_PATH)
        self.collection = None
        self.bm25_corpus = []
        self.bm25_index = None
        self.chunk_metadata = {}

    def load_jatin_info(self) -> Dict[str, Any]:
        """Load jatin_info.json"""
        try:
            with open(DATA_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            raise Exception(f"Data file not found: {DATA_PATH}")
        except json.JSONDecodeError:
            raise Exception(f"Invalid JSON in {DATA_PATH}")

    def hierarchical_chunking(self, data: Dict[str, Any]) -> List[ChunkData]:
        """
        Create chunks using hierarchical strategy:
        1. Split by logical sections (education, experience, projects)
        2. Further split large sections by subsections
        3. Apply fixed-size chunking for consistency
        """
        chunks = []
        chunk_id = 0

        # Personal info - treat as single chunk
        if "personal_info" in data:
            content = self._dict_to_text(data["personal_info"], "Personal Information")
            chunk = ChunkData(
                content=content,
                source="personal_info",
                section="contact",
                metadata={
                    "type": "personal",
                    "chunk_id": chunk_id,
                    "section": "personal_info",
                }
            )
            chunks.append(chunk)
            chunk_id += 1

        # Professional summary
        if "summary" in data:
            content = data["summary"]
            chunk = ChunkData(
                content=content,
                source="summary",
                section="summary",
                metadata={
                    "type": "summary",
                    "chunk_id": chunk_id,
                    "section": "summary",
                }
            )
            chunks.append(chunk)
            chunk_id += 1

        # Education
        if "education" in data:
            for edu in data["education"]:
                content = self._dict_to_text(edu, "Education")
                chunk = ChunkData(
                    content=content,
                    source="education",
                    section="degree",
                    metadata={
                        "type": "education",
                        "chunk_id": chunk_id,
                        "institution": edu.get("institution", ""),
                    }
                )
                chunks.append(chunk)
                chunk_id += 1

        # Professional Experience
        if "professional_experience" in data:
            for exp in data["professional_experience"]:
                content = self._dict_to_text(exp, "Professional Experience")
                chunk = ChunkData(
                    content=content,
                    source="professional_experience",
                    section=exp.get("title", ""),
                    metadata={
                        "type": "experience",
                        "chunk_id": chunk_id,
                        "company": exp.get("company", ""),
                        "title": exp.get("title", ""),
                        "duration": exp.get("duration", ""),
                    }
                )
                chunks.append(chunk)
                chunk_id += 1

        # Technical Projects - each project as separate chunk
        if "projects" in data:
            for project in data["projects"]:
                content = self._dict_to_text(project, "Project")
                chunk = ChunkData(
                    content=content,
                    source="projects",
                    section=project.get("name", ""),
                    metadata={
                        "type": "project",
                        "chunk_id": chunk_id,
                        "project_name": project.get("name", ""),
                        "technologies": project.get("technologies", []),
                    }
                )
                chunks.append(chunk)
                chunk_id += 1

        # Technical Skills - organized by category
        if "technical_skills" in data:
            for skill_category, skill_data in data["technical_skills"].items():
                if isinstance(skill_data, dict):
                    content = self._dict_to_text(skill_data, f"Skills - {skill_category}")
                else:
                    content = f"Technical Skills - {skill_category}:\n{str(skill_data)}"

                chunk = ChunkData(
                    content=content,
                    source="technical_skills",
                    section=skill_category,
                    metadata={
                        "type": "skills",
                        "chunk_id": chunk_id,
                        "category": skill_category,
                    }
                )
                chunks.append(chunk)
                chunk_id += 1

        # Key Achievements
        if "achievements" in data:
            achievements_text = "\n".join(
                [f"- {achievement}" for achievement in data["achievements"]]
            )
            chunk = ChunkData(
                content=f"Key Achievements:\n{achievements_text}",
                source="achievements",
                section="achievements",
                metadata={
                    "type": "achievements",
                    "chunk_id": chunk_id,
                }
            )
            chunks.append(chunk)
            chunk_id += 1

        # FAQ - each Q&A as separate chunk for better retrieval
        if "faq" in data:
            for question, answer in data["faq"].items():
                content = f"Q: {question}\nA: {answer}"
                chunk = ChunkData(
                    content=content,
                    source="faq",
                    section="faq",
                    metadata={
                        "type": "faq",
                        "chunk_id": chunk_id,
                        "question": question,
                    }
                )
                chunks.append(chunk)
                chunk_id += 1

        return chunks

    def _dict_to_text(self, d: Dict[str, Any], title: str = "") -> str:
        """Convert dictionary to readable text format"""
        lines = []
        if title:
            lines.append(f"=== {title} ===")

        for key, value in d.items():
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    if isinstance(item, dict):
                        lines.append(f"  {self._dict_to_text(item).strip()}")
                    else:
                        lines.append(f"  - {item}")
            elif isinstance(value, dict):
                lines.append(f"{key}:")
                lines.append(self._dict_to_text(value))
            else:
                lines.append(f"{key}: {value}")

        return "\n".join(lines)

    def generate_embeddings(self, chunks: List[ChunkData]) -> Dict[str, np.ndarray]:
        """Generate embeddings for all chunks"""
        texts = [chunk.content for chunk in chunks]
        embeddings = self.embedding_model.encode(texts, convert_to_numpy=True)

        embedding_dict = {}
        for chunk, embedding in zip(chunks, embeddings):
            embedding_dict[str(chunk.metadata["chunk_id"])] = embedding

        return embedding_dict

    def build_bm25_index(self, chunks: List[ChunkData]):
        """Build BM25 index for sparse retrieval with NLTK tokenization"""
        stemmer = PorterStemmer()
        stop_words = set(stopwords.words('english'))

        # Tokenize chunks with stemming and stop word removal
        corpus = []
        for chunk in chunks:
            # Tokenize text
            tokens = word_tokenize(chunk.content.lower())

            # Remove punctuation, stop words, and apply stemming
            filtered_tokens = [
                stemmer.stem(token)
                for token in tokens
                if token.isalnum() and token not in stop_words
            ]

            corpus.append(filtered_tokens)

        self.bm25_corpus = corpus
        self.bm25_index = BM25Okapi(corpus)

    def store_in_chromadb(self, chunks: List[ChunkData], embeddings: Dict[str, np.ndarray]):
        """Store chunks and embeddings in ChromaDB"""
        # Delete existing collection if it exists
        try:
            self.chroma_client.delete_collection(name=CHROMADB_COLLECTION_NAME)
        except:
            pass

        # Create new collection
        self.collection = self.chroma_client.get_or_create_collection(
            name=CHROMADB_COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )

        # Add chunks to collection
        ids = []
        documents = []
        metadatas = []
        embedding_list = []

        for chunk in chunks:
            chunk_id = str(chunk.metadata["chunk_id"])
            ids.append(chunk_id)
            documents.append(chunk.content)
            metadatas.append(chunk.metadata)
            embedding_list.append(embeddings[chunk_id].tolist())

        # Add to ChromaDB
        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embedding_list,
            metadatas=metadatas
        )

    def ingest(self):
        """Execute full ingestion pipeline"""
        print("Loading data...")
        data = self.load_jatin_info()

        print("Creating chunks...")
        chunks = self.hierarchical_chunking(data)
        print(f"Created {len(chunks)} chunks")

        print("Generating embeddings...")
        embeddings = self.generate_embeddings(chunks)

        print("Building BM25 index...")
        self.build_bm25_index(chunks)

        print("Storing in ChromaDB...")
        self.store_in_chromadb(chunks, embeddings)

        print(f"Ingestion complete! Stored {len(chunks)} chunks")
        return chunks

    def get_collection(self):
        """Get ChromaDB collection"""
        if self.collection is None:
            self.collection = self.chroma_client.get_or_create_collection(
                name=CHROMADB_COLLECTION_NAME
            )
        return self.collection

if __name__ == "__main__":
    print("Starting ingestion process...")
    pipeline = DataIngestionPipeline()
    pipeline.ingest()