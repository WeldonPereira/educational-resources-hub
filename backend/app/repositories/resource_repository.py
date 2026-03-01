from sqlalchemy.orm import Session, joinedload
from app.models import Resource, Tag


class ResourceRepository:

    @staticmethod
    def get_all(db: Session, skip: int, limit: int):
        return (
            db.query(Resource)
            .options(joinedload(Resource.tags))
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_by_id(db: Session, resource_id: int):
        return db.query(Resource).filter(Resource.id == resource_id).first()

    @staticmethod
    def create(db: Session, resource: Resource):
        db.add(resource)
        db.commit()
        db.refresh(resource)
        return resource

    @staticmethod
    def delete(db: Session, resource: Resource):
        db.delete(resource)
        db.commit()

    @staticmethod
    def get_or_create_tags(db: Session, tag_names):
        unique_names = list(set([name.strip() for name in tag_names if name.strip()]))
        
        tags = []
        for name in unique_names:
            tag = db.query(Tag).filter(Tag.name == name).first()
            if not tag:
                tag = Tag(name=name)
                db.add(tag)
                db.commit() 
                db.refresh(tag)
            tags.append(tag)
        return tags

    @staticmethod
    def count(db: Session):
        return db.query(Resource).count()
