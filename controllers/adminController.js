const coursesModel = require('../models/courses');

exports.index = function (req, res) {
    res.render('admin/index', { title: 'Cursuri' });
};

exports.courses = async function (req, res) {
    try {
        const courses = await coursesModel.getCourses();
        res.render('admin/curses/index', { title: 'Cursuri', courses });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching courses');
    }
};

