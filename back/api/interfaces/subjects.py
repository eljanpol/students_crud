from fastapi import APIRouter
from playhouse.shortcuts import model_to_dict

from back.database.database import Subject


router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("")
def get_subject():
    return [model_to_dict(i) for i in Subject.select()]


@router.post("")
def create_subject(name: str):
    subject, _ = Subject.get_or_create(
        name=name
    )

    return model_to_dict(subject)

