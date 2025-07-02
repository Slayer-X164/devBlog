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
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comments.find()
      .populate("author", "name ")
      .populate("blogId", "title")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const deleteCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comments.findByIdAndDelete(commentId);
    if (!comment) {
      return next(errorHandler(404, "comment not found"));
    }
    res.status(200).json({
      success: true,
      message: "comment deleted",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
