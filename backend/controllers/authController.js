const Otp = require('../models/Otps');
const generateOtp = require('../utils/generateOtp');
const transpoter = require('../config/email');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  try {
    const { fname, lname, email, password, role } = req.body;

    if (!fname || !lname || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registered"
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const otp = generateOtp();

    await Otp.create({
      email,
      otp,
      expiredAt: new Date(Date.now() + 5 * 60 * 1000),
      fname,
      lname,
      password: hashPass,
      role
    });

    await transpoter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Signing In",
      text: `Your OTP is ${otp}. Valid for only 5 minutes`
    });

    return res.json({
      success: true,
      message: `OTP Sent Successfully!!. OTP:- ${otp}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup/OTP Failed",
      error: error.message
    });
  }
};

exports.verifyOtp = async(req, res) => {
    try{
        const {email, otp} = req.body;
        if(!email || !otp)
        {
            return res.status(400).json({
                success: false,
                message: "OTP/Email is Empty"
            });
        }

        const otpRecord = await Otp.findOne({email, otp}).sort({ createdAt: -1});

        if(!otpRecord)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid Email/OTP"
            });
        }

        if(otpRecord.expiredAt < new Date())
        {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        let prefix = "USR";
        if(otpRecord.role === "Employer") prefix = "EMP";
        if(otpRecord.role === "Admin") prefix = "ADM";

        /*console.log("ROLE FROM OTP RECORD:", otpRecord.role);
        console.log("VERIFY FUNCTION OTP RUNNING NEW CODE"); */

        const count = await User.countDocuments({ role : otpRecord.role});
        const userID = `${prefix}${String(count + 1).padStart(4, "0")}`;

        const user = await User.create({
            userID,
            fname: otpRecord.fname,
            lname: otpRecord.lname,
            email: otpRecord.email,
            password: otpRecord.password,
            role: otpRecord.role,
            isVerified: true,
        });

        await Otp.deleteOne({ _id: otpRecord._id });        

        const token = jwt.sign(
          {id: user._id, role: user.role, fname: user.fname},
          process.env.JWT_SECRET,
          {expiresIn: process.env.JWT_EXPIRES}
        );

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed Verifying OTP",
            error: error.message
        });
    }
};

exports.googlelogin = async(req, res) => {
    try{
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const email = payload.email;

    const user = await User.findOne({ email });
    // console.log("User from DB", email);
    if (!user)
    {
      return res.status(400).json({
        success: false,
        message: "User Not Found!!"
      });
    }

    if (!user.isVerified)
    {
      return res.status(400).json({
        success: false,
        message: "User is not Verified"
      });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    // {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password Not Matching!!",
    //     password: password,
    //     email: email
    //   });
    // }
    
    const otp = generateOtp();

    await Otp.create({
      email,
      otp,
      expiredAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await transpoter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Login",
      text: `Your OTP is ${otp}. Valid for only 5 minutes`
    });

    return res.json({
      success: true,
      message: `OTP Sent Successfully!!. OTP:- ${otp}`,
      exists: true,
      email: email
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Login as Credentials are Wrong!!",
      error: error.message
    });
  }
};

exports.login = async(req, res) => {
  try{
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const email = payload.email;
    
    const user = await User.findOne({ email });
    // console.log("User from DB", email);
    if (!user)
    {
      return res.status(400).json({
        success: false,
        message: "User Not Found!!"
      });
    }

    if (!user.isVerified)
    {
      return res.status(400).json({
        success: false,
        message: "User is not Verified"
      });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    // {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password Not Matching!!",
    //     password: password,
    //     email: email
    //   });
    // }
    
    const otp = generateOtp();

    await Otp.create({
      email,
      otp,
      expiredAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await transpoter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Login",
      text: `Your OTP is ${otp}. Valid for only 5 minutes`
    });

    return res.json({
      success: true,
      message: `OTP Sent Successfully!!. OTP:- ${otp}`,
      exists: true
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Login as Credentials are Wrong!!",
      error: error.message
    });
  }
};

exports.verifyLoginOtp = async(req, res) => {
  try{
    const { email, otp } = req.body;

    if(!email || !otp)
        {
            return res.status(400).json({
                success: false,
                message: "OTP/Email is Empty"
            });
        }
    
    const otpRecord = await Otp.findOne({email, otp});

        if(!otpRecord)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid Email/OTP"
            });
        }

        if(otpRecord.expiredAt < new Date())
        {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

    const user = await User.findOne({email});
    await Otp.deleteOne({ _id: otpRecord._id });

    const token = jwt.sign(
      { id: user._id, role: user.role, fname: user.fname },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.json({
      success: true,
      message: "Login Successfull!!",
      token,
      user,
      exists: true
    })
  }
  catch (error)
  {
    return res.status(500).json({
      success: false,
      message: "OTP Failed to Send",
      error: error.message
    });
  }
};