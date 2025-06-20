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
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId)
      .populate("author", "name")
      .populate("category", "name")
      .exec();
    if (!blog) {
      return next(errorHandler(404, "blog not found"));
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { title, slug, category, blogContent } = req.body;
    const findCategory = await Category.findOne({ name: category });
    if (!findCategory) {
      return next(errorHandler(404, "category Not Found"));
    }
    const findBlogExists = await Blog.findById(blogId);
    if (!blogId) {
      return next(errorHandler(404, "Blog Not Found"));
    }
    findBlogExists.title = title;
    findBlogExists.slug = slug;
    findBlogExists.category = findCategory._id;
    findBlogExists.blogContent = encode(blogContent);
    await findBlogExists.save();
    res.status(200).json({
      success: true,
      message: "Blog Updated!",
      blog: findBlogExists,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({
      success: true,
      message: "blog deleted!",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const getAllBlog = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ created_at: 1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      allBlogs,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
