import express from "express";
import { addBlog } from "../controllers/blog.controller.js";
const blogRoute = express.Router();

blogRoute.post("/blog/add", addBlog);

export default blogRoute;
