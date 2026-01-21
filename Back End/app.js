const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/error.Controller");
const notFound = require("./middlewares/notFound.middleware");

const app = express();

// Logger (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes

// Middleware
app.use(express.json());

app.use(notFound);

app.use(globalErrorHandler);

module.exports = app;
