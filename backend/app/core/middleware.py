import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

logger = logging.getLogger("request_logger")


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()

        response = await call_next(request)

        process_time = round(time.time() - start_time, 2)

        logger.info(
            f"[INFO] Request: {request.method} {request.url.path} - {process_time}s"
        )

        return response
