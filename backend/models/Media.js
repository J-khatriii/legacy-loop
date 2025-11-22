import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  usage: { type: String, enum: ['post','avatar','message','event'] },
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Media = mongoose.model('Media', MediaSchema);

export default Media;

