from typing import Optional, List
from pydantic import BaseModel, Field

class SoilAnalysisRequest(BaseModel):
    farm_id: Optional[int] = None
    nitrogen: float = Field(..., ge=0, le=400)
    phosphorus: float = Field(..., ge=0, le=400)
    potassium: float = Field(..., ge=0, le=400)
    ph: float = Field(..., ge=3.0, le=10.0)
    organic_carbon: Optional[float] = Field(0.5, ge=0.0, le=5.0)
    electrical_conductivity: Optional[float] = Field(0.8, ge=0.0, le=10.0)
    source_type: Optional[str] = "Manual Entry"

class SoilHealthResponse(BaseModel):
    overall_health: str
    soil_quality_score: int
    nitrogen_status: str
    phosphorus_status: str
    potassium_status: str
    ph_status: str
    organic_carbon_status: str
    recommendations: List[str]
    fertilizer_guidance: dict
    suitable_crops: List[str]
