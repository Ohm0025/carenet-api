import Post from "../models/Post.js";
import Subscription from "../models/Subscription.js";

export const getPosts = async (req, res) => {
  try {
    let query = { isPublic: true };
    let subscribedAuthors = [];

    // Check if user is authenticated
    if (req.user) {
      // Get the list of authors the user is subscribed to
      const subscriptions = await Subscription.find({
        subscriber: req.user._id,
      });
      subscribedAuthors = subscriptions.map((sub) => sub.subscribedTo);

      // Modify the query to include private posts from subscribed authors
      query = {
        $or: [
          { isPublic: true },
          { author: { $in: subscribedAuthors }, isPublic: false },
          { author: req.user._id }, // Include all of the user's own posts
        ],
      };
    }

    const posts = await Post.find(query)
      .populate("author", "username")
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .limit(50); // Limit to 50 posts for pagination

    // Add a field to indicate if the post is from a subscribed author
    const postsWithSubscriptionInfo = posts.map((post) => ({
      ...post.toObject(),
      isSubscribed: subscribedAuthors.some((authorId) =>
        authorId.equals(post.author._id)
      ),
      isOwnPost: req.user ? post.author._id.equals(req.user._id) : false,
    }));

    res.status(200).json(postsWithSubscriptionInfo);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", [
      "username",
      "bio",
      "avatarUrl",
    ]);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If the post is public, anyone can view it
    if (post.isPublic) {
      return res.json(post);
    }

    // If the post is private, we need to check permissions
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "This is a private post. Please log in to view." });
    }

    // Check if the requester is the author of the post
    if (post.author._id.equals(req.user._id)) {
      return res.json(post);
    }

    // Check if the requester is a subscriber of the author
    const subscription = await Subscription.findOne({
      subscriber: req.user._id,
      subscribedTo: post.author._id,
    });

    if (subscription) {
      return res.json(post);
    }

    // If none of the above conditions are met, deny access
    res.status(403).json({
      message: "You do not have permission to view this private post.",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching post", error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Authentication required" });
    }
    const { title, content, isPublic } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user._id,
      isPublic,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating post", error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to like a post" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If the post is private, check permissions
    if (!post.isPublic) {
      // Check if the user is the author
      if (!post.author.equals(req.user._id)) {
        // If not the author, check if the user is a subscriber
        const subscription = await Subscription.findOne({
          subscriber: req.user._id,
          subscribedTo: post.author,
        });

        if (!subscription) {
          return res.status(403).json({
            message:
              "You must be subscribed to the author to like this private post",
          });
        }
      }
    }

    // Check if the user has already liked the post
    const likeIndex = post.likes.indexOf(req.user._id);

    if (likeIndex === -1) {
      // User hasn't liked the post, so add the like
      post.likes.push(req.user._id);
    } else {
      // User has already liked the post, so remove the like
      post.likes.splice(likeIndex, 1);
    }

    await post.save();

    res.json({
      message:
        likeIndex === -1
          ? "Post liked successfully"
          : "Post unliked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error liking/unliking post", error: error.message });
  }
};

export const ratePost = async (req, res) => {
  try {
    const { rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to rate a post" });
    }

    // If the post is private, check permissions
    if (!post.isPublic) {
      // Check if the user is the author
      if (!post.author.equals(req.user._id)) {
        // If not the author, check if the user is a subscriber
        const subscription = await Subscription.findOne({
          subscriber: req.user._id,
          subscribedTo: post.author,
        });

        if (!subscription) {
          return res.status(403).json({
            message:
              "You must be subscribed to the author to rate this private post",
          });
        }
      }
    }

    // Check if the user has already rated the post
    const existingRatingIndex = post.ratingArr.findIndex((r) =>
      r.user?.equals(req.user._id)
    );

    if (existingRatingIndex !== -1) {
      // Update existing rating
      post.ratingArr[existingRatingIndex].value = rating;
    } else {
      // Add new rating
      post.ratingArr.push({ user: req.user._id, value: rating });
    }

    // Calculate new average rating
    const totalRating = post.ratingArr.reduce((sum, r) => sum + r.value, 0);
    post.ratingCount = totalRating / post.ratingArr.length;

    await post.save();

    res.json({
      message: "Post rated successfully",
      averageRating: post.averageRating,
      totalRatings: post.ratingArr.length,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error rating post", error: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublic } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });
    }

    post.title = title;
    post.content = content;
    post.isPublic = isPublic;
    post.updatedAt = Date.now();

    await post.save();

    res.json(post);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating post", error: error.message });
  }
};
