const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {type: String},
    fname: {type: String, required: true, trim: true},
    lname: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ["Admin","Employer","User"],
        default: "User"
    },
    isVerified: {type: Boolean, default: false}

},
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);