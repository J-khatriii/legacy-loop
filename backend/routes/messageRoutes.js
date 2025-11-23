import express from "express";
import { upload } from "../config/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  sseController,
  sendMessage,
  getChatMessages,
  getUserRecentMessages,
  markMessagesRead,
  deleteMessage,
  editMessage,
  getAttachments,
  getUnreadCount,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/:userId", authMiddleware, sseController);
messageRouter.post("/send", authMiddleware, upload.single("file"), sendMessage);
messageRouter.post("/chat", authMiddleware, getChatMessages);
messageRouter.get("/recent", authMiddleware, getUserRecentMessages);
messageRouter.post("/read", authMiddleware, markMessagesRead);
messageRouter.put("/edit/", authMiddleware, editMessage);
messageRouter.delete("/delete/", authMiddleware, deleteMessage);
messageRouter.get("/attachments", authMiddleware, getAttachments);
messageRouter.get("/unread-count", authMiddleware, getUnreadCount);

export default messageRouter;
