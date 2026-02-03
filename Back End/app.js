const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");

const globalErrorHandler = require("./controllers/error.Controller");
const notFound = require("./middlewares/notFound.middleware");
const chatRouter = require("./routes/chat.Routes");
const appointmentController = require("./controllers/appointment.Controller");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    secure: false,
  }),
);
app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  appointmentController.webhookCheckout,
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      "fees",
      "ratingsQuantity",
      "ratingsAverage",
      "specialization",
      "role",
    ],
  }),
);

app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", require("./routes/user.Routes"));
app.use("/api/doctors", require("./routes/doctor.Routes"));
app.use("/api/services", require("./routes/service.Routes"));
app.use("/api/branches", require("./routes/branch.Routes"));
app.use("/api/faqs", require("./routes/faq.Routes"));
app.use("/api/reviews", require("./routes/review.Routes"));
app.use("/api/appointments", require("./routes/appointment.Routes"));
app.use("/api/chat", chatRouter);

// 404 & Error Handling
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
