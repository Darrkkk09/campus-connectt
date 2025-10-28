from pymongo import MongoClient


MONGO_URL = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"
DB_NAME = "campus_connect_db"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]


def connect_db():
    global client, db
    client = MongoClient(MONGO_URL)
    db = client["mydatabase"]
    return db

def close_db():
    global client
    if client:
        client.close()

def get_db():
    global db
    if not db:
        connect_db()
    return db

