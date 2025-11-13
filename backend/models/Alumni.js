import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@jietjodhpur\.ac\.in$/,
  },
  contact: { type: String, required: true },
  graduationYear: { type: String, required: true },
  department: { type: String, required: true },
  currentPosition: { type: String },
  company: { type: String },
  location: { type: String },
  password: { type: String, required: true }, // ✅ hashed password
  role: { type: String, default: "alumni" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Alumni", alumniSchema);
