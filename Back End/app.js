const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controllers/error.Controller");
const notFound = require("./middlewares/notFound.middleware");
const chatRouter = require("./routes/chat.Routes");

const app = express();

// Logger (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// Global Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes creation
app.use("/api", limiter);

app.use("/api/users", require("./routes/user.Routes"));
app.use("/api/doctors", require("./routes/doctor.Routes"));
app.use("/api/services", require("./routes/service.Routes"));
app.use("/api/branches", require("./routes/branch.Routes"));
app.use("/api/faqs", require("./routes/faq.Routes"));
app.use("/api/chat", chatRouter);

app.use(notFound);

app.use(globalErrorHandler);

module.exports = app;
