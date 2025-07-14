# 🧑‍💼 Job Portal Web Application

A full-stack job portal where Job Seekers can apply to jobs, Employers can post/manage listings, and Admins can oversee the platform.

---

## 📦 Tech Stack

- **Frontend:** Angular, Bootstrap
- **Backend:** Flask (Python), Flask-JWT-Extended, Flask-Migrate
- **Database:** PostgreSQL
- **API Integration:** JWT Authentication, RESTful APIs

---

## 🔧 Project Structure

```
job_portal/
├── backend/          # Flask API + PostgreSQL + Migrations
└── frontend/         # Angular UI
```

---

## 🚀 Setup Instructions

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/job_portal.git
cd job_portal
```

### 🔙 Backend Setup (Flask + PostgreSQL)

**📁 Navigate to backend:**

```bash
cd backend
```

**1️⃣ Create Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate          # macOS/Linux
# venv\Scripts\activate           # Windows
```

**2️⃣ Install Dependencies**

```bash
pip install flask flask_sqlalchemy flask_migrate flask_cors flask_jwt_extended psycopg2-binary python-dotenv
pip freeze > requirements.txt
```

**3️⃣ Configure Environment Variables**

Create a `.env` file:

```env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URI=postgresql://postgres:<your-password>@localhost/job_portal
JWT_SECRET_KEY=your_jwt_secret
```

Update `config.py` to read from `.env`.

**4️⃣ Database Setup with Flask-Migrate**

```bash
flask db init                     # one-time setup
flask db migrate -m "Initial migration"
flask db upgrade
```

Make sure PostgreSQL is running and the database `job_portal` exists.

**5️⃣ Run Flask Server**

```bash
flask run
```

* Server URL: `http://127.0.0.1:5001/`

### 🧑‍🎨 Frontend Setup (Angular)

**📁 Navigate to frontend:**

```bash
cd ../frontend
```

**1️⃣ Install Node Modules**

```bash
npm install
```

** Run Angular App **

```bash
ng serve
```

* Frontend URL: `http://localhost:4200/`

---

## ✅ Key Features

### 👤 Job Seeker
* Register / Login
* Browse and search jobs
* Apply to jobs
* View applied applications

### 🧑‍💼 Employer
* Register / Login
* Post, manage, delete jobs
* View applicants for each job

### 🛡️ Admin
* View & delete all jobs and users
* Admin panel access only via role check

---

## 📄 Useful Scripts

```bash
# Flask DB Migrations
flask db init
flask db migrate -m "your message"
flask db upgrade

# Angular Dev Server
ng serve
```