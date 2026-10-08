"""
Automated Unit and Integration Tests
------------------------------------
Tests the Cosine Similarity pipeline, data structures operations, and FastAPI endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.algorithms.similarity import (
    clean_text,
    tokenize,
    remove_stopwords,
    build_frequency_map,
    build_vocabulary,
    create_vector,
    calculate_cosine_similarity,
    get_common_words,
    check_duplicate
)

client = TestClient(app)


# -------------------------------------------------------------
# Algorithm & Data Structure Unit Tests
# -------------------------------------------------------------

def test_clean_text():
    raw = "How Can I Learn Python?! #123"
    cleaned = clean_text(raw)
    assert cleaned == "how can i learn python 123"
    assert clean_text("") == ""


def test_tokenize():
    text = "how can i learn python"
    tokens = tokenize(text)
    assert tokens == ["how", "can", "i", "learn", "python"]
    assert isinstance(tokens, list)


def test_remove_stopwords():
    tokens = ["how", "can", "i", "learn", "python"]
    filtered = remove_stopwords(tokens)
    assert filtered == ["learn", "python"]
    assert "how" not in filtered
    assert "can" not in filtered


def test_build_frequency_map():
    tokens = ["python", "learn", "python", "code"]
    freq = build_frequency_map(tokens)
    assert isinstance(freq, dict)
    assert freq["python"] == 2
    assert freq["learn"] == 1
    assert freq["code"] == 1


def test_build_vocabulary_and_vector():
    tokens1 = ["learn", "python"]
    tokens2 = ["learn", "coding"]
    vocab = build_vocabulary(tokens1, tokens2)
    # Sorted vocabulary
    assert vocab == ["coding", "learn", "python"]
    
    freq1 = build_frequency_map(tokens1)
    freq2 = build_frequency_map(tokens2)
    
    vec1 = create_vector(freq1, vocab)
    vec2 = create_vector(freq2, vocab)
    
    assert vec1 == [0, 1, 1]
    assert vec2 == [1, 1, 0]


def test_cosine_similarity_calculation():
    # Orthogonal vectors (0 similarity)
    sim, dot, m1, m2 = calculate_cosine_similarity([1, 0], [0, 1])
    assert sim == 0.0
    assert dot == 0
    
    # Identical vectors (1.0 similarity)
    sim, dot, m1, m2 = calculate_cosine_similarity([1, 1], [1, 1])
    assert pytest.approx(sim, 0.001) == 1.0
    assert dot == 2


def test_get_common_words():
    tokens1 = ["learn", "python", "fast"]
    tokens2 = ["python", "best", "learn"]
    common = get_common_words(tokens1, tokens2)
    assert common == ["learn", "python"]  # Alphabetically sorted


# -------------------------------------------------------------
# End-to-End Test Cases (from Requirements)
# -------------------------------------------------------------

def test_test_case_1_high_similarity():
    """Test Case 1: Learning Python query rephrased -> High similarity"""
    q1 = "How can I learn Python?"
    q2 = "What is the best way to learn Python?"
    res = check_duplicate(q1, q2)
    
    assert res["similarity"] >= 70.0
    assert res["is_duplicate"] is True
    assert res["status"] == "Duplicate / Highly Similar"
    assert "python" in res["common_words"]
    assert "learn" in res["common_words"]


def test_test_case_2_unrelated():
    """Test Case 2: Cooking rice vs Capital of India -> Low/Zero similarity"""
    q1 = "How do I cook rice?"
    q2 = "What is the capital of India?"
    res = check_duplicate(q1, q2)
    
    assert res["similarity"] < 20.0
    assert res["is_duplicate"] is False
    assert res["status"] == "Not Duplicate"
    assert len(res["common_words"]) == 0


def test_test_case_3_moderate_similarity():
    """Test Case 3: Programming skills vs coding skills"""
    q1 = "How can I improve my programming skills?"
    q2 = "What are the best ways to improve coding skills?"
    res = check_duplicate(q1, q2)
    
    assert res["similarity"] > 20.0
    assert "skills" in res["common_words"]
    assert "improve" in res["common_words"]


def test_exact_duplicates():
    q1 = "Where is the Eiffel Tower located?"
    q2 = "Where is the Eiffel Tower located?"
    res = check_duplicate(q1, q2)
    assert res["similarity"] == 100.0
    assert res["is_duplicate"] is True


# -------------------------------------------------------------
# API Endpoint Integration Tests
# -------------------------------------------------------------

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["application"] == "Quora Duplicate Question Detector"


def test_api_check_duplicate_success():
    payload = {
        "question1": "How can I learn Python?",
        "question2": "What is the best way to learn Python?",
        "threshold": 0.70
    }
    response = client.post("/api/check-duplicate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "similarity" in data
    assert data["similarity"] >= 70.0
    assert data["is_duplicate"] is True
    assert "learn" in data["common_words"]
    assert "python" in data["common_words"]


def test_api_check_duplicate_empty_q1():
    payload = {
        "question1": "",
        "question2": "What is the best way to learn Python?"
    }
    response = client.post("/api/check-duplicate", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Please enter Question 1."


def test_api_check_duplicate_empty_q2():
    payload = {
        "question1": "How can I learn Python?",
        "question2": "   "
    }
    response = client.post("/api/check-duplicate", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Please enter Question 2."


def test_api_samples_endpoint():
    response = client.get("/api/samples")
    assert response.status_code == 200
    samples = response.json()
    assert isinstance(samples, list)
    assert len(samples) >= 10
    first = samples[0]
    assert "question1" in first
    assert "question2" in first
    assert "category" in first
