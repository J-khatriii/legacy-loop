import express from "express";
import User from "../models/User.js";

const router = express.Router();

// get all the users

router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Fetch users error", error);
        res.status(500).json({ message: "Server error fetching users" });
    }
});

// get user by id

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;