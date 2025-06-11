import express from 'express'
import { getUser } from '../controllers/user.controller.js'
const userRoute = express.Router()

userRoute.get('/user/get-user/:userId',getUser)

export default userRoute