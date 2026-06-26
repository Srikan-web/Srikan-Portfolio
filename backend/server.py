from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from bson import ObjectId
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_KEY = os.environ.get('ADMIN_KEY', 'srikan-admin-2026')

app = FastAPI(title="Srikan Dewasumithra Portfolio API")
api_router = APIRouter(prefix="/api")


# ---- Mongo helpers ----
def _validate_object_id(v):
    if isinstance(v, ObjectId):
        return str(v)
    return str(v)


PyObjectId = Annotated[str, BeforeValidator(_validate_object_id)]


# ---- Models ----
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    read: bool = False


@api_router.get("/")
async def root():
    return {"message": "Srikan Dewasumithra Portfolio API"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject or "",
        message=payload.message,
    )
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


def _require_admin(x_admin_key: Optional[str]):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Invalid admin key")


@api_router.post("/admin/login")
async def admin_login(payload: dict):
    if payload.get("key") != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    return {"ok": True}


@api_router.get("/admin/messages", response_model=List[ContactMessage])
async def list_messages(x_admin_key: Optional[str] = Header(default=None)):
    _require_admin(x_admin_key)
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [ContactMessage(**d) for d in docs]


@api_router.patch("/admin/messages/{message_id}/read")
async def mark_read(message_id: str, x_admin_key: Optional[str] = Header(default=None)):
    _require_admin(x_admin_key)
    await db.contact_messages.update_one({"id": message_id}, {"$set": {"read": True}})
    return {"ok": True}


@api_router.delete("/admin/messages/{message_id}")
async def delete_message(message_id: str, x_admin_key: Optional[str] = Header(default=None)):
    _require_admin(x_admin_key)
    await db.contact_messages.delete_one({"id": message_id})
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
