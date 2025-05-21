# Collaborative Workflow Management System - Backend

This is the backend API for a Collaborative Workflow Management System, built with **Node.js** and **Express.js**.  
It provides user authentication, profile management, and project management features.

---

## 🚀 Features

- **User Authentication** (JWT, cookies)
- **Profile Management** (view user profile)
- **Project Management** (create projects)
- **Role-Based Access Control** (admin/user)
- **Secure Password Hashing** (bcrypt)
- **Input Validation** (validator)
- **Cookie Parsing** (cookie-parser)

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens)
- **bcrypt**
- **cookie-parser**
- **dotenv**
- **validator**

---

## 📁 Project Structure

```
src/
├── app.js                # Main application entry point
├── config/
│   └── database.js       # MongoDB connection
├── middlewares/
│   └── auth.js           # Auth & admin middleware
├── models/
│   ├── project.js        # Project schema
│   ├── task.js           # Task schema
│   └── user.js           # User schema
├── routes/
│   ├── auth.js           # Register/login routes
│   ├── profile.js        # Profile routes
│   └── project.js        # Project routes
└── utils/
    └── validation.js     # Data validation functions
```

---

## ⚡ Setup Instructions

### 1. Prerequisites

- Node.js (LTS recommended)
- npm or Yarn
- MongoDB (local or Atlas)

### 2. Clone the Repository

```sh
git clone <repository_url>
cd Collaborative-Workflow-Management-System
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/workflow_db
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_HERE
```

### 5. Start the Server

```sh
npm start
```

The server will run at [http://localhost:3000](http://localhost:3000).

---

## 📚 API Endpoints

### Authentication

- **POST `/addUser`** — Register a new user
- **POST `/login`** — Login and receive JWT cookie

### Profile

- **GET `/profile/view`** — View authenticated user's profile (JWT cookie required)

### Projects

- **POST `/addProject`** — Create a new project

---

## 🧪 Testing with Postman

1. Register a user with `/addUser`
2. Login with `/login` (cookie will be set)
3. Access `/profile/view` or `/addProject` with the JWT cookie

---
