const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("💥💥💥 FATAL ERROR: MONGO_URL is UNDEFINED inside Vercel!");
    throw new Error("Vercel cannot see the MONGO_URL environment variable.");
  }

  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅✅✅✅✅ Database Connected Successfully on Vercel");
  } catch (error) {
    console.error(`❎❎❎❎❎ REAL ERROR CAUGHT:`, error);
    throw error;
  }
};

module.exports = connectDB;
