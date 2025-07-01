import React from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import {
  addCategoryRoute,
  categoriesRoute,
  IndexRoute,
  profileRoute,
  signInRoute,
  signUpRoute,
  editCategoryRoute,
  blogRoute,
  addBlogRoute,
  updateBlogRoute,
  blogReadRoute,
  getBlogByCategoryRoute,
  searchRoute,
} from "./pages/pageRoutes";
import Blog from "./pages/blog/Blog";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import BlogRead from "./pages/BlogRead";
import BlogByCategory from "./pages/BlogByCategory";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IndexRoute} element={<Layout />}>
          <Route path={IndexRoute} element={<Index />} />
          <Route path={profileRoute} element={<Profile />} />

          {/* categories */}
          <Route path={categoriesRoute} element={<CategoryDetails />} />
          <Route path={addCategoryRoute} element={<AddCategory />} />
          <Route path={editCategoryRoute()} element={<EditCategory />} />

          {/* blog  */}
          <Route path={blogRoute} element={<Blog />} />
          <Route path={addBlogRoute} element={<AddBlog />} />
          <Route path={updateBlogRoute()} element={<EditBlog />} />

          {/* blog read  */}
          <Route path={blogReadRoute()} element={<BlogRead />} />
          {/* blog by category */}
          <Route path={getBlogByCategoryRoute()} element={<BlogByCategory />} />
          {/* Search result page */}
          <Route path={searchRoute()} element={<SearchResult />} />
        </Route>
        <Route path={signInRoute} element={<Signin />} />
        <Route path={signUpRoute} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
