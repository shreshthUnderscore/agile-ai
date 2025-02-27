import uuid
from pydantic import BaseModel, EmailStr
from fastapi import Path
from typing import List

class UserWithId(BaseModel):
    id: uuid.UUID
    name: str
    email: EmailStr
    notes: str
    minio_resume_id: str

class UserWithoutId(BaseModel):
    name: str
    email: EmailStr
    notes: str
    minio_resume_id: str

class ResumeUploadResponse(BaseModel):
    minio_resume_id: str

class CreateUserRequest(BaseModel):
    user: UserWithoutId

class CreateUserResponse(BaseModel):
    user: UserWithId

class GetUsersResponse(BaseModel):
    users: List[UserWithId]

class GetUserRequest(BaseModel):
    user_id: uuid.UUID

    @classmethod
    def query_params(
        cls,
        user_id: uuid.UUID = Path(..., title="User ID", description="The ID of the user to retrieve"),
    ):
        return cls(user_id=user_id)

class GetUserResponse(BaseModel):
    user: UserWithId

class UpdateUserRequest(BaseModel):
    # moved to path parameters
    # user_id: uuid.UUID
    user: UserWithoutId

class UpdateUserResponse(BaseModel):
    user: UserWithId

class DeleteUserRequest(BaseModel):
    user_id: uuid.UUID
    
    @classmethod
    def query_params(
        cls,
        user_id: uuid.UUID = Path(..., title="User ID", description="The ID of the user to delete"),
    ):
        return cls(user_id=user_id)
