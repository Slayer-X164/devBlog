import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  isLiked:{
    type:Boolean,
    required:true
  }
});
const Like = mongoose.model("Like", likeSchema, "likes");
export default Like;
