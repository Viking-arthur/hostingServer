// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    console.log('Request body:', req.body); // Log the incoming request body
  
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        console.log('Validation failed: Email and password are required'); // Log validation failure
        return res.status(400).send('Email and password are required');
    }

  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
  
    try {
        await newUser.save(); // Attempt to save to the database
        res.status(201).send('User registered');
    } catch (error) {
        console.error('Error registering user:', error); // Log the error
        res.status(400).send('Error registering user: ' + error.message); // Send the error message back
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Home route
router.get('/home', (req, res) => {
    res.send('Welcome to the home page!');
});

module.exports = router;
