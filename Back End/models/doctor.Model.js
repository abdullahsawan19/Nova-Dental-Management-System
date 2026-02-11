const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    photo: {
      type: String,
      default: "Doctor.jfif",
    },

    specialization: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
    },
    experienceYears: {
      type: Number,
    },
    education: {
      en: {
        type: String,
        trim: true,
      },
      ar: {
        type: String,
        trim: true,
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
