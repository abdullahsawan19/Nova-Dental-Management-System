const { GoogleGenerativeAI } = require("@google/generative-ai");
const Doctor = require("../models/doctor.Model");
const Service = require("../models/service.Model");
const Faq = require("../models/faq.Model");
const Branch = require("../models/branch.Model");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithAI = catchAsync(async (req, res, next) => {
  const { message, history } = req.body;

  if (!message || message.trim() === "") {
    return next(new AppError("Please provide a message", 400));
  }

  const [doctors, services, faqs, branches] = await Promise.all([
    Doctor.find({ isActive: true, isDeleted: false })
      .select("specialization experienceYears rating bio")
      .populate("user", "name")
      .populate("specialization", "name fees"),
    Service.find({ isActive: true }).select("name fees description duration"),
    Faq.find({ isActive: true, isDeleted: false }).select("question answer"),
    Branch.find({ isActive: true }).select(
      "openTime closeTime workingDays phones locationUrl",
    ),
  ]);

  const doctorsContext = doctors.map((doc) => ({
    name: doc.user?.name || "Unknown Doctor",
    specialization: {
      en: doc.specialization?.name?.en,
      ar: doc.specialization?.name?.ar,
    },
    price_start_from: `${doc.specialization?.fees} EGP`,
    experience: `${doc.experienceYears} Years`,
    rating: doc.rating || "New",
    bio: doc.bio?.en,
  }));

  const servicesContext = services.map((srv) => ({
    name_en: srv.name.en,
    name_ar: srv.name.ar,
    price: `${srv.fees} EGP`,
    duration: srv.duration || "Variable",
    description: srv.description.en,
  }));

  const faqsContext = faqs.map((f) => ({
    q_en: f.question.en,
    q_ar: f.question.ar,
    a_en: f.answer.en,
    a_ar: f.answer.ar,
  }));

  const currentDateTime = new Date().toLocaleString("en-EG", {
    timeZone: "Africa/Cairo",
  });
  const clinicInfo =
    branches.length > 0
      ? {
          open: branches[0].openTime,
          close: branches[0].closeTime,
          phones: branches[0].phones.join(", "),
          location: branches[0].locationUrl,
        }
      : { open: "09:00", close: "22:00" };

  const systemPrompt = `
    You are the smartest AI receptionist for 'DentalCare Clinic'.
    Current Date & Time in Cairo: ${currentDateTime}

    [REAL-TIME DATABASE]:
    1. DOCTORS: ${JSON.stringify(doctorsContext)}
    2. SERVICES: ${JSON.stringify(servicesContext)}
    3. FAQs: ${JSON.stringify(faqsContext)}
    4. CLINIC INFO: Hours: ${clinicInfo.open} to ${clinicInfo.close}, Phones: ${clinicInfo.phones}

    [RULES]:
    1. Reply in the user's language (Arabic/English).
    2. Use provided prices only.
    3. Compare time for availability.
    4. Do NOT diagnose.
    5. CRITICAL: You CANNOT book appointments directly. NEVER ask the user for their name, phone number, or personal details.
    6. If the user wants to book an appointment, politely tell them to go to the "Book Appointment" page (/appointment) to complete their reservation officially.
  `;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history || [],
  });

  const result = await chat.sendMessage(message);
  const reply = result.response.text();

  res.status(200).json({
    status: "success",
    data: { reply },
  });
});
