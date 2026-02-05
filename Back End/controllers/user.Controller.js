const User = require("../models/user.Model.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const APIFeatures = require("../utils/apiFeatures.js");
const { createSendToken } = require("./Auth.controller.js");

// 1. Create User
exports.createUser = (role) => {
  return catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm, preferredLanguage, phone } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User with this email already exists", 400));
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return next(
        new AppError("User with this phone number already exists", 400),
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      preferredLanguage,
      phone,
      role: role,
      isActive: true,
    });

    await createSendToken(user, 201, res);
  });
};

// 2. Create Doctor (Admin Only)///
exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone,
    role: "doctor",
    isActive: true,
  });

  doctor.password = undefined;

  res.status(201).json({
    status: "success",
    message: "Doctor created successfully",
    data: { user: doctor },
  });
});

// 3. Get Me
exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
});

// 4. Update Me
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }

  const forbiddenFields = ["role", "isActive", "isDeleted", "refreshToken"];
  forbiddenFields.forEach((el) => delete req.body[el]);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});

// 5. Get All Users (With API Features)
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const filter = { role: { $ne: "admin" } };
  const features = new APIFeatures(User.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search(["name", "email"]);
  const users = await features.query;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;

  res.status(200).json({
    status: "success",
    metadata: {
      currentPage: page,
      limit: limit,
    },
    results: users.length,
    data: { users },
  });
});

// 7. Deactivate User
exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true },
  );

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "User deactivated successfully",
    data: { user },
  });
});

// 8. Delete User
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true });

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(204).json({ status: "success", data: null });
});
