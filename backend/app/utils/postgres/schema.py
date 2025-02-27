# Path: app/utils/postgres/schema.py
# Description: This file contains the database scheme of the application.

import uuid
from .base import DatabaseBase
from sqlalchemy import (
    Column,
    String,
    VARCHAR,
    UUID,
    PrimaryKeyConstraint,
    UniqueConstraint,
    ForeignKeyConstraint,
    Boolean,
    DateTime,
    Enum,
    Integer,
)
from app.config import get_settings

settings = get_settings()

class Users(DatabaseBase):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    notes = Column(String, nullable=True)
    minio_resume_id = Column(UUID(as_uuid=True), nullable=False)
