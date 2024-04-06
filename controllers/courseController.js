const courseModel = require('../models/course');

// Funcția de register
exports.formular = async function (req, res, next) {
    try {
        const newCourse = await courseModel.create(req.body);
        console.log(newCourse);
        return res.json({ message: 'Înregistrare cu succes.' });
    } catch (error) {
        console.error('Eroare în timpul înregistrării utilizatorului:', error);
        return res.status(500).json({ message: 'A apărut o eroare în timpul înregistrării la curs.' });
    }
};
