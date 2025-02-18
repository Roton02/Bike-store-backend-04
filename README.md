# Blog Project Backend

## Overview
A backend for a blogging platform with secure authentication, role-based access control, and public APIs for managing blogs. The system supports two user roles: Admin and User.

## Technologies
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)

---

## Features

### User Roles
1. **Admin**:
   - Manage users: Block/unblock users.
   - Delete any blog.
   - Cannot update blogs.
2. **User**:
   - Register and log in.
   - CRUD operations on their own blogs.
   - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**: JWT-based login for secure access.
- **Authorization**: Role-based access control for Admin and User actions.

### Blog API
- **Public API**: 
  - Search, sort, and filter blogs.
  - Includes blog title, content, and author details.

---

## Models

### User Model
```typescript
{
  name: string;
  email: string;
  password: string;
  role: "admin" | "user"; // Default: "user"
  isBlocked: boolean; // Default: false
  createdAt: Date;
  updatedAt: Date;
}
