// Database configuration and connection
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense-tracker';

  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/expense-tracker.');
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected successfully');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Current MONGO_URI:', uri);
    if (error.message.includes('Authentication failed')) {
      console.error('MongoDB authentication failed. Verify user/password and that the Atlas user has access to the database.');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
