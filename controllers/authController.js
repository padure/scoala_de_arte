const hash = require('pbkdf2-password')();

const users = {
    tj: { name: 'tj' }
};

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users.tj.salt = salt;
    users.tj.hash = hash;
});

const authenticate = (name, pass, fn) => {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(null, null)
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user)
        fn(null, null)
    });
}
//Authenticate
exports.login = function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return next(err)
        if (user) {
            req.session.regenerate(() => {
                req.session.user = user;
                res.status(200).json({ user: user });
            });
        } else {
            res.status(404).redirect('/login');
        }
    });
}
//Logout
exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};