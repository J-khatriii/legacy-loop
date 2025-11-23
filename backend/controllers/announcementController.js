import Announcement from "../models/Announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, fullText, media } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      fullText,
      media,
      createdBy: req.user._id,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};

export const getAnnouncementById = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);

    if (!ann) return res.status(404).json({ error: "Announcement not found" });

    res.json(ann);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcement" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);

    if (!ann) return res.status(404).json({ error: "Not found" });

    await ann.deleteOne();

    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};
