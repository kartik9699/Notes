const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If the email exists, send an error response
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            name: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save(); // Save the new user to the database

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. User not created." });
    }
});

module.exports = router;
