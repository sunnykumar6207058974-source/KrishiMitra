# KrishiMitra (कृषि मित्र) 🌾🚜

> **Smart Farming. Better Decisions. Stronger Harvests.**

**KrishiMitra** is a production-minded, AI-powered agricultural decision support platform engineered specifically for Indian farmers. It bridges the gap between agricultural scientific research and everyday farm operations by delivering machine-learning crop recommendations, hyperlocal agromet weather advisories, soil health diagnostics, seasonal crop calendars, live APMC mandi prices, and an agricultural AI chatbot.

---

## 🚀 Key Modules & Capabilities

1. **AI Crop Recommendation**:
   - Supervised Machine Learning model (Random Forest) trained and validated on agronomic data (Nitrogen, Phosphorus, Potassium, Soil pH, Temperature, Humidity, Rainfall).
   - Regional and seasonal compatibility validation to prevent out-of-season crop recommendations.
   - Outputs suitability explanations, sowing periods, limitation warnings, and recommended next actions.

2. **Agromet Weather & Farming Advisory**:
   - Hyperlocal current conditions and 5-day weather forecasts.
   - Crop-specific, stage-by-stage farming guidance (irrigation timings, pest scouting, chemical spraying wind thresholds).
   - Clear attribution distinguishing official IMD sources from application suggestions.

3. **APMC Mandi Price Tracker**:
   - Commodity market rates (Minimum, Maximum, and Modal prices per quintal) across Indian mandis.
   - Filter by State and District, search by commodity, and compare rates between markets.

4. **Soil Health Card Analyzer**:
   - Grades macro-nutrients (N, P, K) and soil pH according to Indian Soil Health Card criteria.
   - Calculates a 0-100 Soil Quality Score and provides organic manure and balanced fertilizer recommendations.

5. **Dynamic Crop Calendar**:
   - Automated milestone schedule from land preparation to sowing, irrigation, weeding, and harvesting.
   - Interactive task completion tracking for registered farmers.

6. **Krishi AI Assistant (Multilingual RAG)**:
   - Grounded in verified ICAR research publications and Krishi Vigyan Kendra (KVK) guidelines.
   - Supports **English**, **हिन्दी (Hindi)**, and **অসমীয়া (Assamese)**.
   - Safety disclaimers preventing fabricated chemical dosages.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS (`#166534` Forest Green, `#65A30D` Leaf Green), React Router v6, Lucide React, Axios.
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy, Pydantic, JWT authentication, Passlib/Bcrypt.
- **Machine Learning**: Scikit-learn Random Forest, Pandas, NumPy, Joblib.
- **Database**: SQLite (Zero-setup local development, seamlessly switchable to PostgreSQL via `DATABASE_URL`).

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# From project root:
cd backend

# Create & activate virtual environment (if not already active)
python3 -m venv ../.venv
source ../.venv/bin/activate  # On Windows: ..\.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database schema & realistic seed data
PYTHONPATH=. python app/database/init_db.py

# Train ML model pipeline
PYTHONPATH=. python app/ml/train_model.py

# Run backend API server
uvicorn app.main:app --reload --port 8000
```
- API Base URL: `http://localhost:8000`
- Interactive Swagger Documentation: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

### 3. Frontend Setup
```bash
# In a new terminal tab:
cd frontend

# Install npm packages
npm install

# Start Vite development server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🔑 Demo Account Credentials

For hackathon demonstration and testing, you can use the pre-seeded farmer account (or click **"Load Demo Farmer Credentials"** on the Login page):

- **Mobile / Username**: `9876543210`
- **Password**: `Kisan@2026`
- **Farmer Name**: Ramesh Chandra Patel (Patel Agro Farm, Pune, Maharashtra)

---

## 🧪 Running Automated Tests

Run backend unit and integration test suite:
```bash
PYTHONPATH=backend .venv/bin/pytest backend/tests/
```
Run frontend production build verification:
```bash
cd frontend && npm run build
```

---

## 📄 License
MIT License. Built for Indian Agriculture & Farmers.
