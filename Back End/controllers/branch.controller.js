const Branch = require("../models/branch.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Helper
const localizeBranch = (branch, lang) => {
  const obj = branch.toObject ? branch.toObject() : branch;

  obj.name = obj.name[lang] || obj.name["en"];
  obj.address = obj.address[lang] || obj.address["en"];
  if (obj.workingHours) {
    obj.workingHours = obj.workingHours[lang] || obj.workingHours["en"];
  }
  return obj;
};

// ==============================
// 1. PUBLIC ROUTES
// ==============================

// (Active Branch)
exports.getActiveBranch = catchAsync(async (req, res, next) => {
  const branch = await Branch.findOne({ isActive: true, isDeleted: false });

  if (!branch) {
    return res.status(200).json({ status: "success", data: { branch: null } });
  }

  let userLang = req.query.lang;
  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }
  userLang = userLang || "en";

  res.status(200).json({
    status: "success",
    data: { branch: localizeBranch(branch, userLang) },
  });
});

// ==============================
// 2. ADMIN ROUTES (للأدمن فقط)
// ==============================

exports.getAllBranches = catchAsync(async (req, res, next) => {
  const branches = await Branch.find({ isDeleted: false });

  res.status(200).json({
    status: "success",
    results: branches.length,
    data: { branches },
  });
});

//  add new branch
exports.createBranch = catchAsync(async (req, res, next) => {
  if (req.body.isActive === true) {
    await Branch.updateMany({}, { isActive: false });
  }

  const newBranch = await Branch.create(req.body);

  res.status(201).json({
    status: "success",
    data: { branch: newBranch },
  });
});

// edit branch
exports.updateBranch = catchAsync(async (req, res, next) => {
  if (req.body.isActive === true) {
    await Branch.updateMany({}, { isActive: false });
  }

  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!branch) return next(new AppError("Branch not found", 404));

  res.status(200).json({
    status: "success",
    data: { branch },
  });
});

// (Soft Delete)
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

  res.status(204).json({
    status: "success",
    data: null,
  });
});
