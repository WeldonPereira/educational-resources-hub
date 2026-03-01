from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime


class TagBase(BaseModel):
    name: str


class TagResponse(TagBase):
    id: int

    class Config:
        from_attributes = True


class ResourceCreate(BaseModel):
    title: str
    description: Optional[str] = None
    type: str
    url: HttpUrl
    tags: List[str] = []


class ResourceUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    type: Optional[str]
    url: Optional[HttpUrl]
    tags: Optional[List[str]]


class ResourceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    type: str
    url: str
    created_at: datetime
    tags: List[TagResponse]

    class Config:
        from_attributes = True
