const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
    },
    address: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    locationUrl: { type: String, required: true },
    phones: { type: [String], required: true },
    email: { type: String, trim: true, lowercase: true },

    openTime: {
      type: String,
      required: [true, "Open time is required (e.g., 09:00)"],
    },
    closeTime: {
      type: String,
      required: [true, "Close time is required (e.g., 21:00)"],
    },
    workingHours: {
      en: { type: String },
      ar: { type: String },
    },
    workingDays: {
      type: [Number],
      default: [0, 1, 2, 3, 4],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
