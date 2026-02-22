const mongoose = require("mongoose");

const connectDB = async () => {
  const URI =
    "mongodb+srv://abdullahsawan19_db_user:uBxCTc3ptDBHYQmR@graduationproject0.5iwlj4n.mongodb.net/clinic?retryWrites=true&w=majority";

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
    console.log("✅✅✅✅✅ Database Connected Successfully on Vercel");
  } catch (error) {
    console.log(`❎❎❎❎❎ Database connection error: ${error.message}`);
  }
};

module.exports = connectDB;
