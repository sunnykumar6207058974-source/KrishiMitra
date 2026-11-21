from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import User, Farm
from app.schemas.farm import FarmCreate, FarmUpdate, FarmResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/farms", tags=["Farms"])

@router.post("", response_model=FarmResponse, status_code=status.HTTP_201_CREATED)
def create_farm(
    farm_in: FarmCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    farm = Farm(
        user_id=current_user.id,
        farm_name=farm_in.farm_name,
        state=farm_in.state,
        district=farm_in.district,
        village=farm_in.village,
        land_size=farm_in.land_size,
        land_unit=farm_in.land_unit,
        soil_type=farm_in.soil_type,
        irrigation_available=farm_in.irrigation_available,
        primary_crops=farm_in.primary_crops
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm

@router.get("", response_model=List[FarmResponse])
def get_user_farms(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Farm).filter(Farm.user_id == current_user.id).all()

@router.get("/{farm_id}", response_model=FarmResponse)
def get_farm(
    farm_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found.")
    return farm

@router.put("/{farm_id}", response_model=FarmResponse)
def update_farm(
    farm_id: int,
    farm_in: FarmUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found.")

    update_data = farm_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(farm, field, value)

    db.commit()
    db.refresh(farm)
    return farm
