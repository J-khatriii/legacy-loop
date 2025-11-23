import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import announcementRouter from "./routes/announcementRoutes.js";

const app = express();

await connectDB();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRouter);
app.use("api/messages", messageRouter);
app.use("/api/announcement", announcementRouter);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
