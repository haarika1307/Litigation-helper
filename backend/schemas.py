from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class CaseBase(BaseModel):
    name: str
    court: Optional[str] = None
    opponent: Optional[str] = None
    next_hearing: Optional[str] = None
    status: Optional[str] = "Active"
    notes: Optional[str] = None

class CaseCreate(CaseBase):
    pass

class Case(CaseBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    name: str
    file_type: Optional[str] = None
    case_id: Optional[int] = None

class DocumentCreate(DocumentBase):
    file_path: str

class Document(DocumentBase):
    id: int
    uploaded_at: datetime
    extracted_text: Optional[str] = None

    class Config:
        from_attributes = True

class EvidenceBase(BaseModel):
    type: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    amount: Optional[float] = None
    case_id: Optional[int] = None

class EvidenceCreate(EvidenceBase):
    document_id: Optional[int] = None

class Evidence(EvidenceBase):
    id: int
    document_id: Optional[int] = None

    class Config:
        from_attributes = True

class TaskBase(BaseModel):
    title: str
    due_date: Optional[str] = None
    status: Optional[str] = "Pending"
    case_id: Optional[int] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    assignee_id: Optional[int] = None

    class Config:
        from_attributes = True
