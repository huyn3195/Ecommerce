import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB..."); // Optional debug message
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
