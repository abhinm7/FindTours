

```md
# 🌍 FindTrips — Tours Management App

A Full-Stack Application built using **Next.js 16**, **Node.js**, **MongoDB**, and **Cloudinary**.  
FindTrips allows users to browse available tours and view details, while authenticated admins can **create**, **edit**, and **delete** tours from the admin dashboard.

---

## 🚀 Live Links

| Service | URL |
|--------|------|
| 🖥️ Frontend (Next.js) | https://YOUR-VERCEL-URL |
| 🔌 Backend API (Node.js) | https://YOUR-BACKEND-DEPLOYED-URL |

> Replace these with your actual deployed URLs.

---

## 📦 Tech Stack

### **Frontend (FindTrips Web App)**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS + ShadCN UI
- React Hook Form + Zod (Form validation)
- Axios (API calls)
- Client-side admin auth (JWT stored in localStorage)
- Cloudinary for optimized images

### **Backend (FindTrips API Server)**
- Node.js + Express
- MongoDB Atlas (Mongoose ORM)
- Multer (file upload handling)
- Cloudinary (image hosting)
- JWT-based authentication
- dotenv + CORS

---

## 📁 Project Structure

```

findtrips/
│
├── backend/      # Node.js + Express API
└── frontend/     # Next.js 16 Web App

````

---

# 🔧 Backend Setup (FindTrips API)

### **Prerequisites**
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

---

## 1️⃣ Install Dependencies
```bash
cd backend
npm install
````

---

## 2️⃣ Setup Environment Variables

Create a `.env` file inside `/backend`:

```env
PORT=4000
MONGO_URI=your_mongodb_uri

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 3️⃣ Run the Backend

```bash
npm run dev
```

Your server should now run at:

```
http://localhost:4000
```

---

# 🔌 Backend API Routes

### **Public Routes**

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tours`     | Get all tours     |
| GET    | `/api/tours/:id` | Get a single tour |

---

### **Admin Auth**

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/api/auth/login` | Admin login → returns JWT |

---

### **Admin CRUD (Protected with JWT)**

Requires header: `Authorization: Bearer <token>`

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| POST   | `/api/admin/tours`     | Create tour *(multipart/form-data)* |
| PUT    | `/api/admin/tours/:id` | Update tour *(multipart/form-data)* |
| DELETE | `/api/admin/tours/:id` | Delete tour                         |

---

# 🎨 Frontend Setup (FindTrips Web App)

## 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

---

## 2️⃣ Add Environment Variables

Create `.env.local` inside `/frontend`:

```env
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL
```

Example:

```env
NEXT_PUBLIC_API_URL=https://findtrips-backend.onrender.com
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🔐 Admin Login (Frontend)

Navigate to:

```
/admin/login
```

Use credentials from your backend `.env`:

```
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

### After successful login:

* JWT is stored in `localStorage`
* Admin can:
  ✔ Create Tours
  ✔ Edit Tours
  ✔ Delete Tours
  ✔ Access Dashboard

Protected pages automatically redirect if not logged in.

---

# 🖼 Features

### 🎯 User Features

* Browse all tours
* View tour details
* Responsive UI (mobile-friendly)
* Optimized Cloudinary images

### 🛠 Admin Features

* Secure Login (JWT)
* Create/Edit/Delete tours
* Upload tour images
* Admin dashboard table with actions
* Loading states & toast notifications
* Zod-powered validation

---

# 🚀 Deployment

### **Frontend → Vercel**

* Fast builds with Turbopack
* Automatic routing support
* Environment variables setup

### **Backend → Render / Railway / Fly.io**

Supports:

* Auto-redeploy on Git push
* Environment variables
* Node.js hosting

> Make sure backend CORS allows your Vercel domain.

---
A clean and fast end-to-end tours management system.
Just tell me!
```
