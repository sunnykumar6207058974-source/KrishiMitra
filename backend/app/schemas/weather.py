from typing import List, Optional
from pydantic import BaseModel

class WeatherCurrentResponse(BaseModel):
    location: str
    state: str
    district: str
    temperature: float
    humidity: float
    rainfall: float
    wind_speed: float
    condition: str
    icon: str
    advisory_summary: str
    is_official_imd: bool
    source: str
    updated_at: str

class ForecastDay(BaseModel):
    date: str
    day: str
    temp_max: float
    temp_min: float
    condition: str
    rainfall_prob: int
    recommendation: str

class WeatherForecastResponse(BaseModel):
    location: str
    forecast: List[ForecastDay]
    warnings: List[str]
    source: str

class WeatherAdvisoryResponse(BaseModel):
    advisories: List[dict]
    crop: Optional[str] = None
    stage: Optional[str] = None
