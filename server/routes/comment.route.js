import express from "express";
import { addComment, deleteCommentById, getAllComments, getComments } from "../controllers/comment.controller.js";
const commentRoute = express.Router();

commentRoute.post("/blog-comment/add", addComment);
commentRoute.get("/blog-comment/comments/:blogId", getComments);
commentRoute.get("/blog/all-comments", getAllComments);
commentRoute.delete("/blog/delete-comment/:commentId", deleteCommentById);

export default commentRoute;
