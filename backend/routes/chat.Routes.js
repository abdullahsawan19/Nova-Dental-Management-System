const express = require("express");
const rateLimit = require("express-rate-limit");
const chatController = require("../controllers/chat.Controller");

const router = express.Router();

const chatLimiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000,
  message:
    "Too many questions asked from this IP, please try again in a minute!",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", chatLimiter, chatController.chatWithAI);

module.exports = router;
