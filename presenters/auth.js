const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

exports.register = (req, res, next) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
        if (err) return next(err);
        if (user) return res.status(400).json({ message: 'Username already exists' });

        User.createUser(username, password, (err, newUser) => {
            if (err) return next(err);
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
};

exports.getProfile = (req, res, next) => {
    User.findById(req.user.userId, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ id: user.id, username: user.username });
    });
};
