const router = require('express').Router();

const AuthController = require('../../app/auth/authController');

router.post('/signup', AuthController.register);

module.exports = router;