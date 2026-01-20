const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/error.Controller");
const AppError = require("./utils/appError");

const app = express();

// Logger (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes

// Middleware
app.use(express.json());

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
