import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true, index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  editedAt: Date,
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

export default Message;
