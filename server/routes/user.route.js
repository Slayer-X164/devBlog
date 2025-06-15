import express from 'express'
import { getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.config.js'
const userRoute = express.Router()

userRoute.get('/user/get-user/:userId',getUser)
userRoute.post('/user/update-user/:userId',upload.single('File'),updateUser)

export default userRoute