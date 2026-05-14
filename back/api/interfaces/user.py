from fastapi import APIRouter, HTTPException, Body, Depends
from playhouse.shortcuts import model_to_dict
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from back.database.database import User, UserSubjects, Subject
from back.api.hasher import verify_hash, hash_password
from back.api.jwt_token import get_jwt, get_user, key, auf_token


router = APIRouter(prefix="/users", tags=["users"])


@router.post("")
async def register(username: str, password: str):
    user, _ = User.get_or_create(
        name=username,
        password=hash_password(password),
        role=2
    )

    return get_jwt({"username": user.name}, key)


@router.get("")
async def get_users(current_user = Depends(auf_token)):
    user = get_user(current_user, key)

    if user.role.name in ["admin", "teacher"]:
        return [model_to_dict(i) for i in User.select()]

    else:
        raise HTTPException(400, "Incorrect User role. User must be a Admin")


@router.get("/{id}/subjects")
async def get_users_grades(id: int, current_user = Depends(auf_token)):
    user = User.get_or_none(id=id)

    if not user:
        raise HTTPException(404, "User not found")

    if user.role.name == "teacher":
        return [model_to_dict(i) for i in UserSubjects.select().where(UserSubjects.user_id == user.id)]

    else:
        raise HTTPException(400, "Incorrect User role. User must be a Student")


@router.post("/{user_id}/grades")
async def create_user_grade(user_id: int, subject_id: int, grade: int, created_at: str, current_user = Depends(auf_token)):
    current_user = get_user(current_user, key)

    if current_user.role.name != "teacher":
        raise HTTPException(400, "Incorrect User role. User must be a Teacher")

    user = User.get_or_none(id=user_id)
    subject = Subject.get_or_none(id=subject_id)

    if not user:
        raise HTTPException(404, "User not found")
    
    if not subject:
        raise HTTPException(404, "Subject not found")

    if user.role.name == "student":
        raise HTTPException(400, "Incorrect User role. User must be a Student")

    grade, _ = UserSubjects.get_or_create(
        user_id=user,
        subject_id=subject,
        grade=grade,
        date=created_at
    )

    return model_to_dict(grade)


@router.patch("/{user_id}")
async def change_role(user_id: int, role_id: int, current_user = Depends(auf_token)):
    current_user = get_user(current_user, key)

    if current_user.role.name != "admin":
        raise HTTPException(400, "Incorrect User role. User must be a Admin")

    user = User.get_or_none(id=user_id)

    if not user:
        raise HTTPException(404, "User not found")

    user.role = role_id
    user.save()

    return user
