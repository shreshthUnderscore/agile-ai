from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from app.utils.minio import get_minio_client, MinioClient
from app.logger import get_logger
from app.utils.models import (
    ResumeUploadResponse,
    ResumeDownloadLinkRequest,
    ResumeDownloadLinkResponse,
)

router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"],
)

logger = get_logger()
minio_client = get_minio_client()

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_resume(
    resume: UploadFile = File(...),
) -> ResumeUploadResponse:
    """Upload a resume to MinIO storage"""
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF files are supported"
        )
        
    try:
        resume_id = await minio_client.upload_file(resume)
        # TODO: process resume here and save to mongodb
        return ResumeUploadResponse(
            minio_resume_id=resume_id
        )
    except Exception as e:
        logger.error(f"Failed to upload resume: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload resume"
        )

@router.get("/{minio_resume_id}")
async def get_resume_download_link(
    request: ResumeDownloadLinkRequest = Depends(ResumeDownloadLinkRequest.query_params),
    minio_client: MinioClient = Depends(get_minio_client)
) -> ResumeDownloadLinkResponse:
    """Get a download link for a resume stored in MinIO"""
    try:
        download_url = minio_client.get_download_link(request.minio_resume_id, request.expiration)
        return ResumeDownloadLinkResponse(download_link=download_url)
    except Exception as e:
        logger.error(f"Failed to generate download link: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate download link"
        )
