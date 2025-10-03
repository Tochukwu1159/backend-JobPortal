import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["candidate", "recruiter"], required: true },
  profile: {
    name: String,
    skills: [String],
    resume: String,
    portfolioLinks: [String],
    experience: Number,
    location: String,
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
