import express from "express";
import { addCategory, deleteCategory, showAllCategory, showCategory, updateCategory } from "../controllers/category.controller.js";
const categoryRoute = express.Router();

categoryRoute.post("/category/add-category", addCategory);
categoryRoute.get("/category/show-category/:categoryId", showCategory);
categoryRoute.put("/category/update-category/:categoryId", updateCategory);
categoryRoute.delete("/category/delete-category/:categoryId", deleteCategory);
categoryRoute.get("/category/show-all-category", showAllCategory);


export default categoryRoute;
