import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/verify-email/:token", verifyEmail);

export default router;
