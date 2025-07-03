import express from "express";
import {
  addCategory,
  deleteCategory,
  showAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { adminOnly } from "../middlewares/adminOnly.js";
const categoryRoute = express.Router();

categoryRoute.post("/category/add-category", adminOnly, addCategory);
categoryRoute.get(
  "/category/show-category/:categoryId",
  adminOnly,
  showCategory
);
categoryRoute.put(
  "/category/update-category/:categoryId",
  adminOnly,
  updateCategory
);
categoryRoute.delete(
  "/category/delete-category/:categoryId",
  adminOnly,
  deleteCategory
);

categoryRoute.get("/category/show-all-category", showAllCategory);

export default categoryRoute;
