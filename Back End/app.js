const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());

// Logger (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
module.exports = app;
