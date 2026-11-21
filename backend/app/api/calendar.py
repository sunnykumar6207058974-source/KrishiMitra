from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import FarmingTask, User
from app.schemas.calendar import TaskCreate, TaskUpdate, TaskResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/calendar", tags=["Crop Calendar & Tasks"])

@router.get("", response_model=List[TaskResponse])
def get_farmer_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tasks = db.query(FarmingTask).filter(FarmingTask.user_id == current_user.id).order_by(FarmingTask.due_date.asc()).all()
    # If no tasks yet, seed dynamic recommended tasks for the farmer
    if not tasks:
        seed_tasks = [
            FarmingTask(
                user_id=current_user.id,
                crop_name="Wheat",
                task_title="Crown Root Irrigation (CRI)",
                stage="Irrigation",
                due_date=datetime.now(),
                notes="Critical stage 21 days after sowing. Essential to avoid yield drop.",
                is_completed=False
            ),
            FarmingTask(
                user_id=current_user.id,
                crop_name="Wheat",
                task_title="Top Dressing of Nitrogen / Urea",
                stage="Fertilizer",
                due_date=datetime.now(),
                notes="Apply 1/3 dose of Nitrogen immediately after first irrigation.",
                is_completed=False
            ),
            FarmingTask(
                user_id=current_user.id,
                crop_name="Chickpea",
                task_title="Pheromone Trap Installation for Pod Borer",
                stage="Weed & Pest Management",
                due_date=datetime.now(),
                notes="Install 5 traps per acre to monitor moth activity.",
                is_completed=True,
                completed_at=datetime.now()
            )
        ]
        db.add_all(seed_tasks)
        db.commit()
        tasks = db.query(FarmingTask).filter(FarmingTask.user_id == current_user.id).order_by(FarmingTask.due_date.asc()).all()
    return tasks

@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_in: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = FarmingTask(
        user_id=current_user.id,
        farm_id=task_in.farm_id,
        crop_name=task_in.crop_name,
        task_title=task_in.task_title,
        stage=task_in.stage,
        due_date=task_in.due_date,
        notes=task_in.notes,
        is_completed=False
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_in: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(FarmingTask).filter(FarmingTask.id == task_id, FarmingTask.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")

    update_data = task_in.model_dump(exclude_unset=True)
    if "is_completed" in update_data:
        if update_data["is_completed"] and not task.is_completed:
            task.completed_at = datetime.utcnow()
        elif not update_data["is_completed"]:
            task.completed_at = None

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(FarmingTask).filter(FarmingTask.id == task_id, FarmingTask.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    db.delete(task)
    db.commit()
    return None
