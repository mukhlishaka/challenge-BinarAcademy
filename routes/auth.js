const router = require("express").Router()
const auth = require('./../controllers/authController');

// register
router.get('/register', auth.registerPage);
router.post('/register', auth.register);

// login
router.get('/login', auth.loginPage);
router.post('/login', auth.login);

//logout
router.get('/logout', auth.logout);

router.post('/api/login', auth.apiLogin);

module.exports = router;
