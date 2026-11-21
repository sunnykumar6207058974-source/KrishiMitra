# KrishiMitra Architecture & System Design

## 1. System Overview

KrishiMitra is architected as a modular, decoupled full-stack platform:
- **Client Tier (Frontend)**: Single Page Application (SPA) built with React, styled for desktop and mobile web responsiveness, providing accessible interfaces for farmers.
- **Application Tier (Backend)**: High-performance asynchronous REST API powered by FastAPI (Python 3.10+).
- **Intelligence Tier (ML & AI)**:
  - Supervised Machine Learning models (RandomForest / XGBoost) for crop and fertilizer recommendation.
  - LLM Advisory Layer (Gemini API) for agricultural Q&A, disease recognition, and voice/multilingual assistance.
- **Data Tier**: Relational storage (PostgreSQL/SQLite) for user data, soil records, and crop calendars, accompanied by static agricultural datasets and dynamic third-party APIs (OpenWeather, Agmarknet/Mandi).

```
+-------------------------------------------------------------+
|                      Farmer (Client UI)                     |
|            React SPA (Vite, Tailwind / Modern CSS)          |
+------------------------------+------------------------------+
                               | HTTPS / JSON
+------------------------------v------------------------------+
|                    FastAPI Backend Gateway                  |
|  - Auth & Security (JWT)       - Rate Limiting              |
|  - Business Services           - Schemas & Validation       |
+--------------+---------------+--------------+---------------+
               |               |              |
      +--------v------+ +------v-----+ +------v------+
      |  ML Engine    | |  AI Engine | | 3rd Party   |
      |  - Crop Model | |  - Gemini  | | - Weather   |
      |  - Fertilizer | |  - Advisory| | - Mandi API |
      +---------------+ +------------+ +-------------+
               |
      +--------v----------------------+
      |   Database & Data Pipeline    |
      |   - SQLite / PostgreSQL       |
      |   - Crop & Soil Datasets      |
      +-------------------------------+
```

## 2. Component Design

### 2.1 Backend Modules
- `app/api/`: Versioned endpoints (`/api/v1/auth`, `/api/v1/crops`, `/api/v1/weather`, `/api/v1/mandi`, `/api/v1/chat`, `/api/v1/calendar`).
- `app/core/`: Application settings, environment variable parsing (`pydantic-settings`), and security routines.
- `app/database/`: Database engine setup, base class, and session dependencies (`get_db`).
- `app/models/`: SQLAlchemy ORM models (`User`, `SoilReport`, `CropPlan`, etc.).
- `app/schemas/`: Pydantic request and response schemas.
- `app/ml/`: Feature preprocessing pipelines, offline training scripts, and online inference logic with model caching.
- `app/ai/`: Prompt templates and integration with Gemini / conversational AI APIs.

### 2.2 Frontend Modules
- `pages/`: Dedicated routing views matching the farmer journey.
- `services/`: Axios HTTP clients with token interceptors and error handling.
- `context/`: React context providers for Authentication, Preferences (Language/Units), and Notifications.
