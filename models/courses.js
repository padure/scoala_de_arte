const pool = require('../config/db');

async function getCourses() {
    const [rows] = await pool.query('SELECT * FROM courses');
    return rows;
}

module.exports = { getCourses };