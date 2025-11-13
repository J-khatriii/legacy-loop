// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // --- Signup Route ---
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = await User.create({ name, email, password: hashedPassword });

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({ token, user });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(500).json({ message: "Server error during signup" });
//   }
// });

// // --- Signin Route ---
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({ token, user });
//   } catch (err) {
//     console.error("Signin Error:", err);
//     res.status(500).json({ message: "Server error during signin" });
//   }
// });

// export default router;



import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// --- Signup Route ---
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      fatherName,
      email,
      rollNumber,
      graduationYear,
      department,
      password,
      role,
    } = req.body;

    // Only alumni can sign up for now
    if (role !== "alumni") {
      return res
        .status(403)
        .json({ message: "Signup restricted to alumni only" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new alumni record
    const user = await User.create({
      name,
      fatherName,
      email,
      rollNumber,
      graduationYear,
      department,
      password: hashedPassword,
      role: "alumni",
      isVerified: true, // For now — assume manual verification success
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        graduationYear: user.graduationYear,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// --- Signin Route ---
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email, password); // debug log

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordValid);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Server error during signin" });
  }
});

export default router;
