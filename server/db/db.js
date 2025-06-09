import mongoose from "mongoose";

export const connectDB = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI,{dbName:"devBlogDB"})
        console.log("✅DB connection successful");
    } catch (error) {
        console.log("❌error while connecting to DB",error.message);
    }
}