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
import { addCategoryRoute, categoriesRoute, IndexRoute, profileRoute, signInRoute, signUpRoute,editCategoryRoute } from "./pages/pageRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IndexRoute} element={<Layout />}>

          <Route path={IndexRoute} element={<Index />} />
          <Route path={profileRoute} element={<Profile/>}/>
          <Route path={categoriesRoute} element={<CategoryDetails/>}/>
          <Route path={addCategoryRoute} element={<AddCategory/>}/>
          <Route path={editCategoryRoute()} element={<EditCategory/>}/>

        </Route>
        <Route path={signInRoute} element={<Signin />} />
        <Route path={signUpRoute} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
