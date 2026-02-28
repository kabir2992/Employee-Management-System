const express = require('express');
const router = express.Router();
const { signup, verifyOtp, login, verifyLoginOtp, googlelogin } = require('../controllers/authController');

router.post('/signup',signup);
router.post('/verify-otp',verifyOtp);
router.post('/login',login);
router.post('/verify-otp-login',verifyLoginOtp);
router.post('/googlelogin', googlelogin);

module.exports = router;