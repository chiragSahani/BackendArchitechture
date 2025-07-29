# Express.js MVP Backend

This is a complete and well-structured Express.js backend built with an MVP (Model-View-Presenter) architecture. It provides a self-contained solution for a standard full-stack application, featuring user authentication with JWT, CRUD operations for posts, and a SQLite database. This project is intended to be a foundational template for more complex applications.

## Features

-   **Express.js Server**: A robust server setup.
-   **MVP Architecture**: Code is organized into Models, Views (Controllers/Presenters), and a separate database module.
-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT) and password hashing with `bcryptjs`.
-   **CRUD Operations**: Full Create, Read, Update, and Delete functionality for a "Posts" resource.
-   **Protected Routes**: Middleware to protect specific routes, ensuring only authenticated users can access them.
-   **Database**: Uses `sqlite3` for a simple, file-based database.
-   **Error Handling**: Centralized error-handling middleware.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later recommended)
-   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/chiragSahani/BackendArchitechture.git
    cd BackendArchitechture
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Server

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register a new user.
    -   **Body**: `{ "username": "testuser", "password": "password123" }`
-   `POST /api/auth/login` - Log in a user and get a JWT.
    -   **Body**: `{ "username": "testuser", "password": "password123" }`
-   `GET /api/profile` - Get the profile of the authenticated user.
    -   **Headers**: `{ "Authorization": "Bearer <your_jwt>" }`

### Posts

-   `POST /api/posts` - Create a new post.
    -   **Headers**: `{ "Authorization": "Bearer <your_jwt>" }`
    -   **Body**: `{ "title": "My First Post", "content": "Hello, world!" }`
-   `GET /api/posts` - Get all posts.
-   `GET /api/posts/:id` - Get a single post by its ID.
-   `PUT /api/posts/:id` - Update a post.
    -   **Headers**: `{ "Authorization": "Bearer <your_jwt>" }`
    -   **Body**: `{ "title": "Updated Title", "content": "Updated content." }`
-   `DELETE /api/posts/:id` - Delete a post.
    -   **Headers**: `{ "Authorization": "Bearer <your_jwt>" }`
