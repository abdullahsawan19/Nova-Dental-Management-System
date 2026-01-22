const mongoose = require("mongoose");

const SPECIALIZATIONS_MAP = {
  "General Dentist": { ar: "ممارس عام", en: "General Dentist" },
  Orthodontics: { ar: "تقويم الأسنان", en: "Orthodontics" },
  Endodontics: { ar: "علاج الجذور", en: "Endodontics" },
  "Pediatric Dentistry": { ar: "طب أسنان أطفال", en: "Pediatric Dentistry" },
  "Oral Surgery": { ar: "جراحة الفم", en: "Oral Surgery" },
  Prosthodontics: { ar: "التركيبات الصناعية", en: "Prosthodontics" },
  "Restorative Dentistry": {
    ar: "علاج تحفظي وتجميلي",
    en: "Restorative Dentistry",
  },
  Periodontics: { ar: "أمراض اللثة", en: "Periodontics" },
  "Oral Medicine": { ar: "طب الفم والتشخيص", en: "Oral Medicine" },
};

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },

    specialization: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    education: {
      en: {
        type: String,
        trim: true,
        required: [true, "Education in English is required"],
      },
      ar: {
        type: String,
        trim: true,
        required: [true, "Education in Arabic is required"],
      },
    },
    bio: {
      en: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      ar: {
        type: String,
        trim: true,
        maxlength: 500,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
