import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
const commentRoute = express.Router();

commentRoute.post("/blog-comment/add", addComment);
commentRoute.get("/blog-comment/comments/:blogId", getComments);

export default commentRoute;
