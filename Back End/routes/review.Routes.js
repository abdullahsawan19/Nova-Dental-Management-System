const express = require("express");
const reviewController = require("../controllers/review.Controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// ============================================================
// 1️⃣ PUBLIC ROUTES (Guest + All)
// ============================================================
router.get("/", reviewController.getAllReviews);

// ============================================================
// 2️⃣ USER ROUTES (Protected)
// ============================================================

router.post(
  "/",
  authenticate,
  authorize("patient"),
  reviewController.createReview,
);

// ============================================================
// 3️⃣ ADMIN ROUTES (Protected)
// ============================================================
router.delete(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  reviewController.deleteReview,
);

module.exports = router;
