/*
// package.json
{
  "name": "express-backend",
  "version": "1.0.0",
  "description": "A complete Express.js backend in a single file.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1"
  }
}
*/

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- Create the Express App ---
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- In-Memory Database ---
// In a real application, you would use a database like MongoDB or PostgreSQL.
const users = [];
const posts = [];

// --- Models ---
// These classes are simple representations of our data structures.

/**
 * Represents a user.
 * @class
 */
class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password; // This will be the hashed password
  }
}

/**
 * Represents a post.
 * @class
 */
class Post {
  constructor(id, userId, title, content) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
  }
}

// --- Authentication Middleware ---
/**
 * Verifies the JWT from the Authorization header.
 * If valid, it attaches the user's ID to the request object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const authMiddleware = (req, res, next) => {
  // Get token from the 'Authorization' header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use a strong, secret key in a real app
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- Authentication Routes ---

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Check if user already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and "save" the new user
    const newUser = new User(Date.now(), username, hashedPassword);
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// --- Protected Profile Route ---

/**
 * @route   GET /api/profile
 * @desc    Get the profile of the currently authenticated user
 * @access  Private
 */
app.get('/api/profile', authMiddleware, (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
        // This case should ideally not happen if the token is valid
        return res.status(404).json({ message: 'User not found' });
    }
    // Return user data without the password
    res.json({ id: user.id, username: user.username });
});


// --- CRUD Routes for Posts ---

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
app.post('/api/posts', authMiddleware, (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }
    const newPost = new Post(Date.now(), req.user.userId, title, content);
    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Public
 */
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

/**
 * @route   GET /api/posts/:id
 * @desc    Get a single post by ID
 * @access  Public
 */
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post
 * @access  Private
 */
app.put('/api/posts/:id', authMiddleware, (req, res, next) => {
  try {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user owns the post
    if (post.userId !== req.user.userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Update the post with new data
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    res.json(post);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post
 * @access  Private
 */
app.delete('/api/posts/:id', authMiddleware, (req, res, next) => {
  try {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user owns the post
    if (posts[postIndex].userId !== req.user.userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Remove the post from the array
    posts.splice(postIndex, 1);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
});


// --- Error Handling Middleware ---
// This should be the last piece of middleware added.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
