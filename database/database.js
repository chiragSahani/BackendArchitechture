const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            password text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            title text,
            content text,
            FOREIGN KEY (userId) REFERENCES users (id)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
    }
});


module.exports = db
