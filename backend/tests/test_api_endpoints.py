import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_login_demo_user():
    response = client.post("/api/auth/login", json={
        "mobile_or_email": "9876543210",
        "password": "Kisan@2026"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["mobile_number"] == "9876543210"

def test_crop_recommendation():
    payload = {
        "nitrogen": 90.0,
        "phosphorus": 42.0,
        "potassium": 43.0,
        "temperature": 21.0,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 200.0,
        "season": "Kharif",
        "state": "Maharashtra",
        "district": "Pune"
    }
    response = client.post("/api/crops/recommend", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert "recommended_crop" in res_data
    assert "confidence" in res_data
    assert "sowing_period" in res_data

def test_weather_endpoints():
    current_resp = client.get("/api/weather/current?district=Pune&state=Maharashtra")
    assert current_resp.status_code == 200
    assert "temperature" in current_resp.json()

    forecast_resp = client.get("/api/weather/forecast?district=Pune")
    assert forecast_resp.status_code == 200
    assert len(forecast_resp.json()["forecast"]) == 5

def test_soil_analysis():
    payload = {
        "nitrogen": 120.0,
        "phosphorus": 15.0,
        "potassium": 150.0,
        "ph": 6.8,
        "organic_carbon": 0.45
    }
    response = client.post("/api/soil/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "soil_quality_score" in data
    assert len(data["recommendations"]) > 0

def test_mandi_prices():
    response = client.get("/api/market/prices?state=Maharashtra&commodity=Wheat")
    assert response.status_code == 200
    data = response.json()
    assert "records" in data
    assert data["total_count"] >= 1

def test_ai_chat():
    response = client.post("/api/ai/chat", json={
        "message": "When should I give first water to wheat crop?",
        "language": "en"
    })
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "safety_disclaimer" in data

def test_welcome_email_service():
    from app.services.email_service import generate_welcome_email_html, send_welcome_email
    
    html = generate_welcome_email_html("Mukesh Kumar", "Cachar", "Assam", "hi")
    assert "Mukesh Kumar" in html
    assert "KrishiMitra" in html
    assert "Cachar" in html

    # Test delivery without SMTP credentials (safe simulation mode)
    result = send_welcome_email("mukesh@example.com", "Mukesh Kumar", "Cachar", "Assam", "en")
    assert result is True

def test_register_with_email_dispatches_welcome():
    unique_phone = f"987{hash('test_welcome') % 10000000:07d}"
    response = client.post("/api/auth/register", json={
        "full_name": "Email Test Farmer",
        "mobile_number": unique_phone,
        "email": f"farmer_{unique_phone}@example.com",
        "password": "password123",
        "state": "Assam",
        "district": "Cachar",
        "preferred_language": "hi"
    })
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["user"]["full_name"] == "Email Test Farmer"

