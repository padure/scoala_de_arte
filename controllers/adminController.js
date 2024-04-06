const courseModel = require('../models/course');

exports.index = function (req, res) {
    const user = req.session.user;
    res.render('admin/index', { title: 'Cursuri', user: user });
};

exports.courses = async function (req, res) {
    try {
        const courses = await courseModel.getCourses();
        const user = req.session.user;
        res.render('admin/curses/index', { title: 'Cursuri', courses, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching courses');
    }
};

