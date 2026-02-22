const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "You accessed Protected Route",
        user: req.user
    });
});

module.exports = router;