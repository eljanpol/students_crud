from fastapi import FastAPI, HTTPException
import fastapi
from playhouse.shortcuts import model_to_dict

from back.database.database import User, Role, UserSubjects, Subject


app = FastAPI()


@app.get("/users")
def get_users():
    return [model_to_dict(i) for i in User.select()]


@app.get("/subjects")
def add_subject():
    return [model_to_dict(i) for i in Subject.select()]


@app.get("/users/{id}/subjects")
def get_users_subjects(id: int):
    user = User.get_or_none(id=id)

    if str(user.role) == "2":
        return [model_to_dict(i) for i in UserSubjects.select().where(UserSubjects.user_id == user.id)]

    else:
        raise HTTPException(400, "Incorrect User role. User must be a Student")


@app.post("/users")
def register(username: str, password: str):
    user, _ = User.get_or_create(
        name=username,
        password=password,
        role=2
    )

    return model_to_dict(user)


@app.post("/subjects")
def create_subject(name: str):
    subject, _ = Subject.get_or_create(
        name=name
    )

    return model_to_dict(subject)


@app.post("users/{user_id}/subjects/{subject_id}/{grade}")
def create_user_grade(user_id: int, subject_id: int, grade):
    pass
