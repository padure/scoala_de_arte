const db = require('../config/db');

async function getUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

module.exports = { getUsers };