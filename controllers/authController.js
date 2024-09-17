import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({
      username,
      email,
      password,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      message:
        "User registered. Please check your email to verify your account.",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date(Date.now()) },
    });
    console.log(new Date(user.verificationTokenExpires) > new Date(Date.now()));
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res
      .status(200)
      .json({ message: "Email verified successfully. You can log in now." });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Email verification failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in" });
    }

    if (user.lastLoginIp && user.lastLoginIp !== ip) {
      // IP is different, need verification
      const verificationToken = crypto.randomBytes(20).toString("hex");
      const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      user.pendingLoginIp = ip;
      user.pendingLoginToken = verificationToken;
      user.pendingLoginTokenExpires = tokenExpires;
      await user.save();

      // Send verification email
      await sendVerificationEmail(user.email, verificationToken);

      return res.status(401).json({
        message:
          "Login attempt from new IP. Please check your email for verification.",
      });
    }

    // IP is the same or it's the first login
    user.lastLoginIp = ip;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("carenet-token", token, { httpOnly: true });
    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("carenet-token");
  res.status(201).json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};
