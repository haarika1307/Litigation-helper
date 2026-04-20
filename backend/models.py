from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Float
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)

    cases = relationship("Case", back_populates="owner")
    tasks = relationship("Task", back_populates="assignee")

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    court = Column(String)
    opponent = Column(String)
    next_hearing = Column(String)
    status = Column(String, default="Active")
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="cases")
    documents = relationship("Document", back_populates="case")
    evidence = relationship("Evidence", back_populates="case")
    tasks = relationship("Task", back_populates="case")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(String)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)
    extracted_text = Column(Text, nullable=True) # OCR results
    case_id = Column(Integer, ForeignKey("cases.id"))

    case = relationship("Case", back_populates="documents")
    evidence = relationship("Evidence", back_populates="source_document")

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    description = Column(String)
    date = Column(String)
    amount = Column(Float, nullable=True)
    case_id = Column(Integer, ForeignKey("cases.id"))
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=True)

    case = relationship("Case", back_populates="evidence")
    source_document = relationship("Document", back_populates="evidence")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    due_date = Column(String)
    status = Column(String, default="Pending")
    case_id = Column(Integer, ForeignKey("cases.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"))

    case = relationship("Case", back_populates="tasks")
    assignee = relationship("User", back_populates="tasks")
