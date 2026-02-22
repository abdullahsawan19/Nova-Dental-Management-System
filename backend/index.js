const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = require("./app");
const connectDB = require("./config/db.config");

connectDB();

module.exports = app;
