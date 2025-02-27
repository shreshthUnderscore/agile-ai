from pydantic import BaseModel, AnyHttpUrl
from fastapi import Path

class ResumeUploadResponse(BaseModel):
    minio_resume_id: str

class ResumeDownloadLinkRequest(BaseModel):
    minio_resume_id: str

    @classmethod
    def query_params(
        cls,
        minio_resume_id: str = Path(..., title="Minio Resume ID", description="The ID of the minio resume to retrieve"),
    ):
        return cls(minio_resume_id=minio_resume_id)

class ResumeDownloadLinkResponse(BaseModel):
    download_link: AnyHttpUrl
