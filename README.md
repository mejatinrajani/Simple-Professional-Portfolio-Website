# Professional Portfolio and RAG Assistant

This repository contains the source code for a professional portfolio website, featuring a React-based frontend and a Python FastAPI backend. The system integrates a custom Retrieval-Augmented Generation (RAG) pipeline to power an intelligent virtual assistant capable of answering queries regarding professional experience, technical skills, and projects.

## Architecture Overview

The application is divided into two primary services:

1. **Frontend (React + Vite):** A responsive, optimized user interface providing portfolio details and a dedicated chat interface for the virtual assistant.
2. **Backend (FastAPI):** A high-performance API serving the RAG pipeline. It utilizes ChromaDB for vector storage and integrates with the Groq API for rapid inference.

## Technical Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Python, FastAPI, Uvicorn
* **AI/ML Infrastructure:** 
  * Groq API (LLM Inference)
  * ChromaDB (Vector Database)
  * Sentence Transformers (Embeddings)
  * Rank-BM25 (Sparse Retrieval)

## Local Development Setup

### Prerequisites
* Node.js (v18 or higher)
* Python (3.10 recommended)
* Git

### Frontend Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend