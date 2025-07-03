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
  blogAllCommentsRoute,
  usersAllDetailRoute,
} from "./pages/pageRoutes";
import Blog from "./pages/blog/Blog";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import BlogRead from "./pages/BlogRead";
import BlogByCategory from "./pages/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import CommentsDetail from "./pages/CommentsDetail";
import UsersDetail from "./pages/UsersDetail";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AuthRouteAdminOnly from "./components/AuthRouteAdminOnly";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IndexRoute} element={<Layout />}>
          <Route path={IndexRoute} element={<Index />} />
          <Route path={profileRoute} element={<Profile />} />

          {/* blog read  */}
          <Route path={blogReadRoute()} element={<BlogRead />} />
          {/* blog by category */}
          <Route path={getBlogByCategoryRoute()} element={<BlogByCategory />} />
          {/* Search result page */}
          <Route path={searchRoute()} element={<SearchResult />} />
        </Route>

        <Route path={signInRoute} element={<Signin />} />
        <Route path={signUpRoute} element={<Signup />} />

        {/* protected routes */}
        <Route element={<AuthRouteProtection />}>
          <Route path={blogRoute} element={<Blog />} />
          <Route path={addBlogRoute} element={<AddBlog />} />
          <Route path={updateBlogRoute()} element={<EditBlog />} />
          <Route path={blogAllCommentsRoute} element={<CommentsDetail />} />
        </Route>

        {/* admin only protected routes */}
        <Route element={<AuthRouteAdminOnly />}>
          <Route path={categoriesRoute} element={<CategoryDetails />} />
          <Route path={addCategoryRoute} element={<AddCategory />} />
          <Route path={editCategoryRoute()} element={<EditCategory />} />
          <Route path={usersAllDetailRoute} element={<UsersDetail />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
