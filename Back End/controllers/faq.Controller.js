const FAQ = require("../models/faq.Model");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// --- Helper Function ---
const localizeFAQ = (faq, lang) => {
  const faqObj = faq.toObject ? faq.toObject() : faq;
  faqObj.question = faqObj.question[lang] || faqObj.question["en"];
  faqObj.answer = faqObj.answer[lang] || faqObj.answer["en"];
  return faqObj;
};

// --- Controller Functions ---

exports.getPublicFaqs = catchAsync(async (req, res, next) => {
  const filter = { isActive: true, isDeleted: false };

  const queryObj = { ...req.query };
  delete queryObj.lang;

  const features = new APIFeatures(FAQ.find(filter), queryObj)
    .filter()
    .search(["question.en", "question.ar", "answer.en", "answer.ar"])
    .sort()
    .limitFields();

  const countQuery = features.query.clone();
  const totalDocs = await countQuery.countDocuments();

  features.paginate();
  const faqs = await features.query;

  const userLang = req.query.lang || "en";
  const localizedFaqs = faqs.map((faq) => localizeFAQ(faq, userLang));

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;

  res.status(200).json({
    status: "success",
    metadata: {
      currentPage: page,
      limit: limit,
      totalDocs: totalDocs,
      totalPages: Math.ceil(totalDocs / limit) || 1,
    },
    results: localizedFaqs.length,
    data: { faqs: localizedFaqs },
  });
});

exports.getAdminFaqs = catchAsync(async (req, res, next) => {
  const filter = { isDeleted: false };

  const queryObj = { ...req.query };
  delete queryObj.lang;

  const features = new APIFeatures(FAQ.find(filter), queryObj)
    .filter()
    .search(["question.en", "question.ar", "answer.en", "answer.ar"])
    .sort()
    .limitFields();

  const countQuery = features.query.clone();
  const totalDocs = await countQuery.countDocuments();

  features.paginate();
  const faqs = await features.query;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;

  res.status(200).json({
    status: "success",
    metadata: {
      currentPage: page,
      limit: limit,
      totalDocs: totalDocs,
      totalPages: Math.ceil(totalDocs / limit) || 1,
    },
    results: faqs.length,
    data: { faqs },
  });
});

exports.getFaqById = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findOne({
    _id: req.params.id,
    isDeleted: false,
    isActive: true,
  });

  if (!faq) {
    return next(new AppError("No FAQ found with that ID", 404));
  }

  const userLang = req.query.lang || "en";

  res.status(200).json({
    status: "success",
    data: { faq: localizeFAQ(faq, userLang) },
  });
});

exports.createFaq = catchAsync(async (req, res, next) => {
  const newFaq = await FAQ.create(req.body);
  res.status(201).json({ status: "success", data: { faq: newFaq } });
});

exports.updateFaq = catchAsync(async (req, res, next) => {
  const updateData = { ...req.body };
  if (updateData.question) {
    if (updateData.question.en)
      updateData["question.en"] = updateData.question.en;
    if (updateData.question.ar)
      updateData["question.ar"] = updateData.question.ar;
    delete updateData.question;
  }
  if (updateData.answer) {
    if (updateData.answer.en) updateData["answer.en"] = updateData.answer.en;
    if (updateData.answer.ar) updateData["answer.ar"] = updateData.answer.ar;
    delete updateData.answer;
  }
  const faq = await FAQ.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!faq) return next(new AppError("No FAQ found", 404));
  res.status(200).json({ status: "success", data: { faq } });
});

exports.deleteFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!faq) return next(new AppError("No FAQ found", 404));
  res.status(204).json({ status: "success", data: null });
});
