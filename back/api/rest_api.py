from fastapi import FastAPI, HTTPException, Body, Depends
import fastapi
from uvicorn import run
from fastapi.security import OAuth2PasswordRequestForm
from playhouse.shortcuts import model_to_dict

from back.api.interfaces import user, subjects
from back.api.jwt_token import get_jwt, get_user, key
from back.api.hasher import verify_hash
from back.database.database import User


app = FastAPI()


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = User.get_or_none(name=form_data.username)

    if not user:
        raise HTTPException(status_code=400, detail="invalid name")

    user = model_to_dict(user)

    if verify_hash(form_data.password, user["password"]):
        return {"access_token": get_jwt(user, key)}

    raise HTTPException(status_code=400, detail="invalid password")


app.include_router(user.router)
app.include_router(subjects.router)


if __name__ == "__main__":
    run("back.api.rest_api:app", host="0.0.0.0", port=8000, reload=True)
