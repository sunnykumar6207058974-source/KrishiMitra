from typing import Optional
from pydantic import BaseModel

class FarmCreate(BaseModel):
    farm_name: str
    state: str
    district: str
    village: Optional[str] = None
    land_size: float
    land_unit: str = "Acres"
    soil_type: str = "Loamy"
    irrigation_available: bool = True
    primary_crops: Optional[str] = None

class FarmUpdate(BaseModel):
    farm_name: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    land_size: Optional[float] = None
    land_unit: Optional[str] = None
    soil_type: Optional[str] = None
    irrigation_available: Optional[bool] = None
    primary_crops: Optional[str] = None

class FarmResponse(FarmCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True
