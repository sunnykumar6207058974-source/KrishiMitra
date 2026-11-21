from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import User, FarmerProfile
from app.schemas.farmer import FarmerProfileResponse, FarmerProfileUpdate
from app.api.deps import get_current_user

router = APIRouter(prefix="/farmer", tags=["Farmer Profile"])

@router.get("/profile", response_model=FarmerProfileResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(FarmerProfile).filter(FarmerProfile.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfile(
            user_id=current_user.id,
            farm_name=f"{current_user.full_name}'s Farm",
            total_land_area=2.0,
            land_unit="Acres",
            primary_soil_type="Alluvial",
            irrigation_source="Groundwater",
            experience_years=3,
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/profile", response_model=FarmerProfileResponse)
def update_profile(
    profile_in: FarmerProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(FarmerProfile).filter(FarmerProfile.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfile(user_id=current_user.id)
        db.add(profile)

    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile
