const Service = require("../models/service.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const localizeService = (service, lang) => {
  const srvObj = service.toObject ? service.toObject() : service;
  srvObj.name = srvObj.name[lang] || srvObj.name["en"];
  srvObj.description = srvObj.description[lang] || srvObj.description["en"];
  return srvObj;
};

exports.getAllServicesPublic = catchAsync(async (req, res, next) => {
  const services = await Service.find({ isActive: true }).sort({ fees: 1 });

  let userLang = req.query.lang;
  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }
  userLang = userLang || "en";

  const localizedServices = services.map((srv) =>
    localizeService(srv, userLang),
  );

  res.status(200).json({
    status: "success",
    results: localizedServices.length,
    data: { services: localizedServices },
  });
});

exports.getAllServicesAdmin = catchAsync(async (req, res, next) => {
  const services = await Service.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: services.length,
    data: { services },
  });
});

exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError("Service not found", 404));

  let userLang = req.query.lang;
  if (!userLang && req.user && req.user.preferredLanguage) {
    userLang = req.user.preferredLanguage;
  }
  userLang = userLang || "en";

  const localizedService = localizeService(service, userLang);

  res.status(200).json({
    status: "success",
    data: { service: localizedService },
  });
});

// (ADMIN ONLY) Create Service
exports.createService = catchAsync(async (req, res, next) => {
  let imageName = "Teeth.jfif";
  if (req.file) imageName = req.file.filename;

  const serviceData = {
    name: {
      en: req.body.nameEn,
      ar: req.body.nameAr,
    },
    description: {
      en: req.body.descEn,
      ar: req.body.descAr,
    },
    fees: req.body.fees,
    image: imageName,
    isActive: true,
  };

  const newService = await Service.create(serviceData);

  res.status(201).json({
    status: "success",
    data: { service: newService },
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const updateData = {};
  if (req.file) updateData.image = req.file.filename;
  if (req.body.fees) updateData.fees = req.body.fees;
  if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

  if (req.body.nameEn || req.body.nameAr) {
    updateData.name = {
      en: req.body.nameEn,
      ar: req.body.nameAr,
    };
  }

  if (req.body.descEn || req.body.descAr) {
    updateData.description = {
      en: req.body.descEn,
      ar: req.body.descAr,
    };
  }

  const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!service) return next(new AppError("No service found with that ID", 404));

  res.status(200).json({ status: "success", data: { service } });
});
