import React, { useState } from "react";
import logo from "@/assets/code.png"
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/features/showToast";
import { addBlogRoute, IndexRoute, signInRoute } from "@/pages/pageRoutes";
import Search from "./Search";

const Header = () => {
  const dispatch = useDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const handleDropDown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };
  const handleSignOut = async () => {
    console.log(`${import.meta.env.VITE_API_BASE_URL}/auth/sign-out`);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-out`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      // console.log(user.user.photoURL);

      if (!response.ok) {
        showToast("error", data.message);
      } else {
        dispatch(removeUser());
        navigate("/");
        showToast("success", data.message);
      }
    } catch (error) {
      showToast("error", console.error.message);
    }
  };
  return (
    <header className=" w-full h-18 bg-slate-950 border-slate-900 border-b text-white flex items-center px-6 shadow justify-between">
      <Link to={IndexRoute} className="flex justify-center items-center gap-1">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="text-2xl font-semibold font-mono">DevBlog</h1>
      </Link>
      <div className="flex items-center gap-6">
        {/* search */}
        <Search/>
        <div>
          <Link to={user.isSignedIn?addBlogRoute:signInRoute}>
          <button className="cursor-pointer flex justify-center items-center gap-2 bg-gradient-to-br from-blue-300 via-blue-600 to-blue-950 rounded-lg py-2 px-4 text-md">
            <FaPencilAlt />
            Write Post
          </button>
          </Link>
        </div>
      </div>
      {!user.isSignedIn ? (
        <div className="bg-gradient-to-br p-0.5 from-yellow-200 via-yellow-700 to-red-950  rounded-lg shadow-lg shadow-yellow-500/15">
          <Link to="/sign-in" className="cursor-pointer flex justify-center items-center gap-2 bg-slate-950 text-yellow-50  rounded-lg py-2 px-4 text-md">
            <PiSignIn />
            Sign in
          </Link>
        </div>
      ) : (
        <div
          onClick={handleDropDown}
          className=" relative cursor-pointer p-[1px] bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-950  rounded-md"
        >
          <div className="p-2  rounded-md flex items-center gap-2 bg-slate-950">
            <img
              src={user.user.photoURL || "user.png"}
              alt=""
              className="w-6 rounded-full"
            />
            <h3 className="text-sm truncate max-w-22">{user.user.name}</h3>
            <div>{dropdownIsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
          </div>
          {dropdownIsOpen && (
            <div className="p-[1px] z-10 absolute top-14 -left-27 rounded-lg bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-950 cursor-default">
              <div className="min-w-60 py-2 px-4  bg-slate-950  rounded-lg flex justify-center flex-col">
                <div className="w-full flex items-start flex-col p-1.5 border-b pb-2 border-slate-700">
                  <h2 className="text-lg text-slate-300 font-semibold">
                    {user.user.name}
                  </h2>
                  <h2 className="text-sm text-slate-400 pb-2">
                    {user.user.email}
                  </h2>
                </div>
                <div className="w-full flex items-start flex-col p-1.5 border-b pb-2 border-slate-700 gap-2">
                  <Link
                    to="/profile"
                    className="text-md flex items-center gap-1  font-semibold text-slate-400 hover:bg-slate-800 rounded-lg p-1 cursor-pointer w-full"
                  >
                    <FaRegUser className="text-yellow-500" />
                    Profile
                  </Link>
                  <Link
                    to={addBlogRoute}
                    className="text-md flex items-center gap-1  font-semibold text-slate-400 hover:bg-slate-800 rounded-lg  p-1 cursor-pointer w-full"
                  >
                    <FaPlus className="text-blue-500" />
                    Create Post
                  </Link>
                </div>
                <div className="w-full flex items-start flex-col p-1.5   border-slate-700">
                  <button
                    onClick={handleSignOut}
                    className="text-md flex items-center gap-1  font-semibold text-slate-400 p-1 hover:bg-slate-800 rounded-lg cursor-pointer w-full "
                  >
                    <VscSignOut className="text-lg text-red-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
