import express from "express";
import {
  getUserPosts,
  getUserStats,
  subscribeToUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/posts", authMiddleware, getUserPosts);
router.get("/stats", authMiddleware, getUserStats);
router.post("/subscribe/:userId", authMiddleware, subscribeToUser);

export default router;
