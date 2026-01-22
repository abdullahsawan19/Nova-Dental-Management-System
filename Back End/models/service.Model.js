const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true, unique: true },
      ar: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: {
      type: String,
      default: "default-service.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
