import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/legacy-loop`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");

    // mongoose.connection.on("connected", () => console.log("DB connected"));
    // await mongoose.connect(`${process.env.MONGO_URL}/legacy-loop`);
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
