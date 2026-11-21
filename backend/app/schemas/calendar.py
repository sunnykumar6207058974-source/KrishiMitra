from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class TaskCreate(BaseModel):
    farm_id: Optional[int] = None
    crop_name: str
    task_title: str
    stage: str = "Sowing"
    due_date: datetime
    notes: Optional[str] = None

class TaskUpdate(BaseModel):
    task_title: Optional[str] = None
    stage: Optional[str] = None
    due_date: Optional[datetime] = None
    is_completed: Optional[bool] = None
    notes: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    user_id: int
    farm_id: Optional[int]
    crop_name: str
    task_title: str
    stage: str
    due_date: datetime
    is_completed: bool
    completed_at: Optional[datetime]
    notes: Optional[str]

    class Config:
        from_attributes = True
