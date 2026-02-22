const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get("/admin-data", authMiddleware, roleMiddleware("Admin"),
(req, res) => {
    res.json({
        message: "Admin Secret Data",
        user: req.user
    });
});

router.get("/employer-data", authMiddleware, roleMiddleware("Employer"), (req, res) => {
    res.json({
        message: "Employer Secret Data",
        user: req.user
    });
});

router.get("/user-data", authMiddleware, roleMiddleware("User"), (req, res) => {
    res.json({
        message: "User Secret Data",
        user: req.user
    });
});

module.exports = router;