import express from "express";
import { createAnnouncement, getAnnouncements, getAnnouncementById, deleteAnnouncement } from "../controllers/announcementController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import { upload } from "../config/multer.js";

const announcementRouter = express.Router();

announcementRouter.post("/", authMiddleware, adminOnly, upload.array("media"), createAnnouncement);
announcementRouter.get("/", authMiddleware, getAnnouncements);
announcementRouter.get("/:id", authMiddleware, getAnnouncementById);
announcementRouter.delete("/:id", authMiddleware, adminOnly, deleteAnnouncement);

export default announcementRouter;
