import express from 'express'
import { deleteUserById, getAllUser, getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.config.js'
const userRoute = express.Router()

userRoute.get('/user/get-user/:userId',getUser)
userRoute.get('/user/get-all-users',getAllUser)
userRoute.delete('/user/delete-user/:id',deleteUserById)
userRoute.post('/user/update-user/:userId',upload.single('File'),updateUser)

export default userRoute