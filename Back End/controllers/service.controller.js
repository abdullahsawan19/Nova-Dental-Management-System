const Service = require("../models/service.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const localizeService = (service, lang) => {
  const srvObj = service.toObject ? service.toObject() : service;

  srvObj.name = srvObj.name[lang] || srvObj.name["en"];
  srvObj.description = srvObj.description[lang] || srvObj.description["en"];

  return srvObj;
};

// Public Route
exports.getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find({ isActive: true });

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

// Public Route
exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError("Service not found", 404));

  let userLang = req.query.lang || "en";

  res.status(200).json({
    status: "success",
    data: { service: localizeService(service, userLang) },
  });
});

//(ADMIN ONLY)
exports.createService = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  const newService = await Service.create(req.body);

  res.status(201).json({
    status: "success",
    data: { service: newService },
  });
});

// (ADMIN ONLY)
exports.updateService = catchAsync(async (req, res, next) => {
  const updateData = { ...req.body };

  if (req.file) updateData.image = req.file.filename;

  if (updateData.name) {
    if (updateData.name.en) updateData["name.en"] = updateData.name.en;
    if (updateData.name.ar) updateData["name.ar"] = updateData.name.ar;
    delete updateData.name;
  }

  if (updateData.description) {
    if (updateData.description.en)
      updateData["description.en"] = updateData.description.en;
    if (updateData.description.ar)
      updateData["description.ar"] = updateData.description.ar;
    delete updateData.description;
  }

  const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!service) return next(new AppError("No service found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: { service },
  });
});
