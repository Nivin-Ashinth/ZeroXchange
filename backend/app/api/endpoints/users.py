from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_users():
    """
    Retrieve a list of users.
    """
    # In a real application, replace this with a database query
    return {"users": ["Alice", "Bob", "Charlie"]}