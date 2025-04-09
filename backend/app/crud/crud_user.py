from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate  # Ensure these schemas are defined in your backend/app/schemas/user.py

def get_user(db: Session, user_id: int):
    """
    Retrieve a user by its ID.
    """
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    """
    Retrieve a user by their username.
    """
    return db.query(User).filter(User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve a list of users with pagination.
    """
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    """
    Create a new user.
    """
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.hashed_password  # It's recommended to hash the password beforehand
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    """
    Update an existing user.
    """
    db_user = get_user(db, user_id)
    if db_user:
        db_user.username = user_update.username
        db_user.email = user_update.email
        db_user.hashed_password = user_update.hashed_password  # Update with the new hashed password if needed
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    """
    Delete an existing user.
    """
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
"""
This file defines basic CRUD functions for user-related operations, similar to those for items. Adjust them according to your application's requirements and ensure that the corresponding schemas (`UserCreate`, `UserUpdate`) are defined.# filepath: /home/pragadeesh/ZeroXchange/backend/app/crud/crud_user.py
"""
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate  # Ensure these schemas are defined in your backend/app/schemas/user.py

def get_user(db: Session, user_id: int):
    """
    Retrieve a user by its ID.
    """
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    """
    Retrieve a user by their username.
    """
    return db.query(User).filter(User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve a list of users with pagination.
    """
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    """
    Create a new user.
    """
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.hashed_password  # It's recommended to hash the password beforehand
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    """
    Update an existing user.
    """
    db_user = get_user(db, user_id)
    if db_user:
        db_user.username = user_update.username
        db_user.email = user_update.email
        db_user.hashed_password = user_update.hashed_password  # Update with the new hashed password if needed
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    """
    Delete an existing user.
    """
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
"""

This file defines basic CRUD functions for user-related operations, similar to those for items. Adjust them according to your application's requirements and ensure that the corresponding schemas (`UserCreate`, `UserUpdate`) are defined.
"""