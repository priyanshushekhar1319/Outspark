from sqlalchemy import Column, Integer, String, DateTime, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")  # "user" or "admin"
    plan = Column(String, default="free")  # free, basic, pro, enterprise
    created_at = Column(DateTime)
    reviews = relationship("Review", back_populates="user", cascade="all, delete")
    orders = relationship("Order", back_populates="user", cascade="all, delete")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    linkedin_url = Column(String)
    full_name = Column(String)
    current_role = Column(String)
    target_role = Column(String)
    phone = Column(String)
    status = Column(String, default="pending")  # pending, in_progress, completed
    feedback = Column(Text, nullable=True)
    score = Column(Float, nullable=True)
    created_at = Column(DateTime)
    user = relationship("User", back_populates="reviews")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan = Column(String)
    amount = Column(Float)
    status = Column(String, default="pending")
    payment_id = Column(String, nullable=True)
    created_at = Column(DateTime)
    user = relationship("User", back_populates="orders")
