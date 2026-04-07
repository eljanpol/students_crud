import peewee
from peewee import Model, CharField, MySQLDatabase, AutoField, ForeignKeyField
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


def test_data():
    _ = Role.get_or_create(
        name="admin"
    )

    _ = User.get_or_create(
        name="User1",
        role=1
    )


if __name__ == "__main__":
    db.create_tables([
        Role,
        User
    ])

    test_data()
