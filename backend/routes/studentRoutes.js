import bcrypt from "bcryptjs";
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.post("/add-dummy", async (req, res) => {
  try {
    const hashed1 = await bcrypt.hash("student123", 10);
    const hashed2 = await bcrypt.hash("student123", 10);

    await Student.insertMany([
      {
        name: "Riya Sharma",
        email: "riya.sharma@jietjodhpur.ac.in",
        contact: "9876543210",
        registrationNo: "22CS1001",
        rollNo: "CS202201",
        batch: "2022-26",
        section: "A",
        year: 3,
        department: "Computer Science",
        password: hashed1,
      },
      {
        name: "Aryan Mehta",
        email: "aryan.mehta@jietjodhpur.ac.in",
        contact: "9812345678",
        registrationNo: "22CS1002",
        rollNo: "CS202202",
        batch: "2022-26",
        section: "B",
        year: 3,
        department: "Computer Science",
        password: hashed2,
      },
    ]);

    res.status(201).json({ message: "Dummy students added ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add dummy data" });
  }
});

export default router;
