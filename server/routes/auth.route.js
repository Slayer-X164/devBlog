import express from 'express'
import { signUpUser,signInUser } from "../controllers/auth.controller.js";

const authRoute = express.Router()

authRoute.post('/auth/sign-up',signUpUser)
authRoute.post('/auth/sign-in',signInUser)

export default authRoute