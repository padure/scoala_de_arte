const db = require('../config/db');

const create = async (courseDetails) => {
    try {
        const { fullName, username, email, phoneNumber, studyLevel, courses } = courseDetails;
        
        // Inserăm cursul în baza de date
        const query = 'INSERT INTO courses (fullName, username, email, phoneNumber, studyLevel, courses) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [fullName, username, email, phoneNumber, studyLevel, JSON.stringify(courses)]);

        return result.insertId;
    } catch (error) {
        throw error;
    }
};

const getCourses = async () => {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
}

module.exports = {
    create: create,
    getCourses: getCourses
};