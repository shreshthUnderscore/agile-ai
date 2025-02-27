from fastapi import APIRouter
from . import users

main_router = APIRouter(prefix="/v1")

main_router.include_router(users.router)
