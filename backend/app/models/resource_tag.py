from sqlalchemy import Column, Integer, ForeignKey
from app.db.base import Base


class ResourceTag(Base):
    __tablename__ = "resource_tags"

    resource_id = Column(Integer, ForeignKey("resources.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id"), primary_key=True)
