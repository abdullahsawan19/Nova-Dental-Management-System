const Doctor = require("../models/doctor.Model");
const { SPECIALIZATIONS_MAP } = require("../models/doctor.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// === Helper Function ===
const localizeDoctorData = (doc, lang) => {
  const docObj = doc.toObject ? doc.toObject() : doc;

  if (SPECIALIZATIONS_MAP[docObj.specialization]) {
    const translatedSpec =
      SPECIALIZATIONS_MAP[docObj.specialization][lang] ||
      SPECIALIZATIONS_MAP[docObj.specialization]["en"];

    docObj.specialization = translatedSpec;

    delete docObj.specializationInfo;
    delete docObj.id;
  }

  if (docObj.bio && typeof docObj.bio === "object") {
    docObj.bio = docObj.bio[lang] || docObj.bio["en"] || "";
  }

  if (docObj.education && typeof docObj.education === "object") {
    docObj.education = docObj.education[lang] || docObj.education["en"] || "";
  }

  return docObj;
};
// === Controllers ===

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  let filter = { isDeleted: false, isActive: true };
  if (req.query.specialization) {
    filter.specialization = req.query.specialization;
  }

  const features = new APIFeatures(
    Doctor.find(filter).populate({
      path: "user",
      select: "name preferredLanguage",
    }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doctors = await features.query;

  let userLang = req.query.lang;

  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }

  if (!userLang) {
    userLang = "en";
  }
  const localizedDoctors = doctors.map((doc) =>
    localizeDoctorData(doc, userLang),
  );

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const totalDocs = await Doctor.countDocuments(filter);

  res.status(200).json({
    status: "success",
    metadata: {
      currentPage: page,
      limit: limit,
      totalDocs: totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
    },
    results: localizedDoctors.length,
    data: { doctors: localizedDoctors },
  });
});

// 1. Get Current Doctor Profile
exports.getDoctorProfile = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user.id }).populate({
    path: "user",
    select: "name phone",
  });

  if (!doctor) {
    return next(new AppError("You haven't completed your profile yet.", 404));
  }

  const userLang = req.user.preferredLanguage || "en";

  const localizedDoctor = localizeDoctorData(doctor, userLang);

  res.status(200).json({
    status: "success",
    data: { doctor: localizedDoctor },
  });
});

// 2. Create or Update Profile
exports.updateDoctorProfile = catchAsync(async (req, res, next) => {
  const doctorData = { ...req.body };

  if (req.file) {
    doctorData.photo = req.file.filename;
  }

  const doctor = await Doctor.findOneAndUpdate(
    { user: req.user.id },
    doctorData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    data: { doctor },
  });
});
