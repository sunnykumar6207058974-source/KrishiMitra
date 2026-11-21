from typing import Optional
from pydantic import BaseModel, Field

class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    mobile_number: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    password: str = Field(..., min_length=6)
    state: str = Field(..., min_length=2)
    district: str = Field(..., min_length=2)
    preferred_language: Optional[str] = "en"

class UserLogin(BaseModel):
    mobile_or_email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserResponse(BaseModel):
    id: int
    full_name: str
    mobile_number: str
    email: Optional[str] = None
    state: str
    district: str
    preferred_language: str
    is_active: bool

    class Config:
        from_attributes = True
