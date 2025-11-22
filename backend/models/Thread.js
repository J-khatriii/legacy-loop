import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: {
    text: String,
    sentAt: Date
  },
  unreadCounts: { type: Map, of: Number } // userId -> count
}, { timestamps: true });

ThreadSchema.index({ participants: 1 });

const Thread = mongoose.model("Thread", ThreadSchema);

export default Thread;
