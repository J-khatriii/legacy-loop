import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
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

    // Only alumni allowed for signup
    if (role !== "alumni") {
      return res.status(403).json({ message: "Signup restricted to alumni only" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      fatherName,
      email,
      rollNumber,
      graduationYear,
      department,
      password: hashed,
      role: "alumni",
      isVerified: true,
    });

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
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user._doc;

    res.json({message: "Login successful", token, user: safeUser,});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signin error" });
  }
}
