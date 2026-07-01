"""
Quick test script to verify RAG pipeline setup
"""
import sys
import os

# Fix encoding on Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

def test_imports():
    """Test if all modules can be imported"""
    print("Testing imports...")
    try:
        from src.config import GROQ_API_KEY, LLM_MODEL
        print(f"✓ Config loaded: LLM Model = {LLM_MODEL}")

        from src.models import ChatResponse, RetrievalResult
        print("✓ Models loaded")

        from src.ingest import DataIngestionPipeline
        print("✓ Ingest module loaded")

        from src.query_processor import QueryProcessor
        print("✓ Query processor loaded")

        from src.retriever import HybridRetriever
        print("✓ Retriever loaded")

        from src.reranker import CrossEncoderReranker
        print("✓ Reranker loaded")

        from src.llm_service import LLMService
        print("✓ LLM service loaded")

        print("\n✓ All imports successful!")
        return True

    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False


def test_data_loading():
    """Test if jatin_info.json can be loaded"""
    print("\nTesting data loading...")
    try:
        from src.ingest import DataIngestionPipeline
        pipeline = DataIngestionPipeline()
        data = pipeline.load_jatin_info()

        print(f"✓ Data loaded successfully")
        print(f"  - Name: {data.get('personal_info', {}).get('name', 'N/A')}")
        print(f"  - Title: {data.get('personal_info', {}).get('title', 'N/A')}")
        print(f"  - Sections: {list(data.keys())}")

        return True

    except Exception as e:
        print(f"✗ Data loading error: {e}")
        return False


def test_chunking():
    """Test hierarchical chunking"""
    print("\nTesting hierarchical chunking...")
    try:
        from src.ingest import DataIngestionPipeline
        pipeline = DataIngestionPipeline()
        data = pipeline.load_jatin_info()
        chunks = pipeline.hierarchical_chunking(data)

        print(f"✓ Chunking successful")
        print(f"  - Total chunks created: {len(chunks)}")

        # Show chunk distribution
        chunk_types = {}
        for chunk in chunks:
            chunk_type = chunk.metadata.get("type", "unknown")
            chunk_types[chunk_type] = chunk_types.get(chunk_type, 0) + 1

        for chunk_type, count in chunk_types.items():
            print(f"  - {chunk_type}: {count} chunks")

        return True

    except Exception as e:
        print(f"✗ Chunking error: {e}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("JATIN'S PORTFOLIO RAG PIPELINE - QUICK TEST")
    print("=" * 60)

    results = []
    results.append(("Imports", test_imports()))
    results.append(("Data Loading", test_data_loading()))
    results.append(("Chunking", test_chunking()))

    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)

    all_passed = True
    for test_name, passed in results:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test_name}")
        if not passed:
            all_passed = False

    if all_passed:
        print("\n✓ All tests passed! RAG pipeline is ready.")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed. Please check the errors above.")
        sys.exit(1)
