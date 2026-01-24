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

router.get("/:id", doctorController.getDoctorById);

router.use(authenticate);
router.use(authorize("doctor"));

router.patch(
  "/me",
  upload.single("photo"),
  doctorController.updateDoctorProfile,
);

module.exports = router;
