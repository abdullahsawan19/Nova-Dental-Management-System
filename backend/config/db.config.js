const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using cached database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅✅✅ Database Connected Successfully");
  } catch (error) {
    console.log(`❎❎❎ Database connection error: ${error.message}`);
  }
};

module.exports = connectDB;
