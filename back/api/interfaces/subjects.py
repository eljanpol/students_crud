from fastapi import APIRouter, Depends, HTTPException
from playhouse.shortcuts import model_to_dict

from back.database.database import Subject
from back.api.hasher import verify_hash, hash_password
from back.api.jwt_token import get_jwt, get_user, key, auf_token

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("")
def get_subject():
    return [model_to_dict(i) for i in Subject.select()]


@router.post("")
def create_subject(name: str, current_user = Depends(auf_token)):
    current_user = get_user(current_user, key)
    
    if current_user.role.name != "admin":
        raise HTTPException(400, "Incorrect User role. User must be a Admin")

    subject, _ = Subject.get_or_create(
        name=name
    )

    return model_to_dict(subject)

