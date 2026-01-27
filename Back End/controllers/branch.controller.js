const Branch = require("../models/branch.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const redisClient = require("../utils/redisClient");
const logAction = require("../utils/logger");

const formatTime12H = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  let h = parseInt(hours, 10);
  const suffix = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  return `${h}:${minutes} ${suffix}`;
};

// === Helper ===
const localizeBranch = (branch, lang) => {
  const obj = branch.toObject ? branch.toObject() : branch;

  obj.name = obj.name[lang] || obj.name["en"];
  obj.address = obj.address[lang] || obj.address["en"];

  if (obj.workingHours) {
    obj.workingHours = obj.workingHours[lang] || obj.workingHours["en"];
  }

  obj.openTime = formatTime12H(obj.openTime);
  obj.closeTime = formatTime12H(obj.closeTime);

  return obj;
};

// ==============================
// 1. PUBLIC ROUTES
// ==============================

exports.getActiveBranch = catchAsync(async (req, res, next) => {
  let userLang = req.query.lang;
  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }
  userLang = userLang || "en";

  const cacheKey = `branch:active:${userLang}`;

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("⚡ Branch served from Cache");
    return res.status(200).json({
      status: "success",
      data: { branch: JSON.parse(cachedData) },
    });
  }

  const branch = await Branch.findOne({ isActive: true, isDeleted: false });

  if (!branch) {
    return res.status(200).json({ status: "success", data: { branch: null } });
  }

  const localizedBranch = localizeBranch(branch, userLang);

  await redisClient.set(cacheKey, JSON.stringify(localizedBranch), { EX: 600 });

  res.status(200).json({
    status: "success",
    data: { branch: localizedBranch },
  });
});

// ==============================
// 2. ADMIN ROUTES
// ==============================

exports.getAllBranches = catchAsync(async (req, res, next) => {
  const branches = await Branch.find({ isDeleted: false });

  const formattedBranches = branches.map((b) => localizeBranch(b, "en"));

  res.status(200).json({
    status: "success",
    results: branches.length,
    data: { branches: formattedBranches },
  });
});

exports.createBranch = catchAsync(async (req, res, next) => {
  if (req.body.isActive === true) {
    await Branch.updateMany({}, { isActive: false });
  }

  const newBranch = await Branch.create(req.body);

  if (req.user) {
    await logAction("CREATE_BRANCH", req.user._id, "Branch", newBranch._id, {
      branchName: newBranch.name,
      isActive: newBranch.isActive,
    });
  }

  res.status(201).json({
    status: "success",
    data: { branch: newBranch },
  });
});

exports.updateBranch = catchAsync(async (req, res, next) => {
  if (req.body.isActive === true) {
    await Branch.updateMany({}, { isActive: false });
  }

  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!branch) return next(new AppError("Branch not found", 404));

  if (req.user) {
    await logAction("UPDATE_BRANCH", req.user._id, "Branch", branch._id, {
      updates: req.body,
    });
  }

  res.status(200).json({
    status: "success",
    data: { branch },
  });
});

exports.deleteBranch = catchAsync(async (req, res, next) => {
  const branch = await Branch.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      isActive: false,
    },
    { new: true },
  );

  if (!branch) return next(new AppError("Branch not found", 404));

  if (req.user) {
    await logAction("DELETE_BRANCH", req.user._id, "Branch", branch._id, {
      type: "Soft Delete",
      branchName: branch.name,
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
