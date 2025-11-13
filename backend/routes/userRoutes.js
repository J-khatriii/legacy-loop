// import express from "express";
// import User from "../models/User.js";

// const router = express.Router();

// // get all the users

// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find({}, "-password");
//         res.status(200).json(users);
//     } catch (error) {
//         console.log("Fetch users error", error);
//         res.status(500).json({ message: "Server error fetching users" });
//     }
// });

// // get user by id

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id, "-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;



import express from "express";
import Student from "../models/Student.js";
import Alumni from "../models/Alumni.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// GET all users (students + alumni + admins)
router.get("/all", async (req, res) => {
  try {
    const [students, alumni, admins] = await Promise.all([
      Student.find({}, "-password"), // exclude password field
      Alumni.find({}, "-password"),
      Admin.find({}, "-password"),
    ]);

    // Merge and tag each user with their role
    const combinedUsers = [
      ...students.map((u) => ({ ...u.toObject(), userType: "student" })),
      ...alumni.map((u) => ({ ...u.toObject(), userType: "alumni" })),
      ...admins.map((u) => ({ ...u.toObject(), userType: "admin" })),
    ];

    res.status(200).json(combinedUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Server error fetching all users" });
  }
});

export default router;
