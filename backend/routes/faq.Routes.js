const express = require("express");
const faqController = require("../controllers/faq.Controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// --- Public Routes  ---
router.get("/", faqController.getPublicFaqs);
router.get("/:id", faqController.getFaqById);

// --- Admin Only Routes ---
router.use(authenticate, authorize("admin"));

router.get("/admin/all", faqController.getAdminFaqs);

router.post("/", faqController.createFaq);
router.patch("/:id", faqController.updateFaq);
router.delete("/:id", faqController.deleteFaq);

module.exports = router;
