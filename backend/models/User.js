import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "alumni", "admin", "faculty"],
      default: "student",
    },

    rollNumber: { type: String },
    graduationYear: { type: Number }, 
    department: { type: String },

    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" }, 

    social: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
