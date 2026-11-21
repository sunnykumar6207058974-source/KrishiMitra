from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import SoilReport, User
from app.schemas.soil import SoilAnalysisRequest, SoilHealthResponse
from app.api.deps import get_optional_current_user

router = APIRouter(prefix="/soil", tags=["Soil Health Analyzer"])

@router.post("/analyze", response_model=SoilHealthResponse)
def analyze_soil(
    req: SoilAnalysisRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    # Indian Soil Health Card Rating Criteria
    # Nitrogen (kg/ha): Low (< 280), Medium (280 - 560), High (> 560)
    # Phosphorus (kg/ha): Low (< 10), Medium (10 - 25), High (> 25)
    # Potassium (kg/ha): Low (< 108), Medium (108 - 280), High (> 280)
    # pH: Acidic (< 6.5), Neutral (6.5 - 7.5), Alkaline (> 7.5)

    n_stat = "Low" if req.nitrogen < 150 else ("Medium" if req.nitrogen <= 350 else "High")
    p_stat = "Low" if req.phosphorus < 20 else ("Medium" if req.phosphorus <= 60 else "High")
    k_stat = "Low" if req.potassium < 80 else ("Medium" if req.potassium <= 220 else "High")

    if req.ph < 6.2:
        ph_stat = "Acidic"
    elif req.ph <= 7.6:
        ph_stat = "Neutral / Optimal"
    else:
        ph_stat = "Alkaline"

    oc = req.organic_carbon or 0.5
    oc_stat = "Low" if oc < 0.5 else ("Medium" if oc <= 0.75 else "High")

    # Score calculation out of 100
    score = 40
    if n_stat == "Medium": score += 15
    elif n_stat == "High": score += 10

    if p_stat in ["Medium", "High"]: score += 15
    if k_stat in ["Medium", "High"]: score += 15
    if ph_stat == "Neutral / Optimal": score += 15

    overall = "Optimal" if score >= 80 else ("Moderate" if score >= 60 else "Requires Soil Amendment")

    recommendations = []
    if n_stat == "Low":
        recommendations.append("Apply organic farm yard manure (FYM) @ 5 tonnes/ha or recommended split dose of Urea.")
    if p_stat == "Low":
        recommendations.append("Apply Single Super Phosphate (SSP) or DAP as basal dose at sowing time.")
    if k_stat == "Low":
        recommendations.append("Apply Muriate of Potash (MOP) to improve crop stress resilience.")
    if ph_stat == "Acidic":
        recommendations.append("Apply agricultural lime (calcium carbonate) to neutralize soil acidity.")
    elif ph_stat == "Alkaline":
        recommendations.append("Apply agricultural gypsum and green manure (Dhaincha) to lower alkalinity.")
    if oc_stat == "Low":
        recommendations.append("Incorporate crop residue and vermicompost to increase soil organic carbon.")

    if not recommendations:
        recommendations.append("Nutrient levels are well balanced. Maintain fertility using crop rotation with legumes.")

    suitable_crops = ["Wheat", "Gram", "Maize", "Mustard", "Soybean"]
    if ph_stat == "Acidic":
        suitable_crops = ["Tea", "Rice", "Potato"]

    # Persist report if user is logged in
    if current_user:
        report = SoilReport(
            user_id=current_user.id,
            farm_id=req.farm_id,
            nitrogen=req.nitrogen,
            phosphorus=req.phosphorus,
            potassium=req.potassium,
            ph=req.ph,
            organic_carbon=oc,
            electrical_conductivity=req.electrical_conductivity or 0.8,
            source_type=req.source_type or "Manual Entry",
            verified_by_farmer=True
        )
        db.add(report)
        db.commit()

    return {
        "overall_health": overall,
        "soil_quality_score": score,
        "nitrogen_status": n_stat,
        "phosphorus_status": p_stat,
        "potassium_status": k_stat,
        "ph_status": ph_stat,
        "organic_carbon_status": oc_stat,
        "recommendations": recommendations,
        "fertilizer_guidance": {
            "nitrogen_advice": "Split application (basal + tillering + panicle initiation)" if n_stat == "Low" else "Standard basal application",
            "phosphorus_advice": "Full dose at sowing (immobile nutrient)",
            "potassium_advice": "Basal application for root anchorage"
        },
        "suitable_crops": suitable_crops
    }

@router.get("/reports")
def get_soil_reports(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    if not current_user:
        return []
    return db.query(SoilReport).filter(SoilReport.user_id == current_user.id).order_by(SoilReport.created_at.desc()).all()
