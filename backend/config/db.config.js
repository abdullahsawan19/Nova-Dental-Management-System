const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("✅ Using existing Database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    isConnected = db.connections[0].readyState;
    console.log("✅✅✅✅✅  Database Connected Successfully");
  } catch (error) {
    console.log(`❎❎❎❎❎  Database connection error: ${error.message}`);
  }
};

module.exports = connectDB;
