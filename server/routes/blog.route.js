import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getAllBlogOfUser,
  getBlog,
  getBlogByCategory,
  getBlogForRead,
  searchBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const blogRoute = express.Router();

blogRoute.post("/blog/add", authenticate, addBlog);
blogRoute.get("/blog/get/:blogId",  getBlog);
blogRoute.put("/blog/update/:blogId", authenticate, updateBlog);
blogRoute.delete("/blog/delete/:blogId", authenticate, deleteBlog);

blogRoute.post("/blog/get-all/user-blogs", getAllBlogOfUser);
blogRoute.get("/blog/get-all", getAllBlog);
blogRoute.get("/blog/read/:slug", getBlogForRead);
blogRoute.get("/blog/get-all/:category", getBlogByCategory);
blogRoute.get("/blog/search", searchBlog);

export default blogRoute;
