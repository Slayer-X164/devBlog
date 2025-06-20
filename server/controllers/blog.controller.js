import errorHandler from "../middlewares/errorHandler.middleware.js";
import Blog from "../models/Blog.model.js";
import { encode } from "entities";
import Category from "../models/category.model.js";

export const addBlog = async (req, res, next) => {
  try {
    const { title, slug, category, blogContent, author } = req.body;
    //find category
    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
      return next(errorHandler(400, "Category not found"));
    }

    const blog = new Blog({
      title: title,
      slug: slug,
      category: foundCategory._id,
      blogContent: encode(blogContent),
      author: author,
    });
    await blog.save();
    res.status(200).json({
      success: true,
      message: "blog posted!",
      blog
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getAllBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
