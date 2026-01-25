const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });
};

const signRefreshToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || "9d",
    },
  );
};

const createSendToken = async (user, statusCode, res) => {
  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  user.password = undefined;
  user.refreshToken = undefined;

  const refreshExpires = parseInt(process.env.JWT_REFRESH_EXPIRES) || 9;

  const cookieOptions = {
    expires: new Date(Date.now() + refreshExpires * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", refreshToken, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    message:
      statusCode === 201 ? "Account created successfully" : "Login successful",
    accessToken,
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
    return next(
      new AppError("Your account is deactivated. Contact admin.", 403),
    );
  }

  await createSendToken(user, 200, res);
});

exports.createSendToken = createSendToken;
