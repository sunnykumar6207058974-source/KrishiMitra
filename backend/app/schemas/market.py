from typing import List, Optional
from pydantic import BaseModel

class MandiPriceItem(BaseModel):
    id: int
    state: str
    district: str
    market: str
    commodity: str
    variety: str
    min_price: float
    max_price: float
    modal_price: float
    price_date: str
    source: str

    class Config:
        from_attributes = True

class MandiFilterResponse(BaseModel):
    records: List[MandiPriceItem]
    total_count: int
    states: List[str]
    commodities: List[str]
    is_live: bool
    source_attribution: str
