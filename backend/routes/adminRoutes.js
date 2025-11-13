import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/add-dummy", async (req, res) => {
  try {
    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Super Admin",
      email: "admin@jietjodhpur.ac.in",
      password: hashed,
    });

    res.status(201).json({ message: "Admin added ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add admin" });
  }
});

export default router;
