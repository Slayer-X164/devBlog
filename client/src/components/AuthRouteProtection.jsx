import Layout from "@/Layout/Layout";
import { IndexRoute, signInRoute } from "@/pages/pageRoutes";
import { Sidebar } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AuthRouteProtection = () => {
  const user = useSelector((state) => state.user);
  if (user && user.isSignedIn) {
    return <Layout/>
  } else {
    return <Navigate to={signInRoute} />;
  }
};

export default AuthRouteProtection;
