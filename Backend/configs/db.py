# configs/db.py
import os
import json
import firebase_admin
from firebase_admin import credentials, auth

firebase_key_json = os.getenv("FIREBASE_KEY_JSON")
if not firebase_admin._apps:
    cred_dict = json.loads(firebase_key_json)
    cred = credentials.Certificate(cred_dict)
    firebase_app = firebase_admin.initialize_app(cred)

# export for other modules
firebase_auth = auth
