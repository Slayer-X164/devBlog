import express from 'express'
import dotenv from'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './db/db.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import categoryRoute from './routes/category.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())

//db
connectDB(process.env.DB_URI)
//route
app.use('/api',authRoute)
app.use('/api',userRoute)
app.use('/api',categoryRoute)

app.listen(port,()=>{
    console.log("server is running on port", port);
})

//error handle middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})