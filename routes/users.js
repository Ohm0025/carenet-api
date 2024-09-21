import express from "express";
import multer from "multer";
import {
  getUserPosts,
  getUserStats,
  subscribeToUser,
  updateUserPicture,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

router.get("/posts", authMiddleware, getUserPosts);
router.get("/stats", authMiddleware, getUserStats);
router.post("/subscribe/:userId", authMiddleware, subscribeToUser);
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("profilePicture"),
  updateUserPicture
);

export default router;
