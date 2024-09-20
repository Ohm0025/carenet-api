import express from "express";
import {
  getUserPosts,
  getUserStats,
  subscribeToUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { updateProfilePicture } from "../frontend/src/utils/api.js";

const router = express.Router();

router.get("/posts", authMiddleware, getUserPosts);
router.get("/stats", authMiddleware, getUserStats);
router.post("/subscribe/:userId", authMiddleware, subscribeToUser);
router.post(
  "/profile-picture",
  upload.single("profilePicture"),
  updateProfilePicture
);

export default router;
