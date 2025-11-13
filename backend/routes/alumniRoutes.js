import express from "express";
import bcrypt from "bcryptjs";
import Alumni from "../models/Alumni.js";

const router = express.Router();

router.post("/add-dummy", async (req, res) => {
  try {
    const hashed1 = await bcrypt.hash("alumni123", 10);
    const hashed2 = await bcrypt.hash("legacy123", 10);

    await Alumni.insertMany([
      {
        name: "Sakshi Verma",
        email: "sakshi.verma@jietjodhpur.ac.in",
        contact: "9998877766",
        graduationYear: "2018",
        department: "Information Technology",
        currentPosition: "Software Engineer",
        company: "TCS",
        location: "Pune",
        password: hashed1,
      },
      {
        name: "Karan Joshi",
        email: "karan.joshi@jietjodhpur.ac.in",
        contact: "8887766655",
        graduationYear: "2019",
        department: "Mechanical",
        currentPosition: "Project Manager",
        company: "L&T",
        location: "Jaipur",
        password: hashed2,
      },
    ]);

    res.status(201).json({ message: "Dummy alumni added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add dummy alumni" });
  }
});

export default router;
