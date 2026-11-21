from typing import List, Optional
from pydantic import BaseModel, Field

class CropRecommendationRequest(BaseModel):
    nitrogen: float = Field(..., ge=0, le=300, description="Soil Nitrogen (N) in kg/ha")
    phosphorus: float = Field(..., ge=0, le=300, description="Soil Phosphorus (P) in kg/ha")
    potassium: float = Field(..., ge=0, le=300, description="Soil Potassium (K) in kg/ha")
    temperature: float = Field(..., ge=0, le=55, description="Average temperature in Celsius")
    humidity: float = Field(..., ge=10, le=100, description="Relative humidity in percentage")
    ph: float = Field(..., ge=3.0, le=10.0, description="Soil pH value")
    rainfall: float = Field(..., ge=0, le=3000, description="Annual / seasonal rainfall in mm")
    
    # Regional and Farm Context
    soil_type: Optional[str] = "Loamy"
    state: Optional[str] = "Maharashtra"
    district: Optional[str] = "Pune"
    season: Optional[str] = "Kharif"
    water_availability: Optional[str] = "Moderate"
    land_size: Optional[float] = 2.0
    farm_id: Optional[int] = None

class CropRecommendationResponse(BaseModel):
    recommended_crop: str
    confidence: float
    alternatives: List[str]
    explanation: str
    suitability_factors: dict
    sowing_period: str
    limitations: List[str]
    next_actions: List[str]
    is_regional_compatible: bool

class CropItem(BaseModel):
    id: int
    name: str
    scientific_name: Optional[str]
    category: str
    season_type: str
    description: Optional[str]

    class Config:
        from_attributes = True
