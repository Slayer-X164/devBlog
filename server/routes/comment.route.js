import express from "express";
import {
  addComment,
  deleteCommentById,
  getAllComments,
  getAllCommentsOfUser,
  getComments,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const commentRoute = express.Router();

commentRoute.post("/blog-comment/add", authenticate, addComment);
commentRoute.get("/blog-comment/comments/:blogId",  getComments);
commentRoute.get("/blog/all-comments", getAllComments);
commentRoute.post(
  "/blog/get-all/user-comments",
  getAllCommentsOfUser
);
commentRoute.delete(
  "/blog/delete-comment/:commentId",
  authenticate,
  deleteCommentById
);

export default commentRoute;
