from fastapi import FastAPI
from pymongo import MongoClient
import os

app = FastAPI()

MONGO_URL = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"
DB_NAME = "campus_connect_db"

from pymongo import MongoClient

client = None
db = None

def connect_db():
    global client, db
    client = MongoClient("mongodb+srv://<username>:<password>@cluster0.mongodb.net/")
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


