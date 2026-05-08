import jwt
from fastapi import FastAPI, HTTPException, Body, Depends
from playhouse.shortcuts import model_to_dict
from fastapi.security import OAuth2PasswordBearer

from back.database.database import User


auf_token = OAuth2PasswordBearer(tokenUrl="token")
key = "pipisi"


def get_jwt(user: dict, key: str):
    return jwt.encode(user, key=key, algorithm="HS256")


def get_user(token: str, key: str):
    user_dict = jwt.decode(token, key=key, algorithms="HS256")

    return User.get_or_none(id=user_dict["id"])


async def get_current_user(name: str = Depends(auf_token)):
    user = User.get_or_none(name=name)

    if not user:
        raise HTTPException(status_code=400, detail="invalid name")

    return get_jwt(model_to_dict(user), key=key)
