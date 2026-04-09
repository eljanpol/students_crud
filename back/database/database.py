from peewee import Model, CharField, MySQLDatabase, AutoField, ForeignKeyField, IntegerField
import pymysql


user = "root"
password = "root"
host = "localhost"
port = 3306
db_name = "students"

connection = pymysql.connect(
    user=user,
    password=password,
    database=db_name)

db = MySQLDatabase(
    db_name,
    password=password,
    user=user,
    host=host,
    port=port)


class Table(Model):
    id = AutoField()

    class Meta:
        database = db


class Role(Table):
    name = CharField()


class Subject(Table):
    name = CharField()


class User(Table):
    name = CharField()
    role = ForeignKeyField(Role)
    password = CharField()


class UserSubjects(Table):
    subject_id = ForeignKeyField(Subject)
    user_id = ForeignKeyField(User)
    grade = IntegerField()


def test_data():
    _ = Role.get_or_create(
        name="admin"
    )

    _ = Role.get_or_create(
        name="student"
    )

    _ = Role.get_or_create(
        name="teacher"
    )

    _ = User.get_or_create(
        name="admin",
        role=1,
        password="admin"
    )

    _ = User.get_or_create(
        name="user1",
        role=2,
        password="123"
    )

    _ = Subject.get_or_create(
        name="Math"
    )

    _ = UserSubjects.get_or_create(
        user_id=1,
        subject_id=1,
        grade=4
    )


if __name__ == "__main__":
    db.create_tables([
        Role,
        User,
        Subject,
        UserSubjects
    ])

    test_data()
