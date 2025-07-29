const Post = require('../models/post.js');

exports.createPost = (req, res, next) => {
    const { title, content } = req.body;
    Post.createPost(req.user.userId, title, content, (err, newPost) => {
        if (err) return next(err);
        res.status(201).json(newPost);
    });
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll((err, posts) => {
        if (err) return next(err);
        res.json(posts);
    });
};

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    });
};

exports.updatePost = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.userId !== req.user.userId) return res.status(403).json({ message: 'User not authorized' });

        const { title, content } = req.body;
        Post.updatePost(req.params.id, title || post.title, content || post.content, (err, result) => {
            if (err) return next(err);
            res.json({ message: 'Post updated' });
        });
    });
};

exports.deletePost = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.userId !== req.user.userId) return res.status(403).json({ message: 'User not authorized' });

        Post.deletePost(req.params.id, (err, result) => {
            if (err) return next(err);
            res.status(204).send();
        });
    });
};
