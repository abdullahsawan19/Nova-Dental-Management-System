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
    workingHours: {
      en: { type: String },
      ar: { type: String },
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
