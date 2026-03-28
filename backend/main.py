from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional, List
import models, schemas, auth
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Outspark LinkedIn Review API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ─── AUTH ───────────────────────────────────────────────
@app.post("/api/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = auth.hash_password(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed,
        role="user",
        plan="free",
        created_at=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "role": user.role, "name": user.name}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = auth.decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(models.User).filter(models.User.email == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def require_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# ─── PROFILE REVIEW ─────────────────────────────────────
@app.post("/api/submit-review", response_model=schemas.ReviewOut)
def submit_review(review: schemas.ReviewCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_review = models.Review(
        user_id=current_user.id,
        linkedin_url=review.linkedin_url,
        full_name=review.full_name,
        current_role=review.current_role,
        target_role=review.target_role,
        phone=review.phone,
        status="pending",
        created_at=datetime.utcnow()
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@app.get("/api/my-reviews", response_model=List[schemas.ReviewOut])
def my_reviews(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Review).filter(models.Review.user_id == current_user.id).all()

@app.get("/api/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# ─── PAYMENT (BYPASSED) ─────────────────────────────────
@app.post("/api/payment/checkout")
def checkout(payload: schemas.PaymentRequest, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Payment bypassed - directly upgrade user
    plan_map = {"basic": "basic", "pro": "pro", "enterprise": "enterprise"}
    current_user.plan = plan_map.get(payload.plan, "pro")
    db.commit()
    order = models.Order(
        user_id=current_user.id,
        plan=payload.plan,
        amount=payload.amount,
        status="completed",
        payment_id=f"BYPASS_{datetime.utcnow().timestamp()}",
        created_at=datetime.utcnow()
    )
    db.add(order)
    db.commit()
    return {"success": True, "message": "Payment successful", "plan": current_user.plan}

@app.get("/api/payment/orders", response_model=List[schemas.OrderOut])
def my_orders(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Order).filter(models.Order.user_id == current_user.id).all()

# ─── ADMIN ──────────────────────────────────────────────
@app.get("/api/admin/users", response_model=List[schemas.UserOut])
def admin_users(db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    return db.query(models.User).all()

@app.get("/api/admin/reviews", response_model=List[schemas.ReviewAdminOut])
def admin_reviews(db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    return db.query(models.Review).all()

@app.patch("/api/admin/reviews/{review_id}")
def update_review_status(review_id: int, payload: schemas.ReviewStatusUpdate, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.status = payload.status
    review.feedback = payload.feedback
    review.score = payload.score
    db.commit()
    return {"success": True}

@app.get("/api/admin/stats")
def admin_stats(db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    total_users = db.query(models.User).count()
    total_reviews = db.query(models.Review).count()
    pending = db.query(models.Review).filter(models.Review.status == "pending").count()
    total_orders = db.query(models.Order).filter(models.Order.status == "completed").count()
    revenue = db.query(models.Order).filter(models.Order.status == "completed").all()
    total_revenue = sum([o.amount for o in revenue])
    return {
        "total_users": total_users,
        "total_reviews": total_reviews,
        "pending_reviews": pending,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }

@app.delete("/api/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), admin: models.User = Depends(require_admin)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"success": True}

@app.on_event("startup")
def seed_admin():
    from database import SessionLocal
    db = SessionLocal()
    admin = db.query(models.User).filter(models.User.email == "admin@outspark.com").first()
    if not admin:
        hashed = auth.hash_password("admin@123")
        admin_user = models.User(
            name="Priyanshu Admin",
            email="admin@outspark.com",
            hashed_password=hashed,
            role="admin",
            plan="enterprise",
            created_at=datetime.utcnow()
        )
        db.add(admin_user)
        db.commit()
    db.close()
