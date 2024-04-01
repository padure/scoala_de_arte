const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET index page. */
router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/register', indexController.register);

module.exports = router;
