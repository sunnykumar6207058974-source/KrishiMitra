# KrishiMitra API Documentation

Base URL: `http://localhost:8000/api/v1`

Interactive Swagger Docs: `http://localhost:8000/docs`
ReDoc: `http://localhost:8000/redoc`

---

## 1. Authentication (`/auth`)

### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "full_name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "phone": "9876543210",
    "password": "secure_password",
    "location": "Pune, Maharashtra"
  }
  ```

### Login
- **POST** `/auth/login`
- **Body**: `OAuth2PasswordRequestForm` (`username`, `password`)
- **Response**:
  ```json
  {
    "access_token": "jwt_token_string",
    "token_type": "bearer"
  }
  ```

---

## 2. Crop Recommendation (`/crops`)

### Recommend Crop
- **POST** `/crops/recommend`
- **Body**:
  ```json
  {
    "nitrogen": 90.0,
    "phosphorus": 42.0,
    "potassium": 43.0,
    "temperature": 20.87,
    "humidity": 82.0,
    "ph": 6.5,
    "rainfall": 202.93
  }
  ```
- **Response**:
  ```json
  {
    "recommended_crop": "rice",
    "confidence": 0.94,
    "alternatives": ["maize", "jute"]
  }
  ```

---

## 3. Weather (`/weather`)

### Get Current & Forecast
- **GET** `/weather/forecast?lat=18.5204&lon=73.8567`
- **Response**:
  ```json
  {
    "location": "Pune",
    "temperature": 27.5,
    "humidity": 65,
    "condition": "Partly Cloudy",
    "alerts": []
  }
  ```

---

## 4. Mandi Prices (`/mandi`)

### Get Commodity Prices
- **GET** `/mandi/prices?state=Maharashtra&commodity=Wheat`
- **Response**:
  ```json
  {
    "records": [
      {
        "mandi": "Pune APMC",
        "commodity": "Wheat",
        "min_price": 2200,
        "max_price": 2500,
        "modal_price": 2350,
        "unit": "Rs/Quintal",
        "date": "2026-11-21"
      }
    ]
  }
  ```

---

## 5. AI Farming Advisory (`/ai`)

### Chat with Krishi AI
- **POST** `/ai/chat`
- **Body**:
  ```json
  {
    "message": "What is the best fertilizer timing for wheat crop?",
    "language": "en"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "For wheat, apply full P and K along with 1/3 of Nitrogen at sowing time...",
    "suggested_actions": ["Check soil N-P-K", "Set irrigation schedule"]
  }
  ```
