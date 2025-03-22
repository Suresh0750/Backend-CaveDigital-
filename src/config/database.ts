import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI() as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
