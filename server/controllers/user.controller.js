import errorHandler from "../middlewares/errorHandler.middleware.js";
import userModel from "../models/user.model.js";
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      next(errorHandler(404, "user not found"));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
