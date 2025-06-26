import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogContent: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "User",
    },

  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema, "blogs");
export default Blog;
