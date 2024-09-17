import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  likePost,
  ratePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.get("/:id", getPost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/rate", authMiddleware, ratePost);

export default router;