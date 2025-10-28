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
