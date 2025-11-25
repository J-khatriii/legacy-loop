import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import Post from "../models/Post.js";
import User from "../models/User.js";

dotenv.config();
mongoose.connect(`${process.env.MONGO_URL}/legacy-loop`);

const seedPosts = async () => {
  try {
    // await Post.deleteMany(); // clear existing posts
    const users = await User.find(); // get all users for author/likes/comments

    if (users.length === 0) {
      console.log("No users found! Seed users first.");
      process.exit();
    }

    const posts = [];

    for (let i = 0; i < 50; i++) {
      const author = users[Math.floor(Math.random() * users.length)];
      const visibilityOptions = ["public", "batch", "connections", "private"];
      const mediaCount = Math.floor(Math.random() * 3);

      const media = [];
      for (let j = 0; j < mediaCount; j++) {
        media.push({
          url: faker.image.url(),
          type: "image",
        });
      }

      const likesCount = Math.floor(Math.random() * 20);
      const likes = [];
      for (let k = 0; k < likesCount; k++) {
        const user = users[Math.floor(Math.random() * users.length)];
        if (!likes.includes(user._id)) likes.push(user._id);
      }

      const commentsCount = Math.floor(Math.random() * 5);
      const comments = [];
      for (let c = 0; c < commentsCount; c++) {
        const user = users[Math.floor(Math.random() * users.length)];
        comments.push({
          user: user._id,
          text: faker.lorem.sentence(),
        });
      }

      posts.push({
        author: author._id,
        content: faker.lorem.paragraph(),
        media,
        visibility: visibilityOptions[Math.floor(Math.random() * visibilityOptions.length)],
        batch: author.batch || 2020 + Math.floor(Math.random() * 5),
        tags: [faker.lorem.word(), faker.lorem.word()],
        likes,
        likesCount: likes.length,
        comments,
        commentsCount: comments.length,
        pinned: Math.random() < 0.1, // 10% chance
      });
    }

    await Post.insertMany(posts);
    console.log("50 dummy posts seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedPosts();
