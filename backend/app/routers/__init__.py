from fastapi import APIRouter
from . import users, resume, kanban

main_router = APIRouter(prefix="/v1")

main_router.include_router(users.router)
main_router.include_router(resume.router)
main_router.include_router(kanban.router)
