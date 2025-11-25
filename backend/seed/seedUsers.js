import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/legacy-loop`);

    // await User.deleteMany();

    const password = await bcrypt.hash("password123", 10);

    const users = [
      {
        name: "Aayush Sharma",
        fatherName: "Rajesh Sharma",
        email: "aayush.22cs194@jietjodhpur.ac.in",
        role: "student",
        rollNumber: "CS194",
        department: "CSE",
        graduationYear: 2024,
        password,
        bio: "CSE student passionate about coding",
        location: "Jodhpur",
      },
      {
        name: "Riya Mehta",
        fatherName: "Sanjay Mehta",
        email: "riya.22it101@jietjodhpur.ac.in",
        role: "student",
        rollNumber: "IT101",
        department: "IT",
        graduationYear: 2024,
        password,
        bio: "IT student, loves AI projects",
        location: "Jodhpur",
      },
      {
        name: "Karan Verma",
        fatherName: "Anil Verma",
        email: "karan.21cs152@jietjodhpur.ac.in",
        role: "student",
        rollNumber: "CS152",
        department: "CSE",
        graduationYear: 2025,
        password,
      },
      {
        name: "Ananya Singh",
        fatherName: "Ramesh Singh",
        email: "ananya.20cs050@jietjodhpur.ac.in",
        role: "alumni",
        graduationYear: 2020,
        department: "CSE",
        password,
      },
      {
        name: "Rohit Gupta",
        fatherName: "Mahesh Gupta",
        email: "rohit.19it030@jietjodhpur.ac.in",
        role: "alumni",
        graduationYear: 2019,
        department: "IT",
        password,
      },
      {
        name: "Priya Patel",
        fatherName: "Hitesh Patel",
        email: "priya.18cs075@jietjodhpur.ac.in",
        role: "alumni",
        graduationYear: 2018,
        department: "CSE",
        password,
      },
      {
        name: "Dr. Sunil Kumar",
        fatherName: "Rajendra Kumar",
        email: "sunil.kumar@jietjodhpur.ac.in",
        role: "faculty",
        department: "CSE",
        password,
      },
      {
        name: "Dr. Neha Sharma",
        fatherName: "Suresh Sharma",
        email: "neha.sharma@jietjodhpur.ac.in",
        role: "faculty",
        department: "IT",
        password,
      },
      {
        name: "Dr. Amit Singh",
        fatherName: "Rajan Singh",
        email: "amit.singh@jietjodhpur.ac.in",
        role: "faculty",
        department: "ECE",
        password,
      },
      {
        name: "Admin User",
        fatherName: "Vikram Singh",
        email: "admin@jietjodhpur.ac.in",
        role: "admin",
        password,
      },
      {
        name: "Shivani Mehra",
        fatherName: "Sanjay Mehra",
        email: "shivani.23cs101@jietjodhpur.ac.in",
        role: "student",
        rollNumber: "CS101",
        department: "CSE",
        graduationYear: 2025,
        password,
      },
      {
        name: "Vikram Patel",
        fatherName: "Harish Patel",
        email: "vikram.21me020@jietjodhpur.ac.in",
        role: "alumni",
        graduationYear: 2021,
        department: "ME",
        password,
      },
      {
        name: "Dr. Rekha Jain",
        fatherName: "Ramesh Jain",
        email: "rekha.jain@jietjodhpur.ac.in",
        role: "faculty",
        department: "ME",
        password,
      },
      {
        name: "Aman Choudhary",
        fatherName: "Pradeep Choudhary",
        email: "aman.22cs125@jietjodhpur.ac.in",
        role: "student",
        rollNumber: "CS125",
        department: "CSE",
        graduationYear: 2025,
        password,
      },
      {
        name: "Sakshi Rathi",
        fatherName: "Deepak Rathi",
        email: "sakshi.20cs045@jietjodhpur.ac.in",
        role: "alumni",
        graduationYear: 2020,
        department: "CSE",
        password,
      },
    ];

    await User.insertMany(users);
    console.log("15 users seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();
