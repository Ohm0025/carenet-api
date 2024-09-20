import User from "../models/User.js";
import Post from "../models/Post.js";
import Subscription from "../models/Subscription.js";
import sharp from "sharp";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

export const getUserPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Authentication required" });
    }
    const posts = await Post.find({ author: req.user._id }).populate(
      "author",
      "username"
    );
    res.json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching user posts", error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Authentication required" });
    }
    const user = await User.find({ _id: req.user.id }).populate([
      "username",
      "avatarUrl",
    ]);
    const totalPosts = await Post.countDocuments({ author: req.user._id });
    const totalLikes = await Post.aggregate([
      { $match: { author: req.user._id } },
      { $group: { _id: null, totalLikes: { $sum: { $size: "$likes" } } } },
    ]);
    const totalSubscribers = await Subscription.countDocuments({
      subscribedTo: req.user._id,
    });
    res.status(200).json({
      user,
      totalPosts,
      totalLikes: totalLikes[0]?.totalLikes || 0,
      totalSubscribers,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching user stats", error: err.message });
  }
};

export const subscribeToUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user to subscribe to exists
    const userToSubscribe = await User.findById(userId);
    if (!userToSubscribe) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent users from subscribing to themselves
    if (userId === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot subscribe to yourself" });
    }

    // Check if a subscription already exists
    const existingSubscription = await Subscription.findOne({
      subscriber: req.user._id,
      subscribedTo: userId,
    });

    if (existingSubscription) {
      // Unsubscribe
      await Subscription.findByIdAndDelete(existingSubscription._id);
      return res.json({
        message: "Successfully unsubscribed",
        subscribed: false,
      });
    } else {
      // Subscribe
      const newSubscription = new Subscription({
        subscriber: req.user._id,
        subscribedTo: userId,
      });
      await newSubscription.save();
      return res.json({ message: "Successfully subscribed", subscribed: true });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error managing subscription", error: error.message });
  }
};

export const updateUserPicture = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filename = `${uuidv4()}.webp`;
    const filepath = path.join(__dirname, "public", "uploads", filename);
    await sharp(req.file.buffer)
      .resize(300, 300)
      .webp({ quality: 80 })
      .toFile(filepath);

    // Update user's avatarUrl in the database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: `/uploads/${filename}` },
      { new: true }
    );

    // If there's an old avatar, delete it
    if (user.avatarUrl) {
      const oldFilepath = path.join(__dirname, "public", user.avatarUrl);
      await fs
        .unlink(oldFilepath)
        .catch((err) => console.error("Error deleting old avatar:", err));
    }

    res.status(401).json({ avatarUrl: user.avatarUrl });
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    res.status(500).json({ message: "Error uploading profile picture" });
  }
};
