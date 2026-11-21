import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_assistant_health():
    response = client.get("/api/assistant/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert data["rag_indexed_chunks"] >= 5
    assert "en" in data["supported_languages"]
    assert "hi" in data["supported_languages"]

def test_assistant_chat_english():
    payload = {
        "message": "How should I manage soil acidity (pH 5.4) in my Cachar farm?",
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "conversation_id" in data
    assert len(data["answer"]) > 50
    assert "Lime" in data["answer"] or "lime" in data["answer"]
    assert len(data["sources"]) >= 1
    assert "Assam Agricultural University" in data["sources"][0]["organization"] or "ICAR" in data["sources"][0]["organization"]

def test_assistant_chat_hindi():
    payload = {
        "message": "असम में शाली धान की बुवाई का समय क्या है?",
        "language": "hi"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["language"] == "hi"
    assert len(data["answer"]) > 50
    assert len(data["sources"]) >= 1

def test_assistant_chat_history():
    # 1. Post a message
    res1 = client.post("/api/assistant/chat", json={"message": "What is Sali rice?", "language": "en"})
    assert res1.status_code == 200
    conv_id = res1.json()["conversation_id"]

    # 2. Get history
    res2 = client.get(f"/api/assistant/history/{conv_id}")
    assert res2.status_code == 200
    hist = res2.json()
    assert hist["conversation_id"] == conv_id
    assert len(hist["messages"]) >= 2
    assert hist["messages"][0]["role"] == "user"
    assert hist["messages"][1]["role"] == "assistant"
