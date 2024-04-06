exports.index = function(req, res, next) {
    res.render('frontend/index', { title: 'Art school' });
};

exports.login = function(req, res, next) {
    res.render('frontend/auth/login', { title: 'Login' });
};

exports.register = function(req, res, next) {
    res.render('frontend/auth/register', { title: 'Register' });
};

exports.galerie = function(req, res, next) {
    res.render('frontend/galerie', { title: 'Galerie' });
};

exports.cursuri = function(req, res, next) {
    res.render('frontend/cursuri', { title: 'Cursuri' });
};

//Cursuri
exports.desenul = function(req, res, next) {
    res.render('frontend/cursuri/desenul', { title: 'Desenul' });
};

exports.pictura = function(req, res, next) {
    res.render('frontend/cursuri/pictura', { title: 'Pictura' });
};

exports.sculptura = function(req, res, next) {
    res.render('frontend/cursuri/sculptura', { title: 'Sculptura' });
};

exports.istoraArtelor = function(req, res, next) {
    res.render('frontend/cursuri/istoraArtelor', { title: 'Istora Artelor' });
};

exports.compozitiaDeSavalet = function(req, res, next) {
    res.render('frontend/cursuri/compozitiaDeSavalet', { title: 'Compozitia De Savalet' });
};

exports.compozitiaDecorativa = function(req, res, next) {
    res.render('frontend/cursuri/compozitiaDecorativa', { title: 'Compozitia Decorativa' });
};
  