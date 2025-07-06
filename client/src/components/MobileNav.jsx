import React from "react";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiSolidNavigation } from "react-icons/bi";
import {
  blogAllCommentsRoute,
  blogRoute,
  categoriesRoute,
  getBlogByCategoryRoute,
  IndexRoute,
  usersAllDetailRoute,
} from "@/pages/pageRoutes";
import { useFetch } from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "@/redux/mobileNav.slice";
import GithubBtn from "./GithubBtn";
import Search from "./Search";
const MobileNav = () => {
  const isOpen = useSelector((state) => state.mobileNav.isOpen);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
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
    {
      label: "Home",
      path: IndexRoute,
      icon: <FaHome />,
    },
    { label: "Categories", path: categoriesRoute, icon: <BiCategory /> },
    { label: "Blogs", path: blogRoute, icon: <IoDocumentTextOutline /> },
    { label: "Comments", path: blogAllCommentsRoute, icon: <FaRegComment /> },
    { label: "Users", path: usersAllDetailRoute, icon: <FaRegUser /> },
  ];
  console.log(isOpen);
  if(isOpen){
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = 'auto'
  }

  return (
    <div
      className={`absolute top-0  w-full bg-slate-950/70 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex justify-end`}
    >
      <div
        className={`overflow-scroll p-6 h-[calc(100vh-72px)] w-80 backdrop-blur-sm bg-slate-800/20 text-white pr-6 py-8 flex gap-6 flex-col `}
      >
        <Search/>
        <div className="bg-slate-900 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4">
          <h1 className="flex items-center gap-2 text-xl text-slate-200 font-semibold">
            <span className="text-pink-600 p-2 bg-pink-600/20 rounded-sm">
              <BiSolidNavigation className="text-md" />
            </span>{" "}
            Quick Access
          </h1>
          <Link onClick={()=>dispatch(toggleNav(!isOpen))}
            to={IndexRoute}
            className="hover:text-slate-200 flex text-sm pl-1  items-center gap-2  text-slate-400"
          >
            <FaHome />
            Home
          </Link>

          <Link  onClick={()=>dispatch(toggleNav(!isOpen))}
            to={blogRoute}
            className="hover:text-slate-200 flex  text-sm pl-1 items-center gap-2 text-slate-400"
          >
            <IoDocumentTextOutline className="text-md" />
            Blogs
          </Link>
          <Link onClick={()=>dispatch(toggleNav(!isOpen))}
            to={blogAllCommentsRoute}
            className="hover:text-slate-200 flex text-sm pl-1 items-center gap-2 text-slate-400"
          >
            <FaRegComment className="text-md" />
            Comments
          </Link>
          {user && user.isSignedIn && user.user.role === "admin" && (
            <>
              {" "}
              <Link
                to={categoriesRoute}
                className="hover:text-slate-200 flex text-sm pl-1 items-center gap-2 text-slate-400"
              >
                <BiCategory className="text-md" />
                Categories
              </Link>
              <Link
                to={usersAllDetailRoute}
                className="hover:text-slate-200 flex text-sm pl-1 items-center gap-2 text-slate-400"
              >
                <FaRegUser className="text-md" />
                Users
              </Link>
            </>
          )}
        </div>
        <div className=" bg-slate-900 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4">
          <h1 className="flex items-center gap-2 text-xl text-slate-200 font-semibold">
            <span className="text-green-600 p-2 bg-green-600/20 rounded-sm">
              <MdOutlineCategory />
            </span>{" "}
            Categories
          </h1>

          {categoryData &&
            categoryData.categories.map((category, index) => (
              <div key={index}>
                <Link
                  to={getBlogByCategoryRoute(category.slug)}
                  className="hover:text-slate-200  flex  items-center gap-1 text-slate-400"
                >
                  <GoDotFill />
                  {category.name}
                </Link>
              </div>
            ))}

        </div>
        <GithubBtn/>
      </div>

    </div>
  );
};

export default MobileNav;
