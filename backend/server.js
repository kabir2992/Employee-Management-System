const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware Express
const app = express();
app.use(cors());
app.use(express.json());

// Defining Routes for accessing after launching the program like:- signup and more
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);
console.log("Mongo URI:- ",process.env.MONGO_URI);

// To check the JWT Verification Login
const testRoutes = require('./routes/testRoutes');
app.use('/api/test',testRoutes);

// For Role Based Access and their CRUD Operations
const userRoutes = require('./routes/userRoutes');
app.use('/api/users',userRoutes);

// For Role Based Access to their dashboard
const dashRoutes = require('./routes/dashRoutes');
app.use('/api/dashboard', dashRoutes);

// For Admin Dashboard Data
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Connection of Database via Mongoose for personal cluster in MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() =>  console.log("Connection Established!!"))
.catch(err => console.log("Error Occured!!",err));
// console.log("Google CLient ID:- ", process.env.GOOGLE_CLIENT_ID);

// Simple way to check whether the server is running or not
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is Running!!'
    });
});

// Initialising the PORT from .env file where PORT is defined
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});
