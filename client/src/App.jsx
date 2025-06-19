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
} from "./pages/pageRoutes";
import Blog from "./pages/blog/Blog";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IndexRoute} element={<Layout />}>
          <Route path={IndexRoute} element={<Index />} />
          <Route path={profileRoute} element={<Profile />} />
          {/* categories start*/}
          <Route path={categoriesRoute} element={<CategoryDetails />} />
          <Route path={addCategoryRoute} element={<AddCategory />} />
          <Route path={editCategoryRoute()} element={<EditCategory />} />
          {/* categories end*/}

          {/* blog start */}
          <Route path={blogRoute} element={<Blog />} />
          <Route path={addBlogRoute} element={<AddBlog />} />
          <Route path={updateBlogRoute()} element={<EditBlog />} />
          {/* blog end */}
          
        </Route>
        <Route path={signInRoute} element={<Signin />} />
        <Route path={signUpRoute} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
