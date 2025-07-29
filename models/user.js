const db = require('../database/database.js');
const bcrypt = require('bcryptjs');

class User {
    static createUser(username, password, callback) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        db.run('INSERT INTO users (username, password) VALUES (?,?)', [username, hashedPassword], function(err) {
            callback(err, { id: this.lastID });
        });
    }

    static findByUsername(username, callback) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            callback(err, row);
        });
    }

    static findById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }
}

module.exports = User;
