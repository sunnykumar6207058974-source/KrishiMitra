from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import Crop, CropRecommendation, User
from app.schemas.crops import CropRecommendationRequest, CropRecommendationResponse, CropItem
from app.ml.predict import predictor
from app.api.deps import get_optional_current_user

router = APIRouter(prefix="/crops", tags=["Crop Recommendation"])

# Agronomic regional profiles & seasons in India
REGIONAL_SEASONS = {
    "rice": {"seasons": ["Kharif", "Pre-Kharif", "All-Season"], "min_rain": 120, "soil": ["Clayey", "Loamy", "Alluvial", "Clay Loam"]},
    "wheat": {"seasons": ["Rabi", "Winter"], "max_temp": 30, "soil": ["Loamy", "Clayey Loam", "Alluvial"]},
    "maize": {"seasons": ["Kharif", "Rabi", "Spring"], "soil": ["Loamy", "Sandy Loam", "Black Soil"]},
    "chickpea": {"seasons": ["Rabi"], "max_rain": 120, "soil": ["Black Soil", "Loamy", "Alluvial"]},
    "cotton": {"seasons": ["Kharif"], "min_temp": 18, "soil": ["Black Clayey Loam", "Alluvial", "Regur"]},
    "jute": {"seasons": ["Kharif", "Pre-Kharif"], "min_rain": 140, "soil": ["Alluvial", "Sandy Loam"]}
}

@router.post("/recommend", response_model=CropRecommendationResponse)
def recommend_crop(
    req: CropRecommendationRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    # 1. ML inference
    pred_result = predictor.predict(
        n=req.nitrogen,
        p=req.phosphorus,
        k=req.potassium,
        temp=req.temperature,
        humidity=req.humidity,
        ph=req.ph,
        rainfall=req.rainfall
    )

    crop_name = pred_result["recommended_crop"].lower()
    confidence = pred_result["confidence"]
    alternatives = pred_result["alternatives"]

    # 2. Regional compatibility validation
    compat = REGIONAL_SEASONS.get(crop_name, {})
    is_compatible = True
    compatibility_notes = []

    if req.season and "seasons" in compat:
        if req.season not in compat["seasons"] and "All-Season" not in compat["seasons"]:
            is_compatible = False
            compatibility_notes.append(
                f"{crop_name.capitalize()} is typically a {', '.join(compat['seasons'])} crop, while current selection is {req.season}."
            )

    if "min_rain" in compat and req.rainfall < compat["min_rain"] and req.water_availability == "Low":
        is_compatible = False
        compatibility_notes.append(
            f"{crop_name.capitalize()} requires substantial moisture (>= {compat['min_rain']} mm), but rainfall is {req.rainfall} mm with low irrigation."
        )

    # 3. Dynamic explanation
    explanation = (
        f"Based on your soil profile (N:{req.nitrogen}, P:{req.phosphorus}, K:{req.potassium}, pH:{req.ph}) "
        f"and climate factors ({req.temperature}°C, {req.rainfall}mm rainfall), {crop_name.capitalize()} "
        f"shows the highest agronomic compatibility."
    )
    if not is_compatible:
        explanation += " Note: Regional season or water availability constraints require supplemental management."

    # 4. Sowing Period & Actionables
    sowing_periods = {
        "rice": "June to July (Kharif nursery transplanting)",
        "wheat": "October to November (Rabi sowing)",
        "maize": "June to July (Kharif) or October to November (Rabi)",
        "chickpea": "October to November (Post-monsoon residual moisture)",
        "cotton": "May to June (Early Kharif before peak monsoon)",
        "jute": "March to May (Pre-monsoon sowing)"
    }

    limitations = [
        "Avoid waterlogging during early seedling stages.",
        "Ensure soil test is re-verified after every 2 crop cycles."
    ]
    if req.ph < 6.0:
        limitations.append("Soil is slightly acidic; consider agricultural lime application.")
    elif req.ph > 7.8:
        limitations.append("Soil is moderately alkaline; consider gypsum application and organic compost.")

    next_actions = [
        f"Prepare land with fine tilth suitable for {crop_name.capitalize()}.",
        "Procure certified high-yielding seeds from authorized KVK or Krishi Bhavan.",
        "Plan basal fertilizer application as per recommended package of practices."
    ]

    # 5. Persist record if user logged in
    if current_user:
        rec = CropRecommendation(
            user_id=current_user.id,
            farm_id=req.farm_id,
            recommended_crop=crop_name,
            confidence_score=confidence,
            input_nitrogen=req.nitrogen,
            input_phosphorus=req.phosphorus,
            input_potassium=req.potassium,
            input_temp=req.temperature,
            input_humidity=req.humidity,
            input_ph=req.ph,
            input_rainfall=req.rainfall,
            state=req.state,
            season=req.season,
            explanation=explanation,
            alternatives=", ".join(alternatives)
        )
        db.add(rec)
        db.commit()

    return {
        "recommended_crop": crop_name,
        "confidence": confidence,
        "alternatives": alternatives,
        "explanation": explanation,
        "suitability_factors": {
            "soil_fertility": "Good" if req.nitrogen > 50 and req.phosphorus > 30 else "Moderate",
            "climate_suitability": "High" if 15 <= req.temperature <= 35 else "Moderate",
            "water_adequacy": "Optimal" if req.rainfall > 80 or req.water_availability != "Low" else "Deficit"
        },
        "sowing_period": sowing_periods.get(crop_name, "Standard regional cropping calendar"),
        "limitations": limitations + compatibility_notes,
        "next_actions": next_actions,
        "is_regional_compatible": is_compatible
    }

@router.get("", response_model=List[CropItem])
def list_crops(db: Session = Depends(get_db)):
    return db.query(Crop).all()
