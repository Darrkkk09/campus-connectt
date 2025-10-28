import os
from pymongo import MongoClient, errors


client = None
db = None

def connect_db():
    global client, db
    try:
        client = MongoClient("mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/")
        client.admin.command('ping')  # ✅ test connection
        print("✅ MongoDB connected successfully!")
        db = client["campus_connect_db"]
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
