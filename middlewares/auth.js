import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async (req, res, next) => {
  try {
    const token = req.cookies["carenet-token"];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};
// return res.status(401).json({ message: "Authentication required" });
