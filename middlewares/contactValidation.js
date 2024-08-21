const { check } = require('express-validator'); // Import validation rules from express-validator

// ** Contact Validation Rules **
exports.contactValidation = [
  // Ensure first name is not empty, remove leading/trailing whitespace, and escape special characters
  check('firstName', 'First Name is required').not().isEmpty().trim().escape(), 
  // Ensure last name is not empty, remove leading/trailing whitespace, and escape special characters
  check('lastName', 'Last Name is required').not().isEmpty().trim().escape(), 
  // Ensure phone number is not empty and validate it as a mobile phone number
  check('phoneNumber', 'Phone Number is required').not().isEmpty().isMobilePhone(), 
];