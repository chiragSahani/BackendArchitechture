# 🚀 Express.js MVP Backend 🚀

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT">
</p>

A complete and well-structured Express.js backend built with an **MVP (Model-View-Presenter)** architecture. It provides a self-contained solution for a standard full-stack application, featuring user authentication with JWT, CRUD operations for posts, and a SQLite database.

## 📝 Table of Contents

- [Architectural Overview](#-architectural-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)

## 🏛️ Architectural Overview

This project follows the **Model-View-Presenter (MVP)** pattern to separate concerns and improve maintainability.

```
+-------------------+      +--------------------+      +------------------+
|      Client       |----->|       Routes       |----->|    Presenters    |
| (e.g., Browser)   |      |   (server.js)      |      |  (Controllers)   |
+-------------------+      +--------------------+      +------------------+
                                                           |
                                                           v
+-------------------+      +--------------------+      +------------------+
|     Database      |<-----|       Models       |<-----|      Logic       |
|    (SQLite)       |      | (e.g., user.js)    |      |  (in Presenters) |
+-------------------+      +--------------------+      +------------------+
```

-   **Models**: Responsible for interacting with the database (`database/database.js`, `models/*.js`).
-   **Views (Routes/Presenters)**: The "View" in this backend context is the API endpoint itself. The `server.js` file defines the routes, and the `presenters/*.js` files handle the business logic (like controllers).
-   **Presenters**: Contain the application's business logic, acting as the bridge between the models and the routes.

## ✨ Features

-   **Express.js Server**: A robust and scalable server setup.
-   **MVP Architecture**: A clean and organized codebase.
-   **User Authentication**: Secure user registration and login with JWT and `bcryptjs`.
-   **CRUD Operations**: Full functionality for creating, reading, updating, and deleting posts.
-   **Protected Routes**: Middleware to secure sensitive endpoints.
-   **Database**: A simple and lightweight `sqlite3` database.
-   **Error Handling**: Centralized middleware for handling errors gracefully.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chiragSahani/BackendArchitechture.git
    cd BackendArchitechture
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Server

To start the server, run:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

## 📡 API Endpoints

### Authentication

| Method | Endpoint               | Description              | Access  |
| :----- | :--------------------- | :----------------------- | :------ |
| `POST` | `/api/auth/register`   | Register a new user      | Public  |
| `POST` | `/api/auth/login`      | Log in a user            | Public  |
| `GET`  | `/api/profile`         | Get user profile         | Private |

### Posts

| Method   | Endpoint           | Description              | Access  |
| :------- | :----------------- | :----------------------- | :------ |
| `POST`   | `/api/posts`       | Create a new post        | Private |
| `GET`    | `/api/posts`       | Get all posts            | Public  |
| `GET`    | `/api/posts/:id`   | Get a single post        | Public  |
| `PUT`    | `/api/posts/:id`   | Update a post            | Private |
| `DELETE` | `/api/posts/:id`   | Delete a post            | Private |
