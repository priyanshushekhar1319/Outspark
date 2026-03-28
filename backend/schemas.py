from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    plan: str
    created_at: Optional[datetime]
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str

class ReviewCreate(BaseModel):
    linkedin_url: str
    full_name: str
    current_role: str
    target_role: str
    phone: str

class ReviewOut(BaseModel):
    id: int
    linkedin_url: str
    full_name: str
    current_role: str
    target_role: str
    status: str
    feedback: Optional[str]
    score: Optional[float]
    created_at: Optional[datetime]
    class Config:
        from_attributes = True

class ReviewAdminOut(ReviewOut):
    user_id: int
    phone: str

class ReviewStatusUpdate(BaseModel):
    status: str
    feedback: Optional[str] = None
    score: Optional[float] = None

class PaymentRequest(BaseModel):
    plan: str
    amount: float

class OrderOut(BaseModel):
    id: int
    plan: str
    amount: float
    status: str
    payment_id: Optional[str]
    created_at: Optional[datetime]
    class Config:
        from_attributes = True
