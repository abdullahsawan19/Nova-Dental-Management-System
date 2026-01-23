const Review = require("../models/review.Model");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// 1. Get All Reviews (Public)
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const filter = { isDeleted: false };

  const features = new APIFeatures(Review.find(filter), req.query)
    .filter()
    .search(["review", "doctorName"])
    .sort()
    .limitFields();

  const countQuery = features.query.clone();
  const totalDocs = await countQuery.countDocuments();

  features.paginate();
  const reviews = await features.query;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  res.status(200).json({
    status: "success",
    metadata: {
      currentPage: page,
      limit: limit,
      totalDocs: totalDocs,
      totalPages: Math.ceil(totalDocs / limit) || 1,
    },
    results: reviews.length,
    data: { reviews },
  });
});

// 2. Create Review
exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(201).json({ status: "success", data: { review: newReview } });
});

// 3. Soft Delete Review (Admin Only)
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true },
  );

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
