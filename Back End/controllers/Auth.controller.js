const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError"); 

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_ACCESS || '15m',
  });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH || process.env.JWT_KEY, {
    expiresIn: process.env.JWT_REFRESH || '7d',
  });
};

const createSendToken = async (user, statusCode, res) => {
  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  user.password = undefined;
  user.refreshToken = undefined; 

  res.status(statusCode).json({
    status: "success",
    message: statusCode === 201 ? "Account created successfully" : "Login successful",
    accessToken,
    refreshToken,
    data: { user },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  if (!user.isActive) {
    return next(new AppError("Your account is deactivated. Contact admin.", 403));
  }

  await createSendToken(user, 200, res);
});

exports.createSendToken = createSendToken;