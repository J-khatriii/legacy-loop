import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    content: { type: String, default: "" },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      }
    ],
    visibility: { type: String, enum: ["public","batch","connections","private"], default: "public", index: true },
    batch: { type: Number }, // graduation year for batch-specific posts
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    comments: [commentSchema],
    commentsCount: { type: Number, default: 0 },
    pinned: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
