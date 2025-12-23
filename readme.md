# Jotter System Backend

A fully-featured **file and folder management backend system** built with **Node.js, Express, MongoDB, TypeScript**, and **JWT authentication**. This system includes authentication, user management, file & folder CRUD operations, file operations (copy, duplicate, rename, share, favorite), and calendar-based file/folder retrieval.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

---

## **Features**

### **Authentication & Authorization**
- User registration & login
- JWT-based access and refresh token authentication
- Forgot password & OTP verification
- Reset password
- Google OAuth login

### **User Management**
- Create, read, update, delete users
- Get logged-in user info (`getMe`)
- Update logged-in user profile (`updateMyProfile`)

### **File & Folder Management**
- File CRUD (create virtual file, upload file, update content, export)
- Folder CRUD
- Copy, duplicate, rename, and share files
- Mark files as favorite / remove from favorites
- Retrieve files/folders by type: PDF, image, video, Word, Excel
- Get 5 most recent files and folders
- Calendar integration: get files/folders created on a specific date

### **Additional Features**
- File size & storage limit handling
- Cookie-based authentication for sessions
- Supports both uploaded and virtual files
- File operations respect user ownership

---

## **Tech Stack**
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Passport.js (Google OAuth)
- **Storage:** Cloud storage for uploaded files (Cloudinary/S3)
- **Validation:** Zod for request validation
- **Email:** Nodemailer for OTP and password reset
- **Deployment:** Vercel / any Node.js hosting