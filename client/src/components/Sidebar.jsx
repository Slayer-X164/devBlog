import React from "react";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import { blogRoute, categoriesRoute, IndexRoute } from "@/pages/pageRoutes";
import { useFetch } from "@/hooks/useFetch";
const Sidebar = () => {
  let {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/show-all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );
  const sidebarLinks = [
    { label: "Home", path: IndexRoute, icon: <FaHome />,color:"oklch(70.7% 0.165 254.624) " },
    { label: "Categories", path: categoriesRoute, icon: <BiCategory /> },
    { label: "Blogs", path: blogRoute, icon: <IoDocumentTextOutline /> },
    { label: "Comments", path: "/comments", icon: <FaRegComment /> },
    { label: "Users", path: "/users", icon: <FaRegUser /> },
  ];

  return (
    <div className="h-[calc(100vh-72px)] w-96 bg-slate-950 text-white pr-6 py-8 flex gap-6 flex-col">
      <div className="bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4">
        { sidebarLinks.map(({ label, path, icon,color }, index) => (
          <div key={index}>
            <Link
            style={{color: color}}
              to={path}
              className="hover:text-slate-200 flex items-center gap-1 text-slate-400"
            >
              {icon}
              {label}
            </Link>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4">
        <h1 className="flex items-center gap-2 text-xl text-slate-200 font-semibold">
          <span className="text-green-600 p-2 bg-green-600/20 rounded-sm">
            <MdOutlineCategory />
          </span>{" "}
          Categories
        </h1>
        {categoryData&& categoryData.categories.map((category, index) => (
          <div key={index}>
            <Link
              to=""
              className="hover:text-slate-200  flex  items-center gap-1 text-slate-400"
            >
              <GoDotFill />
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
