from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.resource_service import ResourceService
from app.schemas.resource_schema import ResourceCreate, ResourceResponse, ResourceUpdate
from app.schemas.pagination_schema import PaginatedResponse

router = APIRouter(prefix="/resources", tags=["Resources"])


@router.get("/", response_model=PaginatedResponse[ResourceResponse])
def list_resources(page: int = 1, page_size: int = 10, db: Session = Depends(get_db)):
    return ResourceService.list_resources(db, page, page_size)


@router.get("/{resource_id}", response_model=ResourceResponse)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = ResourceService.get_resource(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource


@router.post("/", response_model=ResourceResponse)
def create_resource(data: ResourceCreate, db: Session = Depends(get_db)):
    return ResourceService.create_resource(db, data)


@router.delete("/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = ResourceService.get_resource(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    ResourceService.delete_resource(db, resource)
    return {"message": "Resource deleted"}


@router.put("/{resource_id}", response_model=ResourceResponse)
def update_resource(
    resource_id: int, data: ResourceUpdate, db: Session = Depends(get_db)
):
    resource = ResourceService.get_resource(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")

    return ResourceService.update_resource(db, resource, data)
