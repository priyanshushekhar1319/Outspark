# 🚀 Outspark — LinkedIn Profile Review SaaS

> Developed by **Priyanshu**  
> A full-stack LinkedIn Profile Review platform with Admin & User dashboards, JWT auth, and bypassed payment.

---

## 📁 Project Structure

```
outspark/
├── backend/          ← FastAPI + PostgreSQL
│   ├── main.py       ← All API routes
│   ├── models.py     ← SQLAlchemy DB models
│   ├── schemas.py    ← Pydantic request/response schemas
│   ├── auth.py       ← JWT + bcrypt utilities
│   ├── database.py   ← DB connection
│   ├── .env          ← Environment variables
│   └── requirements.txt
│
└── frontend/         ← Next.js + Tailwind CSS
    ├── app/
    │   ├── page.tsx          ← Landing page
    │   ├── login/page.tsx    ← Login
    │   ├── signup/page.tsx   ← Register
    │   ├── dashboard/page.tsx ← User dashboard
    │   └── admin/page.tsx    ← Admin panel
    ├── lib/api.ts            ← Axios API client
    └── .env.local
```

---

## 🔧 BACKEND SETUP

### 1. Prerequisites
- Python 3.9+
- PostgreSQL running locally

### 2. Create & activate virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment
Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/outspark
SECRET_KEY=outspark_priyanshu_secret_2024_xK9mN3pQ
```

### 5. Create PostgreSQL database
```bash
psql -U postgres
CREATE DATABASE outspark;
\q
```

### 6. Run the backend
```bash
uvicorn main:app --host 0.0.0.0 --port 10000 --reload
```

The API will be live at: **http://localhost:10000**  
Swagger docs: **http://localhost:10000/docs**

> **Admin account is auto-seeded on first startup:**  
> Email: `admin@outspark.com`  
> Password: `admin@123`

---

## 🎨 FRONTEND SETUP

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Configure environment
Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:10000
```

### 3. Run the frontend
```bash
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## 🔐 LOGIN CREDENTIALS

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin |      |   |
| User  | Register at /signup    | your choice|

---

## 💳 PAYMENT (BYPASSED)

Payment is **fully bypassed** — clicking any pricing plan:
1. Instantly upgrades the user's account
2. Creates an order record with status `completed`
3. Returns success without any real payment gateway

To integrate a real gateway (Razorpay/Stripe), replace `POST /api/payment/checkout` in `main.py`.

---

## 🌐 API ENDPOINTS

### Auth
| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| POST   | /api/register   | Register new user  |
| POST   | /api/login      | Login (OAuth2 form)|
| GET    | /api/me         | Get current user   |

### Reviews
| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| POST   | /api/submit-review  | Submit LinkedIn URL   |
| GET    | /api/my-reviews     | Get user's reviews    |

### Payment
| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| POST   | /api/payment/checkout  | Buy plan (bypassed)|
| GET    | /api/payment/orders    | Order history      |

### Admin (requires admin JWT)
| Method | Endpoint                     | Description         |
|--------|------------------------------|---------------------|
| GET    | /api/admin/stats             | Dashboard stats     |
| GET    | /api/admin/users             | All users           |
| DELETE | /api/admin/users/{id}        | Delete user         |
| GET    | /api/admin/reviews           | All reviews         |
| PATCH  | /api/admin/reviews/{id}      | Update feedback     |

---

## ☁️ DEPLOY ON RENDER

### Backend
1. Push `backend/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port 10000`
5. Add env vars: `DATABASE_URL`, `SECRET_KEY`
6. Create a **PostgreSQL** database on Render and copy the connection URL

### Frontend
1. Push `frontend/` to GitHub
2. Create a new **Static Site** or **Web Service** on Render
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`

---

## 🛠️ TECH STACK

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | FastAPI (Python)                  |
| Database  | PostgreSQL                        |
| ORM       | SQLAlchemy                        |
| Auth      | JWT (python-jose + passlib/bcrypt)|
| Frontend  | Next.js 14 + TypeScript           |
| Styling   | Tailwind CSS                      |
| HTTP      | Axios                             |
| Hosting   | Render                            |

---

## 👤 Developer

**Priyanshu** — Full Stack Developer  
Built with FastAPI + Next.js + PostgreSQL

---

## 📌 Features

- ✅ Landing page with pricing, testimonials, CTAs
- ✅ User registration & JWT login
- ✅ Admin login with protected routes
- ✅ User dashboard — submit profile, view feedback
- ✅ Admin dashboard — manage reviews, users, stats
- ✅ Payment section (bypassed — instant plan upgrade)
- ✅ Order history
- ✅ Auto-seeded admin account on startup
- ✅ Role-based access control (user / admin)
- ✅ Fully responsive Tailwind CSS UI
