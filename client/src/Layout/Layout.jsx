import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header/>
      <main className="flex relative">
        <Outlet />
        <Sidebar/>
        <MobileNav/>
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
