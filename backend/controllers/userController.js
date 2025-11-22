import User from "../models/User.js";
import imagekit from "../config/imagekit.js";
import fs from "fs";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error fetching all users" });
  }
};

// Get current user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, location, social } = req.body;

    const updatedData = {};
    if (name) updatedData.name = name;
    if (bio) updatedData.bio = bio;
    if (location) updatedData.location = location;

    // Update social links dynamically
    if (social) {
      updatedData.social = {};
      for (const key in social) {
        if (social[key]) updatedData.social[key] = social[key];
      }
    }

    // Handle ImageKit uploads
    const profileFile = req.files?.profile?.[0];
    const coverFile = req.files?.cover?.[0];

    if (profileFile) {
      const upload = await imagekit.files.upload({
        file: fs.createReadStream(profileFile.path),
        fileName: profileFile.originalname,
      });
      updatedData.profileImage = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: upload.filePath,
        transformation: [{ quality: "auto", format: "webp", width: 512 }],
      });
    }

    if (coverFile) {
      const upload = await imagekit.files.upload({
        file: fs.createReadStream(coverFile.path),
        fileName: coverFile.originalname,
      });
      updatedData.coverImage = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: upload.filePath,
        transformation: [{ quality: "auto", format: "webp", width: 1280 }],
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");
    res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Discover users
export const discoverUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { input } = req.body;

    const users = await User.find({
      $or: [
        { name: { $regex: input, $options: "i" } },
        { email: { $regex: input, $options: "i" } },
        { location: { $regex: input, $options: "i" } },
      ],
      _id: { $ne: userId },
    }).select("-password");

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Follow user
export const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;

    if (userId === targetId) return res.status(400).json({ success: false, message: "Cannot follow yourself" });

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);
    if (!user || !targetUser) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.following.includes(targetId)) user.following.push(targetId);
    if (!targetUser.followers.includes(userId)) targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.json({ success: true, message: "Now following the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unfollow user
export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);
    if (!user || !targetUser) return res.status(404).json({ success: false, message: "User not found" });

    user.following = user.following.filter(u => u.toString() !== targetId);
    targetUser.followers = targetUser.followers.filter(u => u.toString() !== userId);

    await user.save();
    await targetUser.save();

    res.json({ success: true, message: "Unfollowed the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;

    if (userId === targetId) return res.status(400).json({ success: false, message: "Cannot connect to yourself" });

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);
    if (!user || !targetUser) return res.status(404).json({ success: false, message: "User not found" });

    if (user.connections.includes(targetId) || targetUser.connections.includes(userId))
      return res.status(400).json({ success: false, message: "Already connected" });

    if (!targetUser.pendingRequests.includes(userId)) targetUser.pendingRequests.push(userId);
    await targetUser.save();

    res.json({ success: true, message: "Connection request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Accept connection request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);
    if (!user || !requester) return res.status(404).json({ success: false, message: "User not found" });

    // Remove from pendingRequests
    user.pendingRequests = user.pendingRequests.filter(r => r.toString() !== requesterId);

    // Add to connections if not already
    if (!user.connections.includes(requesterId)) user.connections.push(requesterId);
    if (!requester.connections.includes(userId)) requester.connections.push(userId);

    await user.save();
    await requester.save();

    res.json({ success: true, message: "Connection accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject connection request
export const rejectConnectionRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.pendingRequests = user.pendingRequests.filter(r => r.toString() !== requesterId);
    await user.save();

    res.json({ success: true, message: "Connection request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user connections (accepted + pending)
export const getUserConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate("connections", "name profileImage")
      .populate("followers", "name profileImage")
      .populate("following", "name profileImage")
      .populate("pendingRequests", "name profileImage");

    res.json({
      success: true,
      connections: user.connections,
      followers: user.followers,
      following: user.following,
      pendingRequests: user.pendingRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
