import fs from "fs";
import imagekit from "../config/imagekit.js";
import Announcement from "../models/Announcements.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, fullText, audience } = req.body;
    let mediaUrl = null;

    // If an image was uploaded
    if (req.files && req.files.length > 0) {
      const uploadResp = await imagekit.files.upload({
        file: fs.createReadStream(req.files[0].path),
        fileName: req.files[0].originalname,
        folder: "announcements",
      });

      mediaUrl = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: uploadResp.filePath,
        transformation: [
          {
            format: "webp",
            quality: "auto",
            width: 800,
          },
        ],
      });
    }

    const announcement = await Announcement.create({
      title,
      message,
      fullText,
      media: mediaUrl,
      audience: audience?.length ? audience : ["everyone"],
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, announcement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create announcement" });
  }
}

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role");

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
}

// Get announcement by Id
export const getAnnouncementById = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!ann) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json(ann);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcement" });
  }
}

// delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);

    if (!ann) {
      return res.status(404).json({ error: "Not found" });
    }

    await ann.deleteOne();

    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}
