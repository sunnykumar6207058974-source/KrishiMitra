from typing import Optional
from pydantic import BaseModel

class FarmerProfileBase(BaseModel):
    farm_name: str
    total_land_area: float
    land_unit: str = "Acres"
    primary_soil_type: str
    irrigation_source: str
    experience_years: int
    bio: Optional[str] = None

class FarmerProfileUpdate(BaseModel):
    farm_name: Optional[str] = None
    total_land_area: Optional[float] = None
    land_unit: Optional[str] = None
    primary_soil_type: Optional[str] = None
    irrigation_source: Optional[str] = None
    experience_years: Optional[int] = None
    bio: Optional[str] = None

class FarmerProfileResponse(FarmerProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
