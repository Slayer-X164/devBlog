import errorHandler from "../middlewares/errorHandler.middleware.js";
import categoryModel from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new categoryModel({ name, slug });
    await category.save();
    res.status(200).json({
      success: true,
      category,
      message: "added new category",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        next(errorHandler(404,"data not found"))
    }
    res.status(200).json({
      success: "true",
      category,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categories = await categoryModel.findByIdAndUpdate();
    res.status(200).json({
      success: "true",
      categories,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {};

export const showAllCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel
      .find()
      .sort({ name: 1 })
      .lean()
      .exec();
    res.status(200).json({
      success: "true",
      categories,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
