🌍 FindTrips — Tours Management App

A Full-Stack Application with Next.js 16 + Node.js + MongoDB + Cloudinary. This project is a complete tours listing and admin dashboard system where an authenticated admin can create, read, update, and delete tours, and users can browse and view tour details.

🚀 Live Links

Service

URL

🖥️ Frontend (Next.js)

https://YOUR-VERCEL-URL

🔌 Backend API (Node.js)

https://YOUR-BACKEND-DEPLOYED-URL

(Replace these with your deployed URLs.)

📦 Tech Stack

Frontend (FindTrips Web App)

Next.js 16 (App Router)

React 19

Tailwind CSS

ShadCN UI

React Hook Form + Zod (for form validation)

Axios (for data fetching)

Cloudinary (for image display)

JWT client-side auth (using localStorage)

Backend (FindTrips API Server)

Node.js

Express

MongoDB Atlas (Mongoose ORM)

Cloudinary (for image uploads)

Multer (for file handling)

JSON Web Tokens (JWT) (for auth)

CORS

dotenv

📁 Project Structure

findtrips/
│
├── backend/        # Node.js + Express API
└── frontend/       # Next.js 16 web app


🔧 Backend Setup (FindTrips API)

Prerequisites

Node.js 18+

MongoDB Atlas account (or local MongoDB)

Cloudinary account

1️⃣ Install Dependencies

cd backend
npm install


2️⃣ Add Environment Variables

Create a .env file inside the /backend directory.

Required values:

PORT=4000
MONGO_URI=your_mongodb_uri
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


3️⃣ Run the Backend Server

npm run dev


The server will run at http://localhost:4000 and confirm connection to MongoDB and Cloudinary.

🔌 Backend API Routes

Public Routes

Method

Endpoint

Description

GET

/api/tours

Get all tours

GET

/api/tours/:id

Get tour by ID

Admin Auth

Method

Endpoint

Description

POST

/api/auth/login

Login using email + password → returns JWT

Admin CRUD (Protected with JWT)

Requires an Authorization: Bearer <token> header.

Method

Endpoint

Description

POST

/api/admin/tours

Create a new tour (multipart/form-data)

PUT

/api/admin/tours/:id

Edit a tour (multipart/form-data)

DELETE

/api/admin/tours/:id

Delete a tour

🎨 Frontend Setup (FindTrips Web App)

1️⃣ Install Dependencies

cd frontend
npm install


2️⃣ Add Environment Variable

Create a .env.local file in the /frontend directory:

NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL


Example: NEXT_PUBLIC_API_URL=https://findtrips-backend.onrender.com

3️⃣ Run Development Server

npm run dev


The frontend will run at http://localhost:3000.

🔐 Admin Login (Frontend)

Go to http://localhost:3000/admin/login.

Use the credentials you set in the backend/.env file (ADMIN_EMAIL and ADMIN_PASSWORD).

After login, a JWT is stored in localStorage, and the admin can:

✔ Create, Edit, and Delete Tours

✔ Access the Admin Dashboard

Protected admin routes will automatically redirect to the login page if not authenticated.

🖼 Features

🎯 User Features

View all tours in a responsive grid.

View a single tour detail page.

Mobile-friendly design.

Optimized images served from Cloudinary.

🛠 Admin Features

Authentication: Secure admin login with JWT.

CRUD: Create, Update, and Delete tours.

Image Uploads: Direct upload to Cloudinary via the backend.

Dashboard: A table view of all tours with edit/delete actions.

UX: Loading states and toast notifications (via Sonner) for all actions.

Validation: Type-safe forms with Zod validation.

🚀 Deployment

Frontend (Vercel)

The frontend is designed for and deployed on Vercel, which handles the Next.js App Router build process automatically.

Backend (Render, Railway, etc.)

The backend API can be deployed on any service that supports Node.js, such as:

Render

Railway

Fly.io

Note: Ensure you configure CORS on your backend server to allow requests from your Vercel frontend domain.
