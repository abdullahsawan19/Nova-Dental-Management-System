const Appointment = require("../models/appointment.Model");
const Branch = require("../models/branch.Model");
const Doctor = require("../models/doctor.Model");
const Service = require("../models/service.Model");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const User = require("../models/user.Model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

exports.getWorkingDays = catchAsync(async (req, res, next) => {
  const days = await getNextWorkingDays();
  const formattedDays = days.map((d) => d.toISOString().split("T")[0]);
  res.status(200).json({ status: "success", data: { days: formattedDays } });
});

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

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { doctor, service, date, timeSlot } = req.body;

  const selectedDate = getStartOfDay(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return next(new AppError("Cannot book appointments in the past!", 400));
  }

  const doctorDoc = await Doctor.findById(doctor).populate("user");
  if (!doctorDoc) return next(new AppError("Doctor not found", 404));

  const serviceDoc = await Service.findById(service);
  if (!serviceDoc) return next(new AppError("Service not found", 404));

  if (!serviceDoc._id.equals(doctorDoc.specialization)) {
    return next(new AppError("This doctor does not perform this service", 400));
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
    return next(
      new AppError("Slot already booked! Please choose another time.", 400),
    );
  }

  const realPrice = serviceDoc.fees;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.ALLOWED_ORIGINS}/payment-success`,
    cancel_url: `${process.env.ALLOWED_ORIGINS}/branch`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,

    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: `${serviceDoc.name} Session`,
            description: `Doctor: ${doctorDoc.user.name} | Date: ${date} | Time: ${timeSlot}`,
          },
          unit_amount: realPrice * 100,
        },
        quantity: 1,
      },
    ],

    metadata: {
      patientId: req.user.id,
      doctorId: doctor,
      serviceId: service,
      date: date,
      timeSlot: timeSlot,
      price: realPrice,
    },
  });

  res.status(200).json({
    status: "success",
    sessionUrl: session.url,
  });
});

const createBookingCheckout = async (session) => {
  const { doctorId, serviceId, date, timeSlot, price, patientId } =
    session.metadata;

  await Appointment.create({
    patient: patientId,
    doctor: doctorId,
    service: serviceId,
    date: date,
    timeSlot: timeSlot,
    price: price,
    status: "confirmed",
    paymentIntentId: session.payment_intent,
  });

  const patient = await User.findById(patientId);
  if (patient) {
    const message = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title>Payment Receipt</title>
  <style>
    /* Reset Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; }

    /* Custom Styles */
    .email-container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .header { background-color: #2c3e50; padding: 30px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 500; letter-spacing: 1px; }
    .success-icon { font-size: 40px; margin-bottom: 10px; display: block; }
    
    .content { padding: 30px 25px; color: #333333; }
    .greeting { font-size: 18px; margin-bottom: 20px; color: #2c3e50; }
    
    .receipt-box { 
      background-color: #f8f9fa; 
      border: 1px solid #e9ecef; 
      border-radius: 8px; 
      padding: 20px; 
      margin: 25px 0; 
    }
    
    .receipt-row td { padding: 10px 0; border-bottom: 1px solid #eee; }
    .label { color: #7f8c8d; font-size: 14px; width: 40%; }
    .value { font-weight: 600; color: #2c3e50; font-size: 14px; text-align: right; width: 60%; }
    
    .total-label { padding: 15px 0 5px; font-size: 16px; font-weight: bold; color: #2c3e50; }
    .total-value { padding: 15px 0 5px; text-align: right; font-size: 22px; font-weight: bold; color: #27ae60; }
    
    .footer { background-color: #f4f7f6; padding: 20px; text-align: center; font-size: 12px; color: #95a5a6; border-top: 1px solid #eee; }

    /* Mobile Responsive Styles */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
      .content { padding: 20px !important; }
      .header h1 { font-size: 20px !important; }
      .receipt-box { padding: 15px !important; }
      .label { font-size: 13px !important; }
      .value { font-size: 13px !important; }
    }
  </style>
</head>
<body>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="background-color: #f4f7f6; padding: 20px 0;">
        
        <div class="email-container">
          
          <div class="header">
            <span class="success-icon">✅</span>
            <h1>Payment Successful</h1>
            <p style="color: #bdc3c7; margin: 5px 0 0; font-size: 14px;">Your appointment is confirmed</p>
          </div>

          <div class="content">
            <p class="greeting">Hi <strong>${patient.name}</strong>,</p>
            <p style="line-height: 1.6; color: #555;">
              Thank you for choosing our clinic. We have successfully received your payment. Below is your official receipt and appointment details.
            </p>

            <div class="receipt-box">
              <table style="width: 100%; border-collapse: collapse;">
                <tr class="receipt-row">
                  <td class="label">Service</td>
                  <td class="value">Dental Consultation</td>
                </tr>
                <tr class="receipt-row">
                  <td class="label">Date</td>
                  <td class="value">${new Date(date).toDateString()}</td>
                </tr>
                <tr class="receipt-row">
                  <td class="label">Time</td>
                  <td class="value">${timeSlot}</td>
                </tr>
                <tr class="receipt-row">
                  <td class="label">Reference ID</td>
                  <td class="value" style="font-size: 12px; word-break: break-all;">${session.payment_intent}</td>
                </tr>
                <tr>
                  <td class="total-label">Amount Paid</td>
                  <td class="total-value">${price} EGP</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center;">
              <p style="color: #7f8c8d; font-size: 13px; margin-top: 20px;">
                Please arrive <strong>10 minutes early</strong> before your scheduled time.
              </p>
            </div>
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Dental Clinic System. All rights reserved.</p>
            <p>Need help? Contact us at <a href="mailto:support@clinic.com" style="color: #2c3e50; text-decoration: none;">support@clinic.com</a></p>
          </div>

        </div>

      </td>
    </tr>
  </table>

</body>
</html>
`;
    try {
      await sendEmail({
        email: patient.email,
        subject: "Payment Receipt - Appointment Confirmed",
        message,
      });
    } catch (err) {
      console.log("Email sending failed:", err);
    }
  }
};

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await createBookingCheckout(session);
  }

  res.status(200).json({ received: true });
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const { date, timeSlot } = req.body;
  const appointmentId = req.params.id;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    patient: req.user.id,
  });

  if (!appointment) return next(new AppError("Appointment not found", 404));

  if (
    appointment.status === "cancelled" ||
    appointment.status === "completed"
  ) {
    return next(
      new AppError("Cannot update cancelled or completed appointments", 400),
    );
  }

  const updates = {};
  let emailMessage = "";

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
        new AppError("Invalid time slot or outside working hours.", 400),
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
  ).populate("service", "name");

  try {
    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #e67e22;">Appointment Rescheduled </h2>
        <p>Hello <strong>${req.user.name}</strong>,</p>
        <p>Your appointment has been successfully updated.</p>
        <p><strong>New Date:</strong> ${new Date(updatedAppointment.date).toDateString()}</p>
        <p><strong>New Time:</strong> ${updatedAppointment.timeSlot}</p>
        <p style="color: #7f8c8d; font-size: 13px; margin-top: 20px;">
                Please arrive <strong>10 minutes early</strong> before your scheduled time.
        </p></div>
    `;

    await sendEmail({
      email: req.user.email,
      subject: "Appointment Rescheduled - Dental Clinic",
      message: message,
    });
  } catch (err) {
    console.log("Reschedule email failed:", err);
  }

  res
    .status(200)
    .json({ status: "success", data: { appointment: updatedAppointment } });
});

exports.cancelAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, patient: req.user.id },
    { status: "cancelled" },
    { new: true },
  );

  if (!appointment)
    return next(new AppError("No appointment found or not authorized", 404));

  try {
    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #c0392b;">Appointment Cancelled ❌</h2>
        <p>Hello <strong>${req.user.name}</strong>,</p>
        <p>Your appointment scheduled for <strong>${new Date(appointment.date).toDateString()}</strong> at <strong>${appointment.timeSlot}</strong> has been cancelled.</p>
        <p>If this was a mistake, please book a new appointment.</p>
      </div>
    `;

    await sendEmail({
      email: req.user.email,
      subject: "Appointment Cancelled",
      message: message,
    });
  } catch (err) {
    console.log("Cancel email failed:", err);
  }

  res.status(200).json({
    status: "success",
    message: "Appointment cancelled",
    data: { appointment },
  });
});

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

exports.adminUpdateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!["cancelled", "completed"].includes(status)) {
    return next(
      new AppError("Status must be either 'cancelled' or 'completed'", 400),
    );
  }

  const appointment = await Appointment.findById(req.params.id).populate(
    "patient",
  );

  if (!appointment) {
    return next(new AppError("No appointment found with that ID", 404));
  }

  if (appointment.status === "cancelled") {
    return next(new AppError("Cannot modify a cancelled appointment.", 400));
  }

  appointment.status = status;
  await appointment.save();

  if (appointment.patient) {
    try {
      let subject = "";
      let message = "";

      if (status === "cancelled") {
        subject = "Appointment Cancelled by Admin";
        message = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #c0392b;">Appointment Cancelled ❌</h2>
            <p>Hello <strong>${appointment.patient.name}</strong>,</p>
            <p>We regret to inform you that your appointment scheduled for <strong>${new Date(appointment.date).toDateString()}</strong> at <strong>${appointment.timeSlot}</strong> has been cancelled by the administration.</p>
            <p>Please contact us for more details.</p>
          </div>
        `;
      } else if (status === "completed") {
        subject = "Visit Completed - Thank You";
        message = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #27ae60;">Visit Completed ✅</h2>
            <p>Hello <strong>${appointment.patient.name}</strong>,</p>
            <p>Your appointment has been marked as completed.</p>
            <p>Thank you for choosing our clinic!</p>
          </div>
        `;
      }

      await sendEmail({
        email: appointment.patient.email,
        subject: subject,
        message: message,
      });
    } catch (err) {
      console.log("Admin email failed:", err);
    }
  }

  res.status(200).json({
    status: "success",
    message: `Appointment marked as ${status}`,
    data: { appointment },
  });
});

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
  ).populate("patient");

  if (!appointment) {
    return next(
      new AppError(
        "Appointment not found, not yours, or not in 'confirmed' status",
        404,
      ),
    );
  }

  if (appointment.patient) {
    try {
      const message = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #27ae60;">Visit Completed ✅</h2>
          <p>Hello <strong>${appointment.patient.name}</strong>,</p>
          <p>Thank you for visiting us today. We hope you had a great experience.</p>
          <p>We wish you a speedy recovery!</p>
          <p style="margin-top: 20px; color: #7f8c8d; font-size: 12px;">Dental Clinic Team</p>
        </div>
      `;

      await sendEmail({
        email: appointment.patient.email,
        subject: "Visit Completed - Thank You",
        message,
      });
    } catch (err) {
      console.log("Doctor completion email failed:", err);
    }
  }

  res.status(200).json({
    status: "success",
    message: `Appointment marked as ${status}`,
    data: { appointment },
  });
});
