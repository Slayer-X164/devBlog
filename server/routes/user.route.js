import express from "express";
import {
  deleteUserById,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const userRoute = express.Router();

userRoute.get("/user/get-user/:userId", authenticate, getUser);
userRoute.get("/user/get-all-users", authenticate, getAllUser);
userRoute.delete("/user/delete-user/:id", authenticate, deleteUserById);
userRoute.post("/user/update-user/:userId", upload.single("File"), updateUser);

export default userRoute;
