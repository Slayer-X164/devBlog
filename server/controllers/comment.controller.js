import errorHandler from "../middlewares/errorHandler.middleware.js";
import Comments from "../models/comment.model.js";
export const addComment = async (req, res, next) => {
  const { author, blogId, result } = req.body;
  try {
    const newComment = new Comments({
      author,
      blogId,
      comment: result,
    });
    await newComment.save();
    res.status(200).json({
      success: true,
      newComment,
      message: "comment posted",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getComments = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const comments = await Comments.find({ blogId })
      .populate("author", "name photoURL")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(errorHandler((500, error.message)));
  }
};
