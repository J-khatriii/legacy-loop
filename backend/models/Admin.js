import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@jietjodhpur\.ac\.in$/,
  },
  password: { type: String, required: true }, // ✅ hashed password
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Admin", adminSchema);
