const express = require("express");
const userController = require("../controllers/user.Controller");
const authController = require("../controllers/Auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// 1. Signup (Public)
router.post("/signup", userController.createUser("patient"));

// 2. Login (Public)
router.post("/login", authController.login);

// 3. Logout (Public)
router.post("/logout", authController.logout);

// 4. Refresh-token (Public)
router.get("/refresh-token", authController.refreshToken);
// --- PROTECTED ROUTES ---
router.use(authenticate);

// 5. User Profile
router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);

// --- ADMIN ROUTES ---
router.use(authorize("admin"));

// 6. User Management
router.get("/", userController.getAllUsers);
router.post("/doctor", userController.createDoctor);
router.patch("/deactivate/:id", userController.deactivateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
