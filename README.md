# Hux Assessment - Full Stack Development
This project is a backend API developed as part of an assessment for Hux Ventures for a Full Stack Developer role. The API handles user authentication and allows the management of contacts (CRUD operations). It is built using Node.js, Express, MongoDB, and JWT for authentication.

## Features
+ User Registration and Login (JWT-based authentication)
- Create, Read, Update, and Delete Contacts
+ Contact Management restricted to authenticated users
- Input validation with express-validator

## Tech Stack
+ **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
+ **Testing**: Jest, Supertest
- **Logging**: Morgan
+ **Documentation**: Swagger (OpenAPI)

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites
+ Node.js (v14+)
- MongoDB (Running locally or a MongoDB Atlas connection)
+ npm (v6+)

### Installation
1. Clone the repository:

    ```bash
        git clone https://github.com/Olakunleniola/hux-assessment-backend.git
        cd hux-assessment-backend
    ```
2. Install the dependencies:

    ```bash
        npm install
    ```
3. Create a .env file in the root directory and add the following environment variables:

    ```bash
        PORT=5000
        JWT_SECRET=your_jwt_secret_key
        MONGO_URI=mongodb://localhost:27017/hux-assessment
        NODE_ENV=development
    ```
### Running the Application
1. Start the server:
    ```bash
        npm run dev
    ```
2. The server will run on http://localhost:5000.

### Running Tests
To run the test suite (using Jest and Supertest), run:
    ```bash
        npm test
    ```

## API Documentation
The API is documented using Swagger (OpenAPI). You can access the documentation by visiting this [link](https://app.swaggerhub.com/apis/OlakunleAdio/Hux_Assessment_API/1.0.0) after running the server.

Alternatively, the documentation is also available as a YAML file at `docs/swagger.yaml`.

### Available API Endpoints
1. Auth Routes:

+ **POST** /api/auth/register: Register a new user.
- **POST** /api/auth/login: Log in and receive a JWT.

2. Contact Routes (Protected):

+ **GET** /api/contacts: Get all contacts owned by the authenticated user.
- **POST** /api/contacts: Create a new contact.
+ **PUT** /api/contacts/:id: Update a contact by ID.
- **DELETE** /api/contacts/:id: Delete a contact by ID.

### Request Headers
For protected routes, include the following header with your requests:

```bash
    x-auth-token: <your_jwt_token>
```
#### Example API Requests
Here’s an example of how to make API requests using cURL:

Login User:


```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "devlakunle@learnly.com",
  "password": "1234567890"
}'
```

Create a Contact:

```bash
curl -X POST http://localhost:5000/api/contacts -H "x-auth-token: <your_jwt_token>" -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "08123456789"
}'
```

## Logging
This project uses Morgan for logging requests. Logs can be seen in the console while the server is running.

## Project Structure

```bash
    ├── controllers
    │   ├── authController.js
    │   ├── contactController.js
    ├── middlewares
    │   └── authMiddleware.js
    │   └── contactValidation.js
    │   └── userValidation.js
    │   └── validationMiddleware.js
    ├── models
    │   ├── User.js
    │   ├── Contact.js
    ├── routes
    │   ├── authRoutes.js
    │   ├── contactRoutes.js
    ├── tests
    │   ├── testSetup.js
    │   ├── auth.test.js
    │   ├── contact.test.js
    ├── docs
    │   └── swagger.yaml
    ├── server.js
    └── README.md
```

## License
This project is licensed under the MIT [License](https://).