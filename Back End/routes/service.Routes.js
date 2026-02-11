const express = require("express");
const serviceController = require("../controllers/service.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const upload = require("../config/multer.Config");

const router = express.Router();

// --- PUBLIC ROUTES ---
router.get("/", serviceController.getAllServicesPublic);
router.get("/:id", serviceController.getService);

// --- PROTECTED ROUTES (ADMIN ONLY) ---
router.use(authenticate);
router.use(authorize("admin"));

router.get("/admin/all", serviceController.getAllServicesAdmin);
router.post("/", upload.single("image"), serviceController.createService);
router.patch("/:id", upload.single("image"), serviceController.updateService);

module.exports = router;
