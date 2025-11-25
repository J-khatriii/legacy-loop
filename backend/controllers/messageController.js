import fs from "fs";
import mongoose from "mongoose";
import imagekit from "../config/imagekit.js";
import Message from "../models/Messages.js";
import User from "../models/User.js";

// Store SSE connections
const connections = {};

// SSE Controller
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("New client connected:", userId);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  connections[userId] = res;

  res.write("data: connected\n\n");

  res.on("close", () => {
    delete connections[userId];
    console.log("Client disconnected:", userId);
  });
}

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { receiverId, text } = req.body;
    const file = req.file;

    const attachments = [];

    if (file) {
      const response = await imagekit.files.upload({
        file: fs.createReadStream(file.path),
        fileName: file.originalname,
      });

      const url = imagekit.helper.buildSrc({
        src: response.filePath,
        transformation: [{ quality: "auto", format: "webp", width: 1280 }],
      });

      attachments.push({ url, type: "image" });
    }

    // Broadcast to all users if receiverId === "all"
    let recipients = [];
    if (receiverId === "all") {
      const users = await User.find({ _id: { $ne: userId } });
      recipients = users.map((u) => u._id.toString());
    } else {
      recipients = [receiverId];
    }

    const messages = [];
    for (const recId of recipients) {
      const message = await Message.create({
        sender: userId,
        receiver: recId,
        text,
        attachments,
      });

      messages.push(message);

      // SSE push if connected
      if (connections[recId]) {
        connections[recId].write(`data: ${JSON.stringify(message)}\n\n`);
      }
    }

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Chat Messages
export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { otherUserId } = req.body;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    // Mark received messages as read
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, isRead: false },
      { isRead: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get User Recent Messages
export const getUserRecentMessages = async (req, res) => {
  try {
    const { userId } = req.auth();

    const messages = await Message.find({ receiver: userId })
      .populate("sender receiver", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Delete a Message
export const deleteMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    if (message.sender.toString() !== userId)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });

    await message.deleteOne();
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Edit a Message
export const editMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { messageId } = req.params;
    const { text } = req.body;

    const message = await Message.findById(messageId);
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    if (message.sender.toString() !== userId)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });

    message.text = text;
    await message.save();

    res.json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Mark All Messages as Read
export const markMessagesRead = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { senderId } = req.body;

    await Message.updateMany(
      { sender: senderId, receiver: userId, isRead: false },
      { isRead: true }
    );
    res.json({ success: true, message: "Messages marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Unread Counts
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.auth();

    const counts = await Message.aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(userId),
          isRead: false,
        },
      },
      { $group: { _id: "$sender", count: { $sum: 1 } } },
    ]);

    res.json({ success: true, counts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Attachments Only
export const getAttachments = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { otherUserId } = req.body;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
      "attachments.0": { $exists: true },
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
