import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true ,unique: true,trim:true },
    description: { type: String, required: true ,trim:true},
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
