import Post from "../models/Post.js";
import User from "../models/User.js";
import imagekit from "../config/imagekit.js";
import fs from "fs";


// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name profileImage")
      .populate("comments.user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { content, visibility, batch, tags } = req.body;

    const postData = { author: authorId, content, visibility, tags: tags || [] };
    if (visibility === "batch") postData.batch = batch;

    const mediaFiles = req.files?.media || [];
    if (mediaFiles.length > 0) {
      postData.media = [];
      for (let file of mediaFiles) {
        const upload = await imagekit.files.upload({
          file: fs.createReadStream(file.path),
          fileName: file.originalname,
        });
        postData.media.push({
          url: imagekit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: upload.filePath,
            transformation: [{ quality: "auto", format: "webp" }],
          }),
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
      }
    }

    const post = await Post.create(postData);
    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.user.id;
    const { content, visibility, batch, tags } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    if (post.author.toString() !== authorId) return res.status(403).json({ success: false, message: "Not authorized" });

    if (content) post.content = content;
    if (visibility) post.visibility = visibility;
    if (visibility === "batch" && batch) post.batch = batch;
    if (tags) post.tags = tags;

    const mediaFiles = req.files?.media || [];
    if (mediaFiles.length > 0) {
      post.media = [];
      for (let file of mediaFiles) {
        const upload = await imagekit.files.upload({
          file: fs.createReadStream(file.path),
          fileName: file.originalname,
        });
        post.media.push({
          url: imagekit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: upload.filePath,
            transformation: [{ quality: "auto", format: "webp" }],
          }),
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
      }
    }

    post.isEdited = true;
    await post.save();

    res.json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    if (post.author.toString() !== authorId) return res.status(403).json({ success: false, message: "Not authorized" });

    await post.remove();
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like / Unlike a post
export const toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex > -1) {
      post.likes.splice(likedIndex, 1);
    } else {
      post.likes.push(userId);
    }
    post.likesCount = post.likes.length;

    await post.save();
    res.json({ success: true, likesCount: post.likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.comments.push({ user: userId, text });
    post.commentsCount = post.comments.length;

    await post.save();
    res.json({ success: true, comments: post.comments, commentsCount: post.commentsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    if (comment.user.toString() !== userId) return res.status(403).json({ success: false, message: "Not authorized" });

    comment.remove();
    post.commentsCount = post.comments.length;
    await post.save();

    res.json({ success: true, message: "Comment deleted", commentsCount: post.commentsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch posts feed
export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const posts = await Post.find({
      $or: [
        { visibility: "public" },
        { visibility: "connections", author: { $in: user.connections } },
        { visibility: "batch", batch: user.graduationYear },
        { author: userId }, // own posts
      ],
    })
      .populate("author", "name profileImage")
      .populate("comments.user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
