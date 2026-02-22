function generateOtp()
{
    return Math.floor(100000 + Math.random() * 900000).toString(); // For 6 digit OTP, floor() will remove all the decimal point numbers
}
module.exports = generateOtp;