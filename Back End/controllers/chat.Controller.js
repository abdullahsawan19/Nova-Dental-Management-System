const { GoogleGenerativeAI } = require("@google/generative-ai");
const Doctor = require("../models/doctor.Model");
const Service = require("../models/service.Model");
const Faq = require("../models/faq.Model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Dental Assistant Controller

exports.chatWithAI = catchAsync(async (req, res, next) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return next(new AppError("Please provide a message", 400));
  }

  // Fetch SAFE Clinic Data (Whitelist Only)

  const [doctors, services, faqs] = await Promise.all([
    Doctor.find({ isActive: true, isDeleted: false }).select(
      "name specialization experienceYears fees rating",
    ),
    Service.find({ isActive: true, isDeleted: false }).select(
      "name price description duration",
    ),
    Faq.find({ isActive: true, isDeleted: false }).select("question answer"),
  ]);

  // Normalize Data (AI-Friendly)

  const doctorsData = doctors.map((doc) => ({
    name: doc.name,
    specialization: doc.specialization,
    experienceYears: doc.experienceYears,
    fees: doc.fees,
    rating: doc.rating,
  }));

  const servicesData = services.map((srv) => ({
    name: srv.name,
    price: srv.price,
    description: srv.description,
    duration: srv.duration,
  }));

  const faqsData = faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Clinic Context (STRICT SOURCE)

  const clinicContext = `
CLINIC DATABASE (STRICT — USE ONLY THIS DATA):

DOCTORS:
${JSON.stringify(doctorsData, null, 2)}

SERVICES:
${JSON.stringify(servicesData, null, 2)}

FAQs:
${JSON.stringify(faqsData, null, 2)}

GENERAL INFO:
- Working Hours: 9 AM – 10 PM (Daily)
- Location: Cairo, Nasr City
- Booking: Website only
`;

  // System Prompt (Hard Guardrails)

  const systemPrompt = `
ROLE:
You are an AI Dental Assistant for a dental clinic.

KNOWLEDGE SCOPE:
1. General dental education (non-diagnostic).
2. Clinic-specific information ONLY from CLINIC DATABASE.

${clinicContext}

STRICT RULES:
- ❌ No medical diagnosis.
- ❌ No treatment plans.
- ❌ No medication names or prescriptions.
- ❌ Do NOT invent doctors, prices, services, or FAQs.
- ❌ Do NOT expose internal or sensitive data.
- ✅ Educational explanations only.
- ✅ Recommend booking when symptoms appear.
- ✅ Answer using bullet points when helpful.

WHEN USER ASKS:
- About doctors → use DOCTORS data only.
- About services/prices → use SERVICES data only.
- About common questions → use FAQs first.
- About symptoms → explain possible causes + suggest visit.
- Outside dentistry → politely refuse.

LANGUAGE:
Reply in the SAME language as the user.

TONE:
Professional, friendly, reassuring.
`;

  // Final Prompt (Injection Safe)

  const finalPrompt = `
${systemPrompt}

USER QUESTION:
"${message}"
`;

  // Gemini Call

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });

  const result = await model.generateContent(finalPrompt);
  const reply = result.response.text();

  // Response

  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
