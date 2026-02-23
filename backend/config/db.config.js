const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅✅✅✅✅ Database Connected");
  } catch (error) {
    console.log(`❎❎❎❎❎ Database connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
