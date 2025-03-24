# Task Management API

A RESTful API for task management built with Express.js, TypeScript, and MongoDB following the MVC pattern.

## 📝 Overview

This API provides endpoints for user authentication and task management. It allows users to register, login, and perform CRUD operations on tasks. The application is secured with JWT-based authentication.

## 🚀 Live Demo

The API is hosted on Render and can be accessed at:
[https://backend-cavedigital.onrender.com](https://backend-cavedigital.onrender.com)

## 📋 API Documentation

A Postman collection containing all API endpoints and examples is available at:
[Postman Documentation](https://www.postman.com/webnox/workspace/cave-digital/request/36596229-25d200e3-bb93-4413-82fd-3a8a1a47aecd?action=share&creator=36596229&ctx=documentation)

## 🔧 Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **Middleware**: CORS, Express JSON parser

## 📁 Project Structure

The project follows the MVC (Model-View-Controller) architectural pattern:

```
src/
├── controllers/    # Request handlers
├── models/         # Database schemas
├── routes/         # API endpoint definitions
├── middleware/     # Custom middleware (auth, validation)
├── services/       # Business logic
├── utils/          # Helper functions
├── config/         # Configuration files
└── index.ts        # Application entry point
```

## 🔑 API Endpoints

### Authentication

| Method | Endpoint       | Description                             | Access  |
|--------|----------------|-----------------------------------------|---------|
| POST   | /auth/signup   | Register a new user                     | Public  |
| POST   | /auth/login    | Authenticate and receive JWT token      | Public  |

### Task Management

| Method | Endpoint     | Description                         | Access      |
|--------|-------------|-------------------------------------|-------------|
| POST   | /tasks      | Create a new task                   | Protected   |
| GET    | /tasks      | Get all tasks for the logged-in user| Protected   |
| PUT    | /tasks/:id  | Update a task                       | Protected   |
| DELETE | /tasks/:id  | Delete a task                       | Protected   |

## 🛠️ Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm 
- MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

4. Build the TypeScript project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## 📝 Usage Examples

### Register a new user

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create a new task

```http
POST /tasks
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "title": "Complete project",
  "description": "Finish the task management API
}
```


## 🔄 Available Scripts

- `npm install` - Install dependencies
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading


## 📄 License

[MIT](LICENSE)
