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
      type: String,
      required: true,
      trim: true,
      enum: Object.keys(SPECIALIZATIONS_MAP),
      default: "General Dentist",
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
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

doctorSchema.virtual("specializationInfo").get(function () {
  return SPECIALIZATIONS_MAP[this.specialization];
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
module.exports.SPECIALIZATIONS_MAP = SPECIALIZATIONS_MAP;
