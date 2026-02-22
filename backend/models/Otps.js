const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {type: String, required: true}, // Not storing as Number because we ain't using it for Calculation purpose
    otp: {type: String, required: true, length: 6},
    expiredAt: {type: Date, required: true},
    // Temporary Stroing Data for Verifying OTP
    fname: String,
    lname: String,
    password: String,
    role: String
},
    {timestamps: true}
);

module.exports = mongoose.model('Otp', otpSchema);