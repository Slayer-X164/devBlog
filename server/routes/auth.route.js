import express from "express";
import {
  signUpUser,
  signInUser,
  signInWithGoogle,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/auth/sign-up", signUpUser);
authRoute.post("/auth/sign-in", signInUser);
authRoute.post("/auth/google/sign-in", signInWithGoogle);

export default authRoute;
