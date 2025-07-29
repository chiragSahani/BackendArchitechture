const db = require('../database/database.js');

class Post {
    static createPost(userId, title, content, callback) {
        db.run('INSERT INTO posts (userId, title, content) VALUES (?,?,?)', [userId, title, content], function(err) {
            callback(err, { id: this.lastID });
        });
    }

    static findAll(callback) {
        db.all('SELECT * FROM posts', [], (err, rows) => {
            callback(err, rows);
        });
    }

    static findById(id, callback) {
        db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    static updatePost(id, title, content, callback) {
        db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
            callback(err, { changes: this.changes });
        });
    }

    static deletePost(id, callback) {
        db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
            callback(err, { changes: this.changes });
        });
    }
}

module.exports = Post;
