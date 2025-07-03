import express from "express";
import {
  signUpUser,
  signInUser,
  signInWithGoogle,
  signOutUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const authRoute = express.Router();

authRoute.post("/auth/sign-up", signUpUser);
authRoute.post("/auth/sign-in", signInUser);
authRoute.post("/auth/google/sign-in", signInWithGoogle);
authRoute.post("/auth/sign-out", authenticate,signOutUser);

export default authRoute;
