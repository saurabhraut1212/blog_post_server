import mongoose from "mongoose";
import { IBlog } from "../types/blog.types";

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model<IBlog>("Blog", blogSchema);
