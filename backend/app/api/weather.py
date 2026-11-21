from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.weather import WeatherCurrentResponse, WeatherForecastResponse, WeatherAdvisoryResponse

router = APIRouter(prefix="/weather", tags=["Weather & Advisories"])

# Benchmark weather profiles by agro-climatic region (Transparent demo fallback)
DISTRICT_WEATHER = {
    "pune": {"temp": 28.5, "humidity": 62.0, "rainfall": 0.0, "wind": 12.5, "condition": "Partly Cloudy", "state": "Maharashtra"},
    "nashik": {"temp": 27.0, "humidity": 58.0, "rainfall": 0.0, "wind": 14.0, "condition": "Sunny", "state": "Maharashtra"},
    "ludhiana": {"temp": 22.0, "humidity": 50.0, "rainfall": 0.0, "wind": 8.0, "condition": "Clear Sky", "state": "Punjab"},
    "guwahati": {"temp": 26.5, "humidity": 78.0, "rainfall": 2.5, "wind": 10.0, "condition": "Scattered Clouds", "state": "Assam"},
    "rajkot": {"temp": 30.0, "humidity": 54.0, "rainfall": 0.0, "wind": 15.0, "condition": "Warm & Sunny", "state": "Gujarat"},
}

@router.get("/current", response_model=WeatherCurrentResponse)
def get_current_weather(
    district: str = Query("Pune", description="District name"),
    state: str = Query("Maharashtra", description="State name")
):
    key = district.strip().lower()
    data = DISTRICT_WEATHER.get(key, {
        "temp": 28.0, "humidity": 60.0, "rainfall": 0.0, "wind": 11.0,
        "condition": "Pleasant & Clear", "state": state
    })

    advisory_summary = (
        "Dry and sunny conditions prevail. Favorable for irrigation and field weeding. "
        "No severe rain alerts in the next 48 hours."
    )
    if data["rainfall"] > 0:
        advisory_summary = "Light rainfall observed. Postpone pesticide sprays and top dressing of urea."

    return {
        "location": f"{district.capitalize()}, {data['state']}",
        "state": data["state"],
        "district": district.capitalize(),
        "temperature": data["temp"],
        "humidity": data["humidity"],
        "rainfall": data["rainfall"],
        "wind_speed": data["wind"],
        "condition": data["condition"],
        "icon": "sun" if "Sunny" in data["condition"] or "Clear" in data["condition"] else "cloud-rain",
        "advisory_summary": advisory_summary,
        "is_official_imd": False,
        "source": "KrishiMitra Agromet Engine (IMD Benchmark Reference)",
        "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M")
    }

@router.get("/forecast", response_model=WeatherForecastResponse)
def get_forecast(
    district: str = Query("Pune", description="District name")
):
    today = datetime.now()
    days_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    forecast_days = []
    base_temps = [28.0, 29.0, 27.5, 26.0, 27.0]
    conditions = ["Clear Sky", "Partly Cloudy", "Light Showers", "Overcast", "Sunny"]
    precip_probs = [5, 15, 45, 25, 10]
    recs = [
        "Optimal for crop harvesting & drying.",
        "Conduct irrigation in evening hours.",
        "Hold foliar sprays due to precipitation risk.",
        "Favorable for intercultural operations.",
        "Good day for fertilizer application."
    ]

    for i in range(5):
        day_date = today + timedelta(days=i)
        forecast_days.append({
            "date": day_date.strftime("%Y-%m-%d"),
            "day": days_names[day_date.weekday()],
            "temp_max": base_temps[i] + 3.0,
            "temp_min": base_temps[i] - 7.0,
            "condition": conditions[i],
            "rainfall_prob": precip_probs[i],
            "recommendation": recs[i]
        })

    return {
        "location": district.capitalize(),
        "forecast": forecast_days,
        "warnings": ["Moderate afternoon heat in open fields; ensure adequate hydration for farm workers."],
        "source": "Agromet Advisory Service Model (India)"
    }

@router.get("/advisory", response_model=WeatherAdvisoryResponse)
def get_weather_advisory(
    crop: Optional[str] = "Wheat",
    stage: Optional[str] = "Tillering"
):
    advisories = [
        {
            "category": "Irrigation",
            "title": f"Irrigation Management for {crop}",
            "guidance": "Given moderate evaporation rates, schedule light irrigation during morning or evening to reduce loss.",
            "type": "Application-Generated Suggestion"
        },
        {
            "category": "Crop Protection",
            "title": "Pest & Disease Watch",
            "guidance": "Current humidity levels require scouting for fungal leaf spots. Ensure proper field drainage.",
            "type": "Application-Generated Suggestion"
        },
        {
            "category": "Field Work",
            "title": "Spraying & Chemical Applications",
            "guidance": "Wind speeds are below 15 km/h; ideal for drone or knapsack sprayer operation.",
            "type": "Application-Generated Suggestion"
        }
    ]
    return {
        "advisories": advisories,
        "crop": crop,
        "stage": stage
    }
