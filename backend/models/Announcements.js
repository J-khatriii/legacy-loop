import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: { type: String },
    message: { type: String, required: true, trim: true},
    fullText: { type: String, required: true, },
    media: { type: String, default: null },
    audience: { type: [String], enum: ["students", "teachers", "alumni", "admins", "everyone"], default: ["everyone"] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
