const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connectDB = async () => {
  try {
    // Try to connect to local MongoDB first
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('localhost')) {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 3000 // 3 second timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (localError) {
        console.log('Local MongoDB not available, starting in-memory database...');
      }
    }

    // Start in-memory MongoDB server
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    const conn = await mongoose.connect(uri);
    console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
    console.log('Note: Using in-memory database. Data will be lost when server restarts.');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Cleanup function
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error('Error disconnecting from database:', error.message);
  }
};

module.exports = { connectDB, disconnectDB };