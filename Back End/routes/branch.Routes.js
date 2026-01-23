const express = require("express");
const branchController = require("../controllers/branch.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// --- PUBLIC ---
router.get("/active", branchController.getActiveBranch);

// --- ADMIN ONLY ---
router.use(authenticate);
router.use(authorize("admin"));

router.get("/", branchController.getAllBranches);

router.post("/", branchController.createBranch);
router.patch("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

module.exports = router;
