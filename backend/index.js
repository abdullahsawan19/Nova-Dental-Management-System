const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("✅✅✅✅✅  Database Connected");
  } catch (error) {
    console.log(
      `❎❎❎❎❎  Database connection errorrrrrrrrrrr ${error.message}`,
    );
    process.exit(1);
  }
};

module.exports = connectDB;
