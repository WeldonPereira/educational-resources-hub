from sqlalchemy.orm import Session
from app.models import Resource
from app.repositories.resource_repository import ResourceRepository


class ResourceService:

    @staticmethod
    def list_resources(db: Session, page: int, page_size: int):
        skip = (page - 1) * page_size
        resources = ResourceRepository.get_all(db, skip, page_size)
        total = ResourceRepository.count(db)
        return {"data": resources, "total": total, "page": page, "page_size": page_size}

    @staticmethod
    def get_resource(db: Session, resource_id: int):
        return ResourceRepository.get_by_id(db, resource_id)

    @staticmethod
    def create_resource(db: Session, data):
        tags = ResourceRepository.get_or_create_tags(db, data.tags)

        resource = Resource(
            title=data.title,
            description=data.description,
            type=data.type,
            url=str(data.url),
            tags=tags,
        )

        return ResourceRepository.create(db, resource)

    @staticmethod
    def delete_resource(db: Session, resource):
        ResourceRepository.delete(db, resource)

    @staticmethod
    def update_resource(db: Session, resource: Resource, data):
        if data.title is not None:
            resource.title = data.title
        if data.description is not None:
            resource.description = data.description
        if data.type is not None:
            resource.type = data.type
        if data.url is not None:
            resource.url = str(data.url)

        if data.tags is not None:
            new_tags = ResourceRepository.get_or_create_tags(db, data.tags)
            resource.tags = new_tags

        return ResourceRepository.create(db, resource)
