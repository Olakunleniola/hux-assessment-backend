const request = require('supertest'); // Import Supertest for making HTTP requests to the server
const app = require('../server'); // Import the main server application
const Contact = require('../models/Contact'); // Import the Contact model for interacting with contact data
const { setupDB } = require('./testSetup'); // Import the setupDB function for initializing the in-memory MongoDB server

// Initialize an in-memory MongoDB server specifically for testing purposes
setupDB();

let token;

beforeAll(async () => {
  // Register a test user with a known email and password
  await request(app)
    .post('/api/auth/register')
    .send({
      email: 'testuser@example.com',
      password: 'password123',
      username: "devkk"
    });

  // Login the test user and store the authentication token for subsequent requests
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123'
    });

  token = res.body.token; // Extract the token from the login response
});

describe('Contact API Tests', () => {
  it('should create a new contact', async () => {
    const res = await request(app)
      .post('/api/contacts') // Send a POST request to the contacts endpoint
      .set('x-auth-token', token) // Include the authentication token in the header
      .send({ // Send the contact data in the request body
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
      });

    expect(res.statusCode).toEqual(201); // Expect a 201 Created status code
    expect(res.body).toHaveProperty('_id'); // Verify the response has an ID property
    expect(res.body.firstName).toBe('John'); // Ensure the first name matches the sent data
  });

  it('should not create a contact with missing fields', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('x-auth-token', token)
      .send({
        firstName: 'John' // Only send the first name
      });

    expect(res.statusCode).toEqual(400); // Expect a 400 Bad Request status code (likely due to validation errors)
  });

  it('should update an existing contact', async () => {
    // First, create a contact to update
    const contact = await request(app)
      .post('/api/contacts')
      .set('x-auth-token', token)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890'
      });

    const res = await request(app)
      .put(`/api/contacts/${contact.body._id}`) // Use the created contact's ID for the update request
      .set('x-auth-token', token)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '0987654321'
      });

    expect(res.statusCode).toEqual(200); // Expect a 200 OK status code
    expect(res.body.firstName).toBe('Jane'); // Verify the updated first name in the response
  });

  it('should delete a contact', async () => {
    // First, create a contact to delete
    const contact = await request(app)
      .post('/api/contacts')
      .set('x-auth-token', token)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890'
      });

    const res = await request(app)
      .delete(`/api/contacts/${contact.body._id}`) // Use the created contact's ID for the delete request
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200); // Expect a 200 OK status code
    expect(res.body.msg).toBe('Contact removed'); // Verify the success message in the response
  });
});