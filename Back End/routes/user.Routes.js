const express = require("express");
const userController = require("../controllers/user.Controller"); // تأكد من الاسم
const authController = require("../controllers/Auth.controller"); // تأكد من الاسم
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

// 1. Signup (Public)
// دلوقتي دي هترجع التوكنز علطول
router.post("/signup", userController.createUser("patient"));

// 2. Login (Public)
router.post("/login", authController.login);

// --- PROTECTED ROUTES ---
router.use(authenticate);

// 3. User Profile
router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);

// --- ADMIN ROUTES ---
router.use(authorize("admin"));

// 4. User Management
router.get("/", userController.getAllUsers); 
router.post("/doctor", userController.createDoctor);
router.patch("/deactivate/:id", userController.deactivateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;