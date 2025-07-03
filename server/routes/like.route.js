import express from 'express'
import { blogLike, likeCount } from '../controllers/blogLike.controller.js'
import { authenticate } from '../middlewares/authenticate.middleware.js'
const likeRouter = express.Router()

likeRouter.post('/blog/like',authenticate,blogLike)
likeRouter.get('/blog/like-count/:blogId',likeCount)

export default likeRouter