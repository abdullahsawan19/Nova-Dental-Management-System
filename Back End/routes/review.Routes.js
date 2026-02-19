const express = require("express");
const reviewController = require("../controllers/review.Controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// ============================================================
//  PUBLIC ROUTES (Guest + All)
// ============================================================
router.get("/", reviewController.getAllReviews);

// ============================================================
//  USER ROUTES (Protected)
// ============================================================

router.post(
  "/",
  authenticate,
  authorize("patient"),
  reviewController.createReview,
);

// ============================================================
//  ADMIN ROUTES (Protected)
// ============================================================
router.delete(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  reviewController.deleteReview,
);

module.exports = router;
