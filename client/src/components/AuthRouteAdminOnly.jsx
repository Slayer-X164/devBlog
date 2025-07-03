import Layout from "@/Layout/Layout";
import { IndexRoute } from "@/pages/pageRoutes";
import { Sidebar } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouteAdminOnly = () => {
  const user = useSelector((state) => state.user);
  if (user && user.isSignedIn && user.user.role === "admin") {
    return <Layout/>
  } else {
    return <Navigate to={IndexRoute} />;
  }
};

export default AuthRouteAdminOnly;
