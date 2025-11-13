// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String },
    email: { type: String, required: true, unique: true },
    rollNumber: { type: String },
    graduationYear: { type: Number },
    department: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["alumni", "student", "teacher"],
      default: "alumni",
    },
    isVerified: { type: Boolean, default: false }, // For future college DB verification
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
