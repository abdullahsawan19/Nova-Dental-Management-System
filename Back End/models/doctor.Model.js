const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
  },
  experinecYrears: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },



});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
