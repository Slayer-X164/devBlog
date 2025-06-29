import errorHandler from "../middlewares/errorHandler.middleware.js";
import Like from "../models/blogLike.model.js";
export const blogLike = async (req, res, next) => {
  try {
    let { blogId, userId } = req.body;
    let like;
    like = await Like.findOne({ userId, blogId });
    if (!like) {
      const saveLike = new Like({ userId, blogId, isLiked: true });
      like = await saveLike.save();
    } else {
      like.isLiked = false;
      await Like.findByIdAndDelete(like._id);
    }

    res.status(200).json({
      success: true,
      like,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const likeCount = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const totalLikeCount = await Like.countDocuments({ blogId });
    const like = await Like.find({ blogId });
    const likeBool = like.isLiked;
    res.status(200).json({
      success: true,
      totalLikeCount,
      likeBool,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
