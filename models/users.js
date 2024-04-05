const db = require('../config/db');
const hash = require('pbkdf2-password')();

// Funcția de căutare a utilizatorului după nume de utilizator
const findByUsername = async (username, callback) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM users WHERE email = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            callback(null, user);
        } else {
            callback(null, null);
        }
    } catch (error) {
        callback(error, null);
    }
};

const findByEmail = async (email) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            const user = rows[0];
            return user;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

// Funcția de creare a unui nou utilizator
// Funcția de creare a unui nou utilizator cu hash pentru parolă
const create = async (userDetails) => {
    try {
        const { name, email, password } = userDetails;

        // Generăm un salt aleatoriu
        const salt = await new Promise((resolve, reject) => {
            hash({ password: password }, (err, pass, salt, hash) => {
                if (err) reject(err);
                resolve(salt);
            });
        });
        // Generăm hash-ul pentru parolă folosind salt-ul generat
        const hashedPassword = await new Promise((resolve, reject) => {
            hash({ password: password, salt: salt }, (err, pass, salt, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
        // Inserăm utilizatorul în baza de date folosind parola hash și salt-ul
        const query = 'INSERT INTO users (nume, email, parola, salt) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [name, email, hashedPassword, salt]);

        return result.insertId;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findByUsername: findByUsername,
    findByEmail: findByEmail,
    create: create
};
