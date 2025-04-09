from fastapi import FastAPI

from app.api.endpoints import items, users

app = FastAPI(title="ZeroXchange", version="1.0.0")

app.include_router(items.router, prefix="/items", tags=["items"])
app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ZeroXchange API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    