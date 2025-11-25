import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  url: String,
  type: { type: String, enum: ["image", "video", "file"], default: "file" },
});

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    attachments: [attachmentSchema],
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message =  mongoose.model("Message", messageSchema);

export default Message;
