import stripe from "stripe";
import User from "../models/User.js";

export const createDonation = async (req, res) => {
  try {
    const { amount, authorId, paymentMethod } = req.body;
    if (!amount) {
      return res.status(401).json({ message: "Amount can not be empty" });
    }
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    let paymentIntent;
    if (paymentMethod === "credit_card") {
      paymentIntent = await stripe(
        process.env.STRIPE_SECRET_KEY
      ).paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });
    } else {
      return res.status(400).json({ message: "Invalid payment method" });
    }
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating donation", error: err.message });
  }
};
