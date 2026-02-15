const express = require("express");
const appointmentController = require("../controllers/appointment.Controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// ========================
// 1. PUBLIC ROUTES
// ========================
router.get("/working-days", appointmentController.getWorkingDays);
router.get("/available-slots", appointmentController.getAvailableSlots);

router.use(authenticate);

// ========================
// 2. PATIENT ROUTES
// ========================
router.get(
  "/my-appointments",
  authorize("patient"),
  appointmentController.getPatientAppointments,
);
router.patch(
  "/:id",
  authorize("patient"),
  appointmentController.updateAppointment,
);
router.patch(
  "/cancel/:id",
  authorize("patient"),
  appointmentController.cancelAppointment,
);
router.post(
  "/checkout-session",
  authorize("patient"),
  appointmentController.getCheckoutSession,
);

// ========================
// 3. DOCTOR ROUTES
// ========================
router.get(
  "/doctor/me",
  authorize("doctor"),
  appointmentController.getDoctorAppointments,
);
router.patch(
  "/doctor/appointments/:id/status",
  authorize("doctor"),
  appointmentController.doctorUpdateStatus,
);

// ========================
// 4. ADMIN ROUTES
// ========================
router.get("/", authorize("admin"), appointmentController.getAllAppointments);

router.get("/confirmed", appointmentController.getAdminConfirmedAppointments);

router.patch("/:id/status", appointmentController.adminUpdateStatus);

module.exports = router;
