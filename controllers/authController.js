const hash = require('pbkdf2-password')();
const userModel = require('../models/users');

// Funcția de autentificare
// Funcția de autentificare
const authenticate = (username, password, fn) => {
    
    if (!module.parent) console.log('Autentificare %s:%s', username, password);

    // Caută utilizatorul în baza de date
    userModel.findByUsername(username, async function (err, user) {
        if (err) return fn(err);
        if (!user) return fn(null, null);

        console.log('Utilizator găsit:', user);

        try {
            // Hash-ui parola introdusă de utilizator folosind salt-ul stocat în baza de date
            const hashedPassword = await new Promise((resolve, reject) => {
                hash({ password: password, salt: user.salt }, (err, pass, salt, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                });
            });

            console.log('Hash-ul generat:', hashedPassword);
            console.log('Hash-ul din baza de date:', user.parola);

            // Verifică dacă hash-ul parolei coincide cu cel din baza de date
            if (hashedPassword === user.parola) {
                return fn(null, user);
            } else {
                return fn(null, null);
            }
        } catch (error) {
            return fn(error);
        }
    });
};


// Funcția de login
exports.login = function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        
        if (err) return next(err);
        if (user) {
            req.session.regenerate(() => {
                req.session.user = user;
                res.redirect('/admin');
            });
        } else {
            res.status(404).redirect('/login');
        }
    });
};

// Funcția de register
// Funcția de register
exports.register = async function (req, res, next) {
    const { name, email, password } = req.body;

    try {
        // Verificăm dacă există deja un utilizator cu adresa de email dată
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Adresa de email este deja folosită.' });
        }

        // Creăm un nou utilizator în baza de date
        const newUser = await userModel.create({ name, email, password });

        // Redirectăm utilizatorul către pagina de login
        return res.redirect('/login');
    } catch (error) {
        // Afișăm eroarea în consolă pentru a o diagnostica
        console.error('Eroare în timpul înregistrării utilizatorului:', error);

        // Returnăm un mesaj de eroare către client
        return res.status(500).json({ message: 'A apărut o eroare în timpul înregistrării utilizatorului.' });
    }
};

// Funcția de logout
exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};
