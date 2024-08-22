const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const cors = require('cors');
const morgan = require("morgan")
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')) // Use morgan middleware

// Mount routes
app.use('/api/auth', authRoutes); // Use auth routes for authentication
app.use('/api/contacts', contactRoutes); // Use contact routes for contact management


const PORT = process.env.PORT || 5000; // Get port from environment variable or use default 5000

// Connect to MongoDB and start the server
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using the provided URI
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server on the specified port
  })
  .catch(err => console.log(err)); // Handle potential errors during connection
}

module.exports = app; // Export the app for testing