from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import MandiPrice
from app.schemas.market import MandiFilterResponse

router = APIRouter(prefix="/market", tags=["Mandi Market Prices"])

@router.get("/prices", response_model=MandiFilterResponse)
def get_mandi_prices(
    state: Optional[str] = Query(None, description="State filter"),
    district: Optional[str] = Query(None, description="District filter"),
    commodity: Optional[str] = Query(None, description="Commodity search"),
    db: Session = Depends(get_db)
):
    query = db.query(MandiPrice)
    if state and state.lower() != "all":
        query = query.filter(MandiPrice.state.ilike(f"%{state}%"))
    if district and district.lower() != "all":
        query = query.filter(MandiPrice.district.ilike(f"%{district}%"))
    if commodity and commodity.strip():
        query = query.filter(MandiPrice.commodity.ilike(f"%{commodity.strip()}%"))

    records = query.all()

    # Get distinct states and commodities for filters
    all_states = [s[0] for s in db.query(MandiPrice.state).distinct().all()]
    all_commodities = [c[0] for c in db.query(MandiPrice.commodity).distinct().all()]

    return {
        "records": records,
        "total_count": len(records),
        "states": sorted(all_states),
        "commodities": sorted(all_commodities),
        "is_live": False,
        "source_attribution": "Benchmark Reference from AGMARKNET / Ministry of Agriculture & Farmers Welfare"
    }

@router.get("/compare")
def compare_markets(
    commodity: str = Query("Wheat", description="Commodity to compare"),
    db: Session = Depends(get_db)
):
    records = db.query(MandiPrice).filter(MandiPrice.commodity.ilike(f"%{commodity}%")).all()
    comparison = [
        {
            "market": f"{r.market} ({r.district}, {r.state})",
            "modal_price": r.modal_price,
            "min_price": r.min_price,
            "max_price": r.max_price,
            "date": r.price_date
        }
        for r in records
    ]
    return {
        "commodity": commodity,
        "comparison": comparison,
        "best_market": max(comparison, key=lambda x: x["modal_price"]) if comparison else None
    }
