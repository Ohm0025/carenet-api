import express from "express";
import { createDonation } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/donate", createDonation);

export default router;
