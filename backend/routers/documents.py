import os
import shutil
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import models, schemas, auth
from database import get_db

try:
    import pytesseract
    from PIL import Image
    from pdf2image import convert_from_path
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
    dependencies=[Depends(auth.get_current_user)]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def process_ocr(file_path: str, file_type: str) -> str:
    if not OCR_AVAILABLE:
        return "OCR processing currently unavailable. Required libraries not fully installed."
    
    extracted_text = ""
    try:
        if file_type.startswith("image/"):
            img = Image.open(file_path)
            extracted_text = pytesseract.image_to_string(img)
        elif file_type == "application/pdf":
            try:
                images = convert_from_path(file_path)
                for img in images:
                    extracted_text += pytesseract.image_to_string(img) + "\n"
            except Exception as e:
                # Handle missing poppler or conversion issues
                extracted_text = f"[OCR Module Error on PDF: {str(e)}]"
    except Exception as e:
        extracted_text = f"[OCR Failed: {str(e)}]"
        
    return extracted_text.strip()

@router.post("/upload", response_model=schemas.Document)
async def upload_document(
    file: UploadFile = File(...), 
    case_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    # Save file
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Run OCR if applicable
    extracted_text = ""
    if file.content_type in ["application/pdf", "image/png", "image/jpeg", "image/jpg"]:
        extracted_text = process_ocr(file_path, file.content_type)
        
    # Save to db
    db_document = models.Document(
        name=file.filename,
        file_path=file_path,
        file_type=file.content_type,
        extracted_text=extracted_text,
        case_id=case_id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    # Auto-extract evidence (Mock AI Extraction for demo purposes)
    if extracted_text and len(extracted_text) > 20:
        db_evidence = models.Evidence(
            type="Document Extract",
            description=f"Auto-extracted from {file.filename}",
            case_id=case_id,
            document_id=db_document.id
        )
        db.add(db_evidence)
        db.commit()
        
    return db_document

@router.get("/", response_model=List[schemas.Document])
def read_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Document).offset(skip).limit(limit).all()

@router.get("/{document_id}", response_model=schemas.Document)
def read_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
