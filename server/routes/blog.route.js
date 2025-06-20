import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
const blogRoute = express.Router();

blogRoute.post("/blog/add", addBlog);
blogRoute.get("/blog/get/:blogId", getBlog);
blogRoute.put("/blog/update/:blogId", updateBlog);
blogRoute.delete("/blog/delete/:blogId", deleteBlog);
blogRoute.get("/blog/get-all", getAllBlog);

export default blogRoute;
