import User from "../models/User.js";
import Post from "../models/Post.js";
import Subscription from "../models/Subscription.js";

export const getUserPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Authentication required" });
    }
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching user posts", error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments({ author: req.user._id });
    const totalLikes = await Post.aggregate([
      { $match: { author: req.user._id } },
      { $group: { _id: null, totalLikes: { $sum: { $size: "$likes" } } } },
    ]);
    const totalSubscribers = await Subscription.countDocuments({
      subscribedTo: req.user._id,
    });
    res.status(200).json({
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
