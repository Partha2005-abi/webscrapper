const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webscraper';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Database connection failed: ${error.message}`);
    // Do not crash server in sample mode so API can still inform client
  }
};

module.exports = connectDB;
