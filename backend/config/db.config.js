const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  const URI =
    "mongodb+srv://abdullahsawan19_db_user:uBxCTc3ptDBHYQmR@graduationproject0.5iwlj4n.mongodb.net/clinic?retryWrites=true&w=majority";

  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  });

  isConnected = db.connections[0].readyState === 1;
  console.log("✅ Database Connected on Vercel");
};

module.exports = connectDB;
