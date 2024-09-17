import User from "../models/User.js";

export const deleteUnverifiedUsers = async function () {
  const twoDays = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: twoDays },
    });
    console.log(`Deleted ${result.deletedCount} unverified users`);
  } catch (error) {
    console.error("Error deleting unverified users:", error);
  }
};
