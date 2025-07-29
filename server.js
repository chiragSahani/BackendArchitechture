const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./database/database.js');

const authPresenter = require('./presenters/auth.js');
const postsPresenter = require('./presenters/posts.js');

const app = express();

app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Auth routes
app.post('/api/auth/register', authPresenter.register);
app.post('/api/auth/login', authPresenter.login);
app.get('/api/profile', authMiddleware, authPresenter.getProfile);

// Post routes
app.post('/api/posts', authMiddleware, postsPresenter.createPost);
app.get('/api/posts', postsPresenter.getAllPosts);
app.get('/api/posts/:id', posts.getPostById);
app.put('/api/posts/:id', authMiddleware, postsPresenter.updatePost);
app.delete('/api/posts/:id', authMiddleware, postsPresenter.deletePost);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
