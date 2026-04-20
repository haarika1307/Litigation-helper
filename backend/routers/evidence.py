from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, auth
from database import get_db

router = APIRouter(
    prefix="/evidence",
    tags=["Evidence"],
    dependencies=[Depends(auth.get_current_user)]
)

@router.get("/", response_model=List[schemas.Evidence])
def read_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    evidence = db.query(models.Evidence).offset(skip).limit(limit).all()
    return evidence

@router.post("/", response_model=schemas.Evidence)
def create_evidence(evidence: schemas.EvidenceCreate, db: Session = Depends(get_db)):
    db_evidence = models.Evidence(**evidence.model_dump())
    db.add(db_evidence)
    db.commit()
    db.refresh(db_evidence)
    return db_evidence
