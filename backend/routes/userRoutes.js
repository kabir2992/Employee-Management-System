const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getAllUser, getProfile} = require("../controllers/userController");

router.get("/all-users", authMiddleware, roleMiddleware("Admin", "Employer"), getAllUser,
(req, res) => {
    res.json({
        success: true,
        message: "Only Admin and Employer can see all the Employees"
    });
});

router.get("/my-profile", authMiddleware, roleMiddleware("User","Admin","Employer"), getProfile,
(req, res) => {
    res.json({
        success: true,
        message: "Logged-in User Profile"
    });
});

module.exports = router;