const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Use environment variables to store your secret key
const SECRET_KEY = process.env.SECRET_KEY || "your_default_secret_key"; // fallback for dev

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      // If no user found, return 400 Bad Request with the appropriate message
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Compare the plain-text password with the hashed password in the database using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // If passwords don't match, return 401 Unauthorized
      return res.status(401).json({ message: "Invalid Password" });
    }

    // If login is successful, generate a JWT token
    const token = jwt.sign({ _id: user._id }, SECRET_KEY); 
    const UserId=user._id;

    // Send back the token to the client
    res.json({ success: true, token: token ,id:UserId});

  } catch (error) {
    console.error(error);
    // Send a generic error response with a 500 status code
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
