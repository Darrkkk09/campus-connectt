from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from configs.db import firebase_app  # your initialized Firebase app

security = HTTPBearer()

def verify_token(auth_creds: HTTPAuthorizationCredentials = Depends(security)):
    token = auth_creds.credentials
    try:
        decoded = auth.verify_id_token(token, app=firebase_app)
        # decoded contains uid, email, and other claims
        return decoded
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase token"
        )
