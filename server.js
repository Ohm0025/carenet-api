import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cron from "node-cron";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payment.js";
import { deleteUnverifiedUsers } from "./services/clearUser.js";
import morgan from "morgan";

dotenv.config();

//task run every day
cron.schedule("0 0 * * *", () => {
  console.log("Running task to delete unverified users");
  deleteUnverifiedUsers();
});

// ... rest of your server setup

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api/ip", (req, res) => {
  const ip = req.ip;
  res.json({ ip });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "sth went wrong", error: err.message });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log("Server running on port ", port);
});
