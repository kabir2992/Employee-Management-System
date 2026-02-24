const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/users", async (req, res) => {
    try {
        if (req.user.role !== "Admin")
        {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const { role, page = 1, limit = 10, search = ""} = req.query;
        const query = {};

        if (role)
        {
            query.role = role;
        }

        if (search)
        {
            query.$or = [
                { name: { $regex: search, $options: "i"}},
                { email: { $regex: search, $options: "i"}}
            ];
        }

        const skip = (page - 1) * limit;

        const users = await Users.find(query)
        .select("-password")
        .skip(skip)
        .limit(Number(limit))
        .sort({createdAt: -1});

        const total = await Users.countDocuments(query);

        res.json({
            success: true,
            users,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error)
    {
        return res.json({
            success: false,
            message: "Server Error"
        });
    }
});

router.get("/users/:id", async (req, res) => {
    try{
        if (req.user.role !== "Admin")
        {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const user = await Users.findByID(req.params.id).select("-password");

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: "No USer Found"
            });
        }
        
        res.json(user);
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: "Server Error"
        });
    }
});

router.put("/users:id", async (req, res) => {
    try{
        if (req.user.role !== "Admin")
        {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const {fname, lname, email, role} = req.body;
        const updateUser = await Users.findByIDAndUpdate(
            req.params.id,
            { fname, lname, email, role},
            { new: true }
        ).select("-password");

        if (!updateUser)
        {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.json({
            success: true,
            message: "User Updated!!",
            user: updateUser
        });
    }
    catch (error)
    {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

router.delete("/users/:id", async (req, res) => {
    try{
        if (req.user.id !== "Admin")
        {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const deleteUser = await Users.findByIdAndDelete(req.params.id);

        if (!deleteUser)
        {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.json({
            success: true,
            message: `User ${req.user.fname} Deleted `
        });
    }
    catch (error)
    {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

module.exports = router;