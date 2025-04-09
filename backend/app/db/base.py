from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Import all your models here for Alembic migrations
from app.models.item import Item
from app.models.user import User