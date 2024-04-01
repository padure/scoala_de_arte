exports.index = function(req, res, next) {
    res.render('frontend/index', { title: 'Art school' });
};

exports.login = function(req, res, next) {
    res.render('frontend/auth/login', { title: 'Login' });
};

exports.register = function(req, res, next) {
    res.render('frontend/auth/register', { title: 'Register' });
};
  