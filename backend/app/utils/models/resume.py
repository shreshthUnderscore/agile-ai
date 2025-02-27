from pydantic import BaseModel, AnyHttpUrl
from fastapi import Path, Query

class ResumeUploadResponse(BaseModel):
    minio_resume_id: str

class ResumeDownloadLinkRequest(BaseModel):
    minio_resume_id: str
    expiration: int = 3600

    @classmethod
    def query_params(
        cls,
        minio_resume_id: str = Path(..., title="Minio Resume ID", description="The ID of the minio resume to retrieve"),
        expiration: int = Query(3600, title="Expiration", description="Link expiration time in seconds (default 1 hour)")
    ):
        return cls(minio_resume_id=minio_resume_id, expiration=expiration)

class ResumeDownloadLinkResponse(BaseModel):
    download_link: AnyHttpUrl
