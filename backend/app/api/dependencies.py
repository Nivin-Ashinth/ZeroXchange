from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

# Import the database session dependency from your DB utilities
from app.db.session import get_db
# Hypothetical function from your security module to decode JWT tokens
from app.core.security import decode_jwt_token

def get_db_session() -> Session:
    """
    Dependency that provides a database session.
    """
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(decode_jwt_token)):
    """
    Dependency that retrieves and validates the current user from the JWT token.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return token