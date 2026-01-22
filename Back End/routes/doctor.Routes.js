const express = require("express");
const doctorController = require("../controllers/doctor.controller");
const authController = require("../controllers/Auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const upload = require("../config/multer.Config");

const router = express.Router();

router.get("/", doctorController.getAllDoctors);

router.use(authenticate);
router.use(authorize("doctor"));

router.get("/me", doctorController.getDoctorProfile);

router.patch(
  "/me",
  upload.single("photo"),
  doctorController.updateDoctorProfile,
);

module.exports = router;
