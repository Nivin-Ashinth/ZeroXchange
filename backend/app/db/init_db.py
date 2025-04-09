from app.db.session import engine
from app.db.base import Base  # This module should import all your models

def init_db():
    """
    Creates all tables in the database.
    """
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully.")

if __name__ == "__main__":
    init_db()