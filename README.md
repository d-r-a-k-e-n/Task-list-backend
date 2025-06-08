# Task List Backend API

## Overview 🚀

This is the backend API for the **Task List** web application. It handles all data persistence and business logic related to tasks, providing a robust and secure way to manage task data for the frontend client.

---

## Features ✨

- **RESTful API Endpoints**: Provides a clear and consistent API for managing tasks.
- **Task Management**:
  - **CRUD Operations**: Create, Read (all/single), Update, and Delete tasks.
  - Support for marking tasks as completed.
- **Database Integration**: Stores task data persistently in a MongoDB database.
- **Environment Variable Configuration**: Securely manages sensitive data like database credentials.

---

## Technologies Used 🛠️

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js, used for building the API.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for scalable and reliable data storage.
- **dotenv**: For loading environment variables from a `.env` file.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing, allowing frontend applications to access the API.

---

## Getting Started ⚙️

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- A MongoDB Atlas account (or a local MongoDB instance if preferred).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/d-r-a-k-e-n/Task-list-backend.git
    ```
2.  Navigate to the **backend** project directory:
    ```bash
    cd Task-list-backend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Settings 📄

1.  Create an `.env` file at the root of your **backend** project directory (for example, `Task-list-backend/.env`).
2.  Add your MongoDB Atlas link to this file:

```dotenv
MONGODB_URI=your_mongodb_atlas_link
```

**Important**: Replace `your_mongodb_atlas_link` with your actual database link.

### Running the API 🏃

1.  Start the development server:
    ```bash
    npm start
    ```
2.  The API will be running on `http://localhost:3001` by default.

---

## API Endpoints 🌐

The API provides the following endpoints:

- **`GET /tasks/:userId`**: Get all tasks for a specific user.
- **`POST /tasks/:userId`**: Create a new task for a specific user.
  - **Request Body**: `{ "title": "New Task Title" }`
- **`PUT /tasks/:taskId`**: Update an existing task.
  - **Request Body**: `{ "title": "Updated Title", "completed": true }` (or any combination)
- **`DELETE /tasks/:taskId`**: Delete a task.

---
