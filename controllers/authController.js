// Import required modules and models
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Password hashing library
const jwt = require('jsonwebtoken'); // JSON Web Token library
const dotenv = require('dotenv'); // Environment variable management


// Load environment variables from .env file
dotenv.config();

// Register a new user
exports.register = async (req, res) => {
  // Extract user data from request body
  const { username, email, password } = req.body;

  try {
    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Return error if user already exists
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({ username, email, password: hashedPassword });

    // Save the user document to the database
    await user.save();

    // Generate a JSON Web Token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token });
  } catch (err) {
    // Return a server error if an exception occurs
    res.status(500).json({ error: err.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  // Extract user data from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Return error if user does not exist
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Return error if passwords do not match
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate a JSON Web Token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token: token,  username: user._username, id: user._id });
  } catch (err) {
    // Return a server error if an exception occurs
    res.status(500).json({ error: err.message });
  }
};

// Logout (currently just returns a success message)
exports.logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};