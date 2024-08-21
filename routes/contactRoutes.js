const express = require('express');
const auth = require('../middlewares/authMiddleware');
const { contactValidation } = require('../middlewares/contactValidation');
const { validate } = require('../middlewares/validationMiddleware');
// Import controller functions for contact management
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

const router = express.Router();

// Define routes with middleware and controller functions
router.post('/', auth, contactValidation, validate, createContact); // Create contact route with authentication, validation, and createContact controller
router.get('/', auth, getContacts); // Get all contacts route with authentication and getContacts controller
router.get('/:id', auth, getContact); // Get single contact by ID route with authentication and getContact controller
router.put('/:id', auth, contactValidation, validate, updateContact); // Update contact route with authentication, validation, and updateContact controller
router.delete('/:id', auth, deleteContact); // Delete contact route with authentication and deleteContact controller

module.exports = router; // Export the router for use in the main application