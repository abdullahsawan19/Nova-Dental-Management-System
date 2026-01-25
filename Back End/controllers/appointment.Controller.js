const Appointment = require("../models/appointment.Model");
const Branch = require("../models/branch.Model");
const Doctor = require("../models/doctor.Model");
const Service = require("../models/service.Model");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// ============================================================
// 1. Helper Functions
// ============================================================

const getStartOfDay = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getNextWorkingDays = async () => {
  const branch = await Branch.findOne({ isActive: true });
  if (!branch) throw new AppError("No active branch found", 500);

  const allowedDays = branch.workingDays;
  const dates = [];
  let currentDate = new Date();
  let count = 0;

  while (count < 5) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();

    if (allowedDays.includes(dayOfWeek)) {
      dates.push(new Date(currentDate));
      count++;
    }
  }
  return dates;
};

const formatTime12H = (time24) => {
  if (!time24) throw new Error("Time data is missing!");

  const [hours, minutes] = time24.split(":");
  let h = parseInt(hours, 10);

  const suffix = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12;
  const strH = h < 10 ? `0${h}` : h;
  return `${strH}:${minutes} ${suffix}`;
};

// ============================================================
// 2. Public & Booking Controllers
// ============================================================

// 1️⃣ Get Working Days
exports.getWorkingDays = catchAsync(async (req, res, next) => {
  const days = await getNextWorkingDays();
  const formattedDays = days.map((d) => d.toISOString().split("T")[0]);
  res.status(200).json({ status: "success", data: { days: formattedDays } });
});

// 2️⃣ Get Available Slots (Fixed Variable Names)
exports.getAvailableSlots = catchAsync(async (req, res, next) => {
  const { date, doctorId } = req.query;
  if (!date || !doctorId)
    return next(new AppError("Missing date or doctorId", 400));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requestedDate = new Date(date);

  if (requestedDate < today) {
    return next(new AppError("Cannot check slots for past dates", 400));
  }

  const branch = await Branch.findOne({ isActive: true });
  if (!branch) return next(new AppError("No active branch", 500));

  const dayOfWeek = requestedDate.getDay();
  if (!branch.workingDays.includes(dayOfWeek)) {
    return next(new AppError("Clinic is closed on this day", 400));
  }

  const startHour = parseInt(branch.openTime.split(":")[0]);
  const endHour = parseInt(branch.closeTime.split(":")[0]);

  let allSlots = [];
  for (let i = startHour; i < endHour; i++) {
    const startObj = i < 10 ? `0${i}:00` : `${i}:00`;
    const endObj = i + 1 < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
    allSlots.push(`${startObj} - ${endObj}`);
  }

  if (requestedDate.getTime() === today.getTime()) {
    const currentHour = new Date().getHours();
    allSlots = allSlots.filter((slot) => {
      const slotStartHour = parseInt(slot.split(":")[0]);
      return slotStartHour > currentHour;
    });
  }

  let availableSlots = allSlots.map((slot) => {
    const [start, end] = slot.split(" - ");
    return `${formatTime12H(start)} - ${formatTime12H(end)}`;
  });

  const startOfDay = getStartOfDay(date);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: "cancelled" },
  }).select("timeSlot");

  const bookedSlots = bookedAppointments.map((app) => app.timeSlot);

  availableSlots = availableSlots.filter((slot) => !bookedSlots.includes(slot));

  res.status(200).json({
    status: "success",
    results: availableSlots.length,
    data: { slots: availableSlots },
  });
});

// 3 Create Appointment
exports.createAppointment = catchAsync(async (req, res, next) => {
  const patientId = req.user.id;

  const { doctor, service, date, timeSlot, price } = req.body;

  const selectedDate = getStartOfDay(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return next(new AppError("Cannot book appointments in the past!", 400));
  }

  const doctorDoc = await Doctor.findById(doctor);
  if (!doctorDoc) return next(new AppError("Doctor not found", 404));

  const serviceDoc = await Service.findById(service);
  if (!serviceDoc) return next(new AppError("Service not found", 404));

  if (!serviceDoc._id.equals(doctorDoc.specialization)) {
    return next(new AppError("This doctor does not perform this service", 400));
  }

  if (price !== serviceDoc.fees) {
    return next(new AppError("Price mismatch. Please refresh.", 400));
  }

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const existingBooking = await Appointment.findOne({
    doctor: doctor,
    date: { $gte: selectedDate, $lte: endOfDay },
    timeSlot: timeSlot,
    status: { $ne: "cancelled" },
  });

  if (existingBooking) {
    return next(new AppError("Slot already booked! Please refresh.", 400));
  }

  const newAppointment = await Appointment.create({
    patient: patientId,
    doctor,
    service,
    date: selectedDate,
    timeSlot,
    price,
    status: "confirmed",
  });

  res
    .status(201)
    .json({ status: "success", data: { appointment: newAppointment } });
});

// ============================================================
// 3. Patient Actions
// ============================================================

// 4️⃣ Cancel Appointment
exports.cancelAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, patient: req.user.id },
    { status: "cancelled" },
    { new: true },
  );

  if (!appointment)
    return next(new AppError("No appointment found or not authorized", 404));

  res.status(200).json({
    status: "success",
    message: "Appointment cancelled",
    data: { appointment },
  });
});

// 5️⃣ Update Appointment
exports.updateAppointment = catchAsync(async (req, res, next) => {
  const { date, timeSlot } = req.body;
  const appointmentId = req.params.id;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    patient: req.user.id,
  });

  if (!appointment) return next(new AppError("Appointment not found", 404));

  const updates = {};

  if (date || timeSlot) {
    const newDate = date ? getStartOfDay(date) : appointment.date;
    const newSlot = timeSlot || appointment.timeSlot;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate < today) {
      return next(new AppError("Cannot reschedule to the past", 400));
    }

    const branch = await Branch.findOne({ isActive: true });
    const startHour = parseInt(branch.openTime.split(":")[0]);
    const endHour = parseInt(branch.closeTime.split(":")[0]);

    const validSlots = [];
    for (let i = startHour; i < endHour; i++) {
      const startObj = i < 10 ? `0${i}:00` : `${i}:00`;
      const endObj = i + 1 < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
      validSlots.push(`${formatTime12H(startObj)} - ${formatTime12H(endObj)}`);
    }

    if (!validSlots.includes(newSlot)) {
      return next(
        new AppError(
          "Invalid time slot provided or outside working hours.",
          400,
        ),
      );
    }

    const endOfDay = new Date(newDate);
    endOfDay.setHours(23, 59, 59, 999);

    const isBooked = await Appointment.findOne({
      doctor: appointment.doctor,
      date: { $gte: newDate, $lte: endOfDay },
      timeSlot: newSlot,
      status: { $ne: "cancelled" },
      _id: { $ne: appointmentId },
    });

    if (isBooked) {
      return next(new AppError("New slot is already booked", 400));
    }

    if (date) updates.date = newDate;
    if (timeSlot) updates.timeSlot = newSlot;
  }

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    updates,
    { new: true },
  );

  res
    .status(200)
    .json({ status: "success", data: { appointment: updatedAppointment } });
});

// 6 Get Patient Appointments
exports.getPatientAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({
    patient: req.user.id,
    status: { $ne: "cancelled" },
  })
    .populate({
      path: "doctor",
      select: "user",
      populate: { path: "user", select: "name" },
    })
    .populate("service", "name fees")
    .sort("-date");

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

// ============================================================
// 4. Doctor & Admin Views
// ============================================================

// 7 Get Doctor Appointments (Confirmed Only)
exports.getDoctorAppointments = catchAsync(async (req, res, next) => {
  const doctorDoc = await Doctor.findOne({ user: req.user.id });
  if (!doctorDoc) return next(new AppError("Doctor profile not found", 404));

  const appointments = await Appointment.find({
    doctor: doctorDoc._id,
    status: "confirmed",
  })
    .populate("patient", "name phone email")
    .sort("date timeSlot");

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

// 8 Get All Appointments
exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Appointment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  features.query = features.query
    .populate({
      path: "doctor",
      select: "user",
      populate: { path: "user", select: "name" },
    })
    .populate("patient", "name")
    .populate("service", "name");
  const appointments = await features.query;

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

// 9 Admin: Get All Confirmed Appointments (Active Worklist)
exports.getAdminConfirmedAppointments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Appointment.find({ status: "confirmed" }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  features.query = features.query
    .populate("patient", "name phone email")
    .populate({
      path: "doctor",
      select: "user",
      populate: { path: "user", select: "name" },
    })
    .populate("service", "name");

  const appointments = await features.query;

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

// 10 Admin: Change Appointment Status (Cancel or Complete)
exports.adminUpdateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!["cancelled", "completed"].includes(status)) {
    return next(
      new AppError("Status must be either 'cancelled' or 'completed'", 400),
    );
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: status },
    { new: true, runValidators: true },
  );

  if (!appointment) {
    return next(new AppError("No appointment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: `Appointment marked as ${status}`,
    data: { appointment },
  });
});
// 11 Doctor: Mark Appointment as Completed
exports.doctorUpdateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (status !== "completed") {
    return next(
      new AppError("You can only mark appointments as 'completed'", 400),
    );
  }

  const doctorDoc = await Doctor.findOne({ user: req.user.id });
  if (!doctorDoc) return next(new AppError("Doctor profile not found", 404));

  const appointment = await Appointment.findOneAndUpdate(
    {
      _id: req.params.id,
      doctor: doctorDoc._id,
      status: "confirmed",
    },
    { status: status },
    { new: true, runValidators: true },
  );

  if (!appointment) {
    return next(
      new AppError(
        "Appointment not found, not yours, or not in 'confirmed' status",
        404,
      ),
    );
  }

  res.status(200).json({
    status: "success",
    message: `Appointment marked as ${status}`,
    data: { appointment },
  });
});
