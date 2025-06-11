import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  photoURL: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User',userSchema,'users')
export default User
