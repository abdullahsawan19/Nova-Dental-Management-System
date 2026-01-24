const Doctor = require("../models/doctor.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// === Helper Function ===
const localizeDoctorData = (doc, lang) => {
  const docObj = doc.toObject ? doc.toObject() : doc;

  if (docObj.specialization && typeof docObj.specialization === "object") {
    const specName =
      docObj.specialization.name[lang] || docObj.specialization.name["en"];

    docObj.specializationData = {
      id: docObj.specialization._id,
      name: specName,
      image: docObj.specialization.image,
      description:
        docObj.specialization.description[lang] ||
        docObj.specialization.description["en"],
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
  let filter = { isDeleted: false, isActive: true };
  if (req.query.specialization) {
    filter.specialization = req.query.specialization;
  }

  const features = new APIFeatures(
    Doctor.find(filter)
      .populate({
        path: "user",
        select: "name preferredLanguage",
      })
      .populate({
        path: "specialization",
        select: "name image description",
        match: { isActive: true },
      }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doctors = await features.query;

  const activeSpecializationDoctors = doctors.filter(
    (doc) => doc.specialization !== null,
  );

  let userLang = req.query.lang;

  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }

  if (!userLang) {
    userLang = "en";
  }

  const localizedDoctors = activeSpecializationDoctors.map((doc) =>
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
  const doctor = await Doctor.findOne({ user: req.user.id })
    .populate({
      path: "user",
      select: "name phone",
    })
    .populate({
      path: "specialization",
      select: "name image",
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

// 3. Get Specific Doctor by ID (Public)
exports.getDoctorById = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne({
    _id: req.params.id,
    isDeleted: false,
    isActive: true,
  })
    .populate({
      path: "user",
      select: "name photo",
    })
    .populate({
      path: "specialization",
      select: "name image description",
    })
    .populate({
      path: "reviews",
      select: "rating review user createdAt",
    });

  if (!doctor) {
    return next(new AppError("No doctor found with that ID", 404));
  }

  const userLang = req.query.lang || "en";

  const localizedDoctor = localizeDoctorData(doctor, userLang);

  res.status(200).json({
    status: "success",
    data: { doctor: localizedDoctor },
  });
});
