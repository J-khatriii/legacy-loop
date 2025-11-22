import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  getFeed,
  getAllPosts,
} from "../controllers/postController.js";
import { upload } from "../config/multer.js";

const postRouter = express.Router();

postRouter.get("/all", authMiddleware, getAllPosts)
postRouter.get("/feed", authMiddleware, getFeed);

postRouter.post("/", authMiddleware, upload.array("media"), createPost);
postRouter.put("/:id", authMiddleware, upload.array("media"), updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);

postRouter.post("/:id/like", authMiddleware, toggleLike);
postRouter.post("/:id/comment", authMiddleware, addComment);
postRouter.delete("/:postId/comment/:commentId", authMiddleware, deleteComment);

export default postRouter;
