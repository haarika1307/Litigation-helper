from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, cases, documents, evidence, tasks

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LexEvidence API")

# Setup CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(cases.router)
app.include_router(documents.router)
app.include_router(evidence.router)
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"status": "LexEvidence API is running"}
