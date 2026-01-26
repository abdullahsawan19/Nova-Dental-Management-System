const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Appointment must belong to a patient"],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: [true, "Appointment must belong to a doctor"],
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: [true, "Please select a service"],
    },
    date: {
      type: Date,
      required: [true, "Please select a date"],
    },
    timeSlot: {
      type: String,
      required: [true, "Please select a time slot"],
    },
    price: {
      type: Number,
      required: [true, "Appointment price is required"],
    },
    status: {
      type: String,
      enum: ["pending_payment", "confirmed", "cancelled", "completed"],
      default: "pending_payment",
    },
    paymentIntentId: { type: String },
  },
  { timestamps: true },
);

appointmentSchema.index(
  { doctor: 1, date: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $ne: "cancelled" } },
  },
);
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
