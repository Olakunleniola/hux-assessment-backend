const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;
const originalEnv = process.env.NODE_ENV;  // Store the original NODE_ENV

module.exports.setupDB = () => {
  beforeAll(async () => {
    // Set NODE_ENV to 'test' for the duration of the tests
    process.env.NODE_ENV = 'test';

    mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    // Clean up the database between tests
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();

    // Restore the original NODE_ENV after tests
    process.env.NODE_ENV = originalEnv;
  });
};
