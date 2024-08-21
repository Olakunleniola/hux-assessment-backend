const { check } = require('express-validator'); // Import validation rules from express-validator

// ** Register Validation Rules **
exports.registerValidation = [
  check('username', 'Username is required').not().isEmpty(), // Ensure username is not empty
  check('email', 'Please include a valid email').isEmail().normalizeEmail(), // Validate email format and normalize it
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), // Ensure password is at least 6 characters long
];

// ** Login Validation Rules **
exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(), // Validate email format and normalize it
  check('password', 'Password is required').not().isEmpty(), // Ensure password is not empty
];
