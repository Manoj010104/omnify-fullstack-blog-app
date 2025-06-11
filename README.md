# Omnify Full-Stack Blog Application

<!-- Demo Screenshots -->
<p align="center">
  <img src="WhatsApp Image 2025-06-11 at 18.54.28_0118a6ef.jpg" alt="Demo Screenshot 1" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.28_877360fb.jpg" alt="Demo Screenshot 2" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.29_a06d7c51.jpg" alt="Demo Screenshot 3" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.29_b4ade554.jpg" alt="Demo Screenshot 4" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.29_de060f3a.jpg" alt="Demo Screenshot 5" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.30_4449dc4d.jpg" alt="Demo Screenshot 6" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.30_d947fa64.jpg" alt="Demo Screenshot 7" width="400"/>
  <img src="WhatsApp Image 2025-06-11 at 18.54.30_e8a0b7b4.jpg" alt="Demo Screenshot 8" width="400"/>
</p>

A modern, responsive blog platform built with React (frontend) and Django REST Framework (backend), allowing users to create, view, and manage blog posts with robust authentication and a focus on maintainability and cloud deployment.

---

## Table of Contents

1. [Project Overview](#1-project-overview)  
2. [Features](#2-features)  
3. [Tech Stack](#3-tech-stack)  
4. [Project Structure](#4-project-structure)  
5. [Local Development Setup](#5-local-development-setup)  
   - [Prerequisites](#prerequisites)  
   - [Backend Setup](#backend-setup)  
   - [Frontend Setup](#frontend-setup)  
   - [Running Locally](#running-locally)  
   - [Local Testing Credentials](#local-testing-credentials)  
6. [Deployment](#6-deployment)  
   - [Platform Choices & Justification](#platform-choices--justification)  
   - [Deployed URLs](#deployed-urls)  
   - [Backend Deployment (Render)](#backend-deployment-render)  
   - [Frontend Deployment (Vercel/Netlify)](#frontend-deployment-vercelnetlify)  
   - [Post-Deployment Configuration](#post-deployment-configuration)  
7. [Challenges & Solutions](#7-challenges--solutions)  
8. [Future Enhancements](#8-future-enhancements)  
9. [Contact](#9-contact)  
10. [License](#10-license)  

---

## 1. Project Overview

This repository implements a full-stack blog application for the Omnify Full-Stack Intern Assessment. It enables users to register, log in, create, view, edit, and delete blog posts. The architecture separates frontend and backend concerns, uses secure JWT authentication, and is cloud-ready.

---

## 2. Features

- **User Authentication:**  
  - Email/password registration, JWT-based login  
  - Secure session management and protected endpoints  
- **Blog CRUD:**  
  - Create, read (public), update, and delete blog posts  
  - Only authors can edit/delete their own posts  
- **Responsive UI:**  
  - Fully responsive (desktop, tablet, mobile)  
- **API-Driven:**  
  - RESTful API using Django REST Framework  
- **Database-backed:**  
  - Data persisted in SQLite/PostgreSQL  
- **Production Ready:**  
  - Cloud deployment with CORS, environment variables, and best practices

---

## 3. Tech Stack

### Frontend (React)
- React (Create React App)
- React Router DOM v6
- Axios
- React Context API (auth management)
- Tailwind CSS
- jwt-decode
- react-loading-skeleton, canvas-confetti

### Backend (Django)
- Django
- Django REST Framework
- djangorestframework-simplejwt (JWT Auth)
- dj-database-url, python-dotenv
- gunicorn (production server)
- psycopg2-binary (PostgreSQL driver)

### Database
- **Local:** SQLite3  
- **Production:** PostgreSQL (managed by Render)

### Deployment
- **Backend:** Render  
- **Frontend:** Vercel or Netlify

---

## 4. Project Structure

```
blog_application/
├── backend/
│   ├── blogapi/           # DRF app: models, views, serializers, permissions
│   ├── blogproject/       # Django project: settings, urls
│   ├── manage.py
│   ├── Procfile           # For Render deployment
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── requirements.txt
```

---

## 5. Local Development Setup

### Prerequisites

- **Python 3.9+**
- **Node.js 18+ & npm 8+**
- **Git**

### Clone the Repository

```bash
git clone https://github.com/Manoj010104/omnify-fullstack-blog-app.git
cd omnify-fullstack-blog-app
```

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
```

#### Create `.env` in `backend/`:

```env
SECRET_KEY='your_django_secret_key'
DEBUG=True
DATABASE_URL='sqlite:///db.sqlite3'
JWT_SECRET='your_simplejwt_secret_key'
```
*Generate keys using:*  
`python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
- API: http://127.0.0.1:8000/api/  
- Admin: http://127.0.0.1:8000/admin/

### Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create `.env.development`:

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/
```

#### Create `.env.production` (for deployment):

```env
REACT_APP_API_BASE_URL=https://omnify-blog-backend-xxxx.onrender.com/api/
```

```bash
npm start
```
- App: http://localhost:3000/

### Running Locally

- Run Django backend and React frontend in separate terminals.
- Open http://localhost:3000 in your browser.

### Local Testing Credentials

- Use the Django superuser credentials you set during `createsuperuser` for login.

---

## 6. Deployment

### Platform Choices & Justification

- **Render** (Backend): Easy, reliable PaaS for Django/PostgreSQL with free tier.
- **Vercel/Netlify** (Frontend): Fast, CI/CD optimized static deployment.
- **Why not AWS/GCP/Azure?**: PaaS solutions reduce operational complexity and are ideal for rapid prototyping and small teams.

### Deployed URLs

- **Backend API:** `https://omnify-blog-backend-xxxx.onrender.com/api/`
- **Frontend App:** `https://omnify-blog-frontend-xxxx.vercel.app/` or `.netlify.app/`

### Backend Deployment (Render)

1. **Create PostgreSQL DB** on Render. Copy its Internal Database URL.
2. **Create Web Service:**  
   - Root Directory: `backend`  
   - Build: `pip install -r requirements.txt && python manage.py collectstatic --noinput`  
   - Start: `gunicorn blogproject.wsgi:application`
3. **Set Environment Variables:**  
   - `SECRET_KEY`, `DEBUG=False`, `JWT_SECRET`, `ALLOWED_HOSTS`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS_LIST`
4. **Post-Deploy Command:** `python manage.py migrate`
5. **Deploy**

### Frontend Deployment (Vercel/Netlify)

1. **Import Project:** Set root to `frontend`
2. **Environment Variable:**  
   - `REACT_APP_API_BASE_URL` = your Render backend API URL
3. **Build:** `npm run build`  
   **Output:** `build`
4. **Deploy**

### Post-Deployment Configuration

- **Create Superuser** on Render (via shell): `python manage.py createsuperuser`
- **Update CORS**: Add your deployed frontend URL to `CORS_ALLOWED_ORIGINS_LIST` on Render and redeploy.
- **Test End-to-End**

---

## 7. Challenges & Solutions

- **API URL Errors:** Fixed wrong `.env` values and environment variable usage in frontend.
- **CORS Issues:** Used `django-cors-headers`, dynamically set allowed origins via env vars.
- **Frontend Error Handling:** Built error-parsing utilities for React to show user-friendly error messages from DRF.
- **JWT Invalidity:** Ensured matching `JWT_SECRET` across environments.
- **Database Driver Failures:** Added `psycopg2-binary` for PostgreSQL support in deployment.
- **Auth Mapping:** Ensured React login form mapped email to Django username field as expected by SimpleJWT.

---

## 8. Future Enhancements

- User profiles  
- Comments on blogs  
- Search and filter  
- Rich text editor  
- Password reset & email verification  
- Tags/categories  
- Automated tests  
- Image uploads  
- Further UI/UX polish

---

## 9. Contact

For questions or feedback, reach me via [GitHub/Manoj010104](https://github.com/Manoj010104)

---

## 10. License

This project is licensed under the MIT License.

---
