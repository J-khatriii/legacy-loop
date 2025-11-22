import express from "express";
import {
  getAllUsers,
  getUserData,
  updateUserData,
  discoverUsers,
  followUser,
  unfollowUser,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getUserConnections,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/me", authMiddleware, getUserData);
userRouter.put("/me", authMiddleware, upload.fields([{ name: "profile", maxCount: 1 }, { name: "cover", maxCount: 1 }]), updateUserData);
userRouter.post("/discover", authMiddleware, discoverUsers);
userRouter.post("/follow", authMiddleware, followUser);
userRouter.post("/unfollow", authMiddleware, unfollowUser);
userRouter.post("/connections/send", authMiddleware, sendConnectionRequest);
userRouter.post("/connections/accept", authMiddleware, acceptConnectionRequest);
userRouter.post("/connections/reject", authMiddleware, rejectConnectionRequest);
userRouter.get("/connections", authMiddleware, getUserConnections);

export default userRouter;
