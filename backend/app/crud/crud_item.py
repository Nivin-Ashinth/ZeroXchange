from sqlalchemy.orm import Session
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate  # Ensure these schemas are defined in your backend/app/schemas/item.py

def get_item(db: Session, item_id: int):
    """
    Retrieve an item by its ID.
    """
    return db.query(Item).filter(Item.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve a list of items with pagination.
    """
    return db.query(Item).offset(skip).limit(limit).all()

def create_item(db: Session, item: ItemCreate):
    """
    Create a new item.
    """
    db_item = Item(name=item.name, description=item.description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item_update: ItemUpdate):
    """
    Update an existing item.
    """
    db_item = get_item(db, item_id)
    if db_item:
        db_item.name = item_update.name
        db_item.description = item_update.description
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    """
    Delete an existing item.
    """
    db_item = get_item(db, item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item