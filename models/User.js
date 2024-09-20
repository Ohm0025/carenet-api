import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required."],
    unique: true,
    validate: {
      validator: async function (username) {
        const user = await this.constructor.findOne({ username });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => `The username ${props.value} is already taken.`,
    },
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true,
    validate: [
      {
        validator: function (email) {
          // RFC 5322 compliant regex for email validation
          const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
      {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => `The email ${props.value} is already taken.`,
      },
    ],
  },
  password: {
    type: String,
    required: [true, "password is required."],
    validate: {
      validator: function (password) {
        if (!this.isVerified) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
        }
        return true;
      },
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  bio: String,
  avatarUrl: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  lastLoginIp: { type: String },
  pendingLoginIp: { type: String },
  pendingLoginToken: { type: String },
  pendingLoginTokenExpires: { type: Date },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
