import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header/>
      <main className="flex">
        <Outlet />
        <Sidebar/>
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
