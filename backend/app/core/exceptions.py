from fastapi import Request
from fastapi.responses import JSONResponse


class AppException(Exception):
    def __init__(self, message: str):
        self.message = message


async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(status_code=400, content={"error": exc.message})
