
from pymongo import MongoClient, errors

MONGO_URL = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"
DB_NAME = "campus_connect_db"


def connect_db():
    global client, db
    try:
        client = MongoClient("mongodb+srv://<username>:<password>@cluster0.mongodb.net/")
        client.admin.command('ping')  # ✅ test connection
        print("✅ MongoDB connected successfully!")
        db = client["mydatabase"]
    except errors.ConnectionFailure as e:
        print("❌ MongoDB connection failed:", e)
        db = None
    return db

def get_db():
    return db

def close_db():
    global client
    if client:
        client.close()
