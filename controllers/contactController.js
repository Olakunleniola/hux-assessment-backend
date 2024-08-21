const Contact = require('../models/Contact'); // Import the Contact model

// ** Create Contact **
exports.createContact = async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body; // Destructure request body for contact details

  try {
    const contact = new Contact({ // Create a new Contact object
      user: req.user.id, // Set the user ID from the request
      firstName,
      lastName,
      phoneNumber,
    });
    await contact.save(); // Save the new contact to the database
    res.json(contact); // Send the created contact back in the response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors and send error message
  }
};

// ** Get All Contacts **
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }); // Find all contacts for the current user
    res.json(contacts); // Send the list of contacts back in the response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors and send error message
  }
};

// ** Get Single Contact **
exports.getContact = async (req, res) => {
    try {
      // Find the contact by ID and ensure it belongs to the logged-in user
      const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
      if (!contact) return res.status(404).json({ msg: 'Contact not found or you do not have permission to view it' });
  
      res.json(contact); // Send the found contact back in the response
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors and send error message
    }
};
  
  // ** Update Contact **
exports.updateContact = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
  
    try {
      // Find the contact by ID and ensure it belongs to the logged-in user
      let contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
      if (!contact) return res.status(404).json({ msg: 'Contact not found or you do not have permission to update it' });
  
      // Update contact properties
      contact.firstName = firstName;
      contact.lastName = lastName;
      contact.phoneNumber = phoneNumber;
      await contact.save(); // Save the updated contact to the database
  
      res.json(contact); // Send the updated contact back in the response
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors and send error message
    }
};
  
  // ** Delete Contact **
exports.deleteContact = async (req, res) => {
    try {
      // Find the contact by ID and ensure it belongs to the logged-in user
      const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
      if (!contact) return res.status(404).json({ msg: 'Contact not found or you do not have permission to delete it' });
  
      await contact.remove(); // Remove the contact from the database
  
      res.json({ msg: 'Contact removed' }); // Send success message on deletion
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors and send error message
    }
};
  