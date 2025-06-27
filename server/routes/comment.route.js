import express from "express";
import { addComment } from "../controllers/comment.controller.js";
const commentRoute = express.Router();

commentRoute.post("/blog-comment/add", addComment);

export default commentRoute;
