import express from 'express'
import { blogLike, likeCount } from '../controllers/blogLike.controller.js'
const likeRouter = express.Router()

likeRouter.post('/blog/like',blogLike)
likeRouter.get('/blog/like-count/:blogId',likeCount)

export default likeRouter