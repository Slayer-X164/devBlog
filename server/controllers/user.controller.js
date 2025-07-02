import imagekit from "../config/imageKit.conifg.js";
import errorHandler from "../middlewares/errorHandler.middleware.js";
import userModel from "../models/user.model.js";

import fs from "fs";
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

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = JSON.parse(req.body.data);
    const user = await userModel.findById(userId);

    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    //imagekit upload
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const uploadResult = await imagekit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "uploads",
      });
      user.photoURL = uploadResult.url;
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete temp file:", err);
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
      message: "changes saved",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getAllUser = async (req, res, next) => {
  try {

    const user = await userModel.find();
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
export const deleteUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      next(errorHandler(404, "user not found"));
    }
    res.status(200).json({
      success: true,
      message:"user deleted"
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
