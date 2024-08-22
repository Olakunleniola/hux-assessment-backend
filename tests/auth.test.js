const request = require('supertest'); 
const app = require('../server');
const { setupDB } = require('./testSetup'); 

jest.setTimeout(30000); // Increase timeout to 30 seconds


// Initialize an in-memory MongoDB server specifically for testing purposes
setupDB();

describe('Auth API Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')  // Send a POST request to the user registration endpoint
      // Send user data in the request body
      .send({                       
        email: 'testuser@example.com',
        password: 'password123',
        username: "devkk"
      });

    expect(res.statusCode).toEqual(201);  // Expect a 201 Created status code on successful registration
    expect(res.body).toHaveProperty('token');  // Verify the response has a 'token' property (likely JWT)
  });

  it('should login a user and return a JWT', async () => {
    // First, register a test user (assuming registration is required for login)
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        username: "devkk"
      });

    const res = await request(app)
      .post('/api/auth/login')    // Send a POST request to the user login endpoint
      .send({                         // Send user credentials in the request body
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);  // Expect a 200 OK status code on successful login
    expect(res.body).toHaveProperty('token');  // Verify the response has a 'token' property (likely JWT)
    expect(res.body).toHaveProperty('user');  // Verify the response has a 'user' property
  });
});