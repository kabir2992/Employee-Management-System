const Users = require('../models/Users');

exports.getProfile = async (req, res) => {
    try{
        const user = await Users.findById(req.user.id).select("-password");
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error)
    {
        return res.status(500).json({
            success: false,
            message: "Cannot get Your Profile/ Server Error",
            error: error.message
        });
    }
};

exports.getAllUser = async (req, res) => {
    try{
        const users = await Users.find().select("-password");
        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error)
    {
        return res.status(500).json({
            success: true,
            message: "Cannot get all Usres/ Server Error",
            error: error.message
        });
    }
};