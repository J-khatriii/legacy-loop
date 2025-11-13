import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@jietjodhpur\.ac\.in$/,
  },
  contact: { type: String, required: true },
  registrationNo: { type: String, required: true, unique: true },
  rollNo: { type: String, required: true, unique: true },
  batch: { type: String, required: true },
  section: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  profilePic: { type: String, default: "" },
  role: { type: String, default: "student" },

  // 🧠 New field for login
  password: { type: String, required: true, minlength: 6 },

  createdAt: { type: Date, default: Date.now },
});

// ✅ Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Method to compare password (for login)
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Student", studentSchema);
