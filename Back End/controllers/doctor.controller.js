const Doctor = require("../models/doctor.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// === Helper Function ===
const localizeDoctorData = (doc, lang) => {
  const docObj = doc.toObject ? doc.toObject() : doc;
  if (
    docObj.specialization &&
    typeof docObj.specialization === "object" &&
    docObj.specialization.name
  ) {
    const specName =
      docObj.specialization.name[lang] || docObj.specialization.name["en"];

    docObj.specializationData = {
      id: docObj.specialization._id,
      name: specName,
      image: docObj.specialization.image,
      description: docObj.specialization.description
        ? docObj.specialization.description[lang] ||
          docObj.specialization.description["en"]
        : "",
    };
    docObj.specialization = specName;
  }
  if (docObj.bio && docObj.bio[lang]) {
    docObj.bio = docObj.bio[lang] || docObj.bio["en"];
  }
  if (docObj.education && docObj.education[lang]) {
    docObj.education = docObj.education[lang] || docObj.education["en"];
  }
  return docObj;
};

// === Controllers ===

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  let userLang = req.query.lang || "en";

  let filter = { isDeleted: false, isActive: true };

  if (req.query.specialization || req.query.service) {
    filter.specialization = req.query.specialization || req.query.service;
  }

  const features = new APIFeatures(
    Doctor.find(filter)
      .populate({
        path: "user",
        select: "name email phone preferredLanguage isActive",
      })
      .populate({
        path: "specialization",
        select: "name image description",
      }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doctors = await features.query;

  const validDoctors = doctors.filter(
    (doc) => doc.user !== null && doc.user.isActive === true,
  );

  const localizedDoctors = validDoctors.map((doc) =>
    localizeDoctorData(doc, userLang),
  );

  const totalDocs = await Doctor.countDocuments(filter);

  res.status(200).json({
    status: "success",
    metadata: {
      totalDocs,
      totalPages: Math.ceil(totalDocs / (req.query.limit || 6)),
    },
    results: localizedDoctors.length,
    data: { doctors: localizedDoctors },
  });
});

exports.getAdminDoctors = catchAsync(async (req, res, next) => {
  let userLang = req.query.lang || "en";

  let filter = { isDeleted: false };

  const features = new APIFeatures(
    Doctor.find(filter)
      .populate({
        path: "user",
        select: "name email phone preferredLanguage isActive",
      })
      .populate({
        path: "specialization",
        select: "name image description",
      }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doctors = await features.query;

  const validDoctors = doctors.filter((doc) => doc.user !== null);
  const localizedDoctors = validDoctors.map((doc) =>
    localizeDoctorData(doc, userLang),
  );

  const totalDocs = await Doctor.countDocuments(filter);

  res.status(200).json({
    status: "success",
    metadata: { totalDocs },
    results: localizedDoctors.length,
    data: { doctors: localizedDoctors },
  });
});

// 1. Get Profile
exports.getDoctorProfile = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user.id })
    .populate({ path: "user", select: "name phone" })
    .populate({ path: "specialization", select: "name image" });

  if (!doctor) return next(new AppError("Profile incomplete.", 404));
  const userLang = req.user.preferredLanguage || "en";
  res.status(200).json({
    status: "success",
    data: { doctor: localizeDoctorData(doctor, userLang) },
  });
});

// 2. Update Profile
exports.updateDoctorProfile = catchAsync(async (req, res, next) => {
  const doctorData = { ...req.body };
  if (req.file) doctorData.photo = req.file.filename;

  const doctor = await Doctor.findOneAndUpdate(
    { user: req.user.id },
    doctorData,
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );
  res
    .status(200)
    .json({ status: "success", message: "Profile updated", data: { doctor } });
});

// 3. Get By ID
exports.getDoctorById = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({
    _id: req.params.id,
    isDeleted: false,
    isActive: true,
  })
    .populate({ path: "user", select: "name email phone" })
    .populate({ path: "specialization", select: "name image description" });

  if (!doctor) return next(new AppError("No doctor found", 404));
  const userLang = req.query.lang || "en";
  res.status(200).json({
    status: "success",
    data: { doctor: localizeDoctorData(doctor, userLang) },
  });
});
