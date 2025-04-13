from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_jwt_token
def get_db_session() -> Session:
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(decode_jwt_token)):
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return token