import mongoose from "mongoose";

// Define the Todo schema
const todoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models["Todo"] || mongoose.model("Todo", todoSchema);
