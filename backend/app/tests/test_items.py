from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_items():
    response = client.get("/items/")
    assert response.status_code == 200
    data = response.json()
    # The endpoint is expected to return a list of items
    assert "items" in data
    assert isinstance(data["items"], list)

def test_read_item():
    # Assuming item with id 1 exists in your test data
    response = client.get("/items/1")
    assert response.status_code == 200
    data = response.json()
    assert data.get("item_id") == 1
    assert "name" in data

def test_create_item():
    new_item = {"name": "NewItem", "description": "New description"}
    response = client.post("/items/", json=new_item)
    assert response.status_code == 200
    data = response.json()
    assert data.get("message") == "Item created successfully"
    assert data.get("item", {}).get("name") == new_item["name"]
"""
This file uses FastAPI's TestClient to test the `/items/` endpoints for reading the list of items, reading a single item, and creating a new item. Adjust the tests and assertions depending on your actual application behavior and data setup.# filepath: /home/pragadeesh/ZeroXchange/backend/app/tests/test_items.py
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_items():
    response = client.get("/items/")
    assert response.status_code == 200
    data = response.json()
    # The endpoint is expected to return a list of items
    assert "items" in data
    assert isinstance(data["items"], list)

def test_read_item():
    # Assuming item with id 1 exists in your test data
    response = client.get("/items/1")
    assert response.status_code == 200
    data = response.json()
    assert data.get("item_id") == 1
    assert "name" in data

def test_create_item():
    new_item = {"name": "NewItem", "description": "New description"}
    response = client.post("/items/", json=new_item)
    assert response.status_code == 200
    data = response.json()
    assert data.get("message") == "Item created successfully"
    assert data.get("item", {}).get("name") == new_item["name"]
"""
 

This file uses FastAPI's TestClient to test the `/items/` endpoints for reading the list of items, reading a single item, and creating a new item. Adjust the tests and assertions depending on your actual application behavior and data setup.
"""