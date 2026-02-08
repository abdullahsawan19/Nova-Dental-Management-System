const express = require("express");
const doctorController = require("../controllers/doctor.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const upload = require("../config/multer.Config");

const router = express.Router();

router.get("/", doctorController.getAllDoctors);

router.get(
  "/me",
  authenticate,
  authorize("doctor"),
  doctorController.getDoctorProfile,
);

router.patch(
  "/me",
  authenticate,
  authorize("doctor"),
  upload.single("photo"),
  doctorController.updateDoctorProfile,
);

router.get("/:id", doctorController.getDoctorById);

module.exports = router;
