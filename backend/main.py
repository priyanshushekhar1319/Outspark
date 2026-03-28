from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
import models, schemas, auth
from database import engine, get_db

app = FastAPI(title="Outspark LinkedIn Review API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.on_event("startup")
def startup():
    try:
        models.Base.metadata.create_all(bind=engine)
        from database import SessionLocal
        db = SessionLocal()
        admin = db.query(models.User).filter(models.User.email == "admin@outspark.com").first()
        if not admin:
            hashed = auth.hash_password("admin@123")
            db.add(models.User(
                name="Priyanshu Admin",
                email="admin@outspark.com",
                hashed_password=hashed,
                role="admin",
                plan="enterprise",
                created_at=datetime.utcnow()
            ))
            db.commit()
        db.close()
        print("✅ Database ready!")
    except Exception as e:
        print(f"❌ Startup error: {e}")
        raise e

@app.get("/")
def root():
    return {"status": "Outspark API running ✅"}

# ─── AUTH ───────────────────────────────────────────────
@app.post("/api/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=auth.hash_password(user.password),
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

@app.get("/api/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# ─── REVIEWS ────────────────────────────────────────────
@app.post("/api/submit-review", response_model=schemas.ReviewOut)
def submit_review(review: schemas.ReviewCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_review = models.Review(
        user_id=current_user.id,
        linkedin_url=review.linkedin_url,
        full_name=review.full_name,
