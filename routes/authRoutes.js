const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middlewares/userValidation');
const { validate } = require('../middlewares/validationMiddleware');

// Register route with validation and register controller
router.post('/register', registerValidation, validate, register); 
// Login route with validation and login controller
router.post('/login', loginValidation, validate, login); 
// Logout route
router.post('/logout', logout); 

// Export the router for use in the main application
module.exports = router; 