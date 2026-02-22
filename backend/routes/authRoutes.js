const express = require('express');
const router = express.Router();
const { signup, verifyOtp, login, verifyLoginOtp } = require('../controllers/authController');

router.post('/signup',signup);
router.post('/verify-otp',verifyOtp);
router.post('/login',login);
router.post('/verify-otp-login',verifyLoginOtp);

module.exports = router;