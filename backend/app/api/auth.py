from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import User, FarmerProfile, Farm
from app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
from app.core.security import verify_password, get_password_hash, create_access_token
from app.api.deps import get_current_user
from app.services.email_service import send_welcome_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(
    user_in: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # Check duplicate mobile number
    existing_mobile = db.query(User).filter(User.mobile_number == user_in.mobile_number).first()
    if existing_mobile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A farmer with this mobile number is already registered."
        )
    
    if user_in.email:
        existing_email = db.query(User).filter(User.email == user_in.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email address already exists."
            )

    new_user = User(
        full_name=user_in.full_name,
        mobile_number=user_in.mobile_number,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        state=user_in.state,
        district=user_in.district,
        preferred_language=user_in.preferred_language or "en",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Automatically create initial farmer profile and default farm
    default_profile = FarmerProfile(
        user_id=new_user.id,
        farm_name=f"{new_user.full_name}'s Farm",
        total_land_area=2.0,
        land_unit="Acres",
        primary_soil_type="Alluvial / Loamy",
        irrigation_source="Canal / Groundwater",
        experience_years=3,
        bio=""
    )
    db.add(default_profile)

    default_farm = Farm(
        user_id=new_user.id,
        farm_name=f"{new_user.full_name}'s Primary Plot",
        state=new_user.state,
        district=new_user.district,
        land_size=2.0,
        land_unit="Acres",
        soil_type="Loamy",
        irrigation_available=True,
    )
    db.add(default_farm)
    db.commit()

    token = create_access_token(subject=new_user.id)

    # Dispatch welcome email asynchronously in background if email is provided
    if new_user.email:
        background_tasks.add_task(
            send_welcome_email,
            to_email=new_user.email,
            full_name=new_user.full_name,
            district=new_user.district,
            state=new_user.state,
            preferred_language=new_user.preferred_language,
        )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "mobile_number": new_user.mobile_number,
            "state": new_user.state,
            "district": new_user.district,
            "preferred_language": new_user.preferred_language,
        }
    }

@router.post("/login", response_model=Token)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.mobile_number == login_in.mobile_or_email) |
        (User.email == login_in.mobile_or_email)
    ).first()

    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect mobile/email or password."
        )

    token = create_access_token(subject=user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "mobile_number": user.mobile_number,
            "state": user.state,
            "district": user.district,
            "preferred_language": user.preferred_language,
        }
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
