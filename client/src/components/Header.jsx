import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
const Header = () => {
  return (
    <header className=" w-full h-18 bg-slate-950 border-slate-900 border-b text-white flex items-center px-6 shadow justify-around">
      <div className="flex justify-center items-center gap-1">
        <img src="code.png" alt="logo" className="w-10" />
        <h1 className="text-2xl font-semibold font-mono">DevBlog</h1>
      </div>
      <div className="flex items-center gap-3">

        <div className="flex items-center justify gap-2 p-2 rounded-md border border-slate-700  bg-slate-900 text-neutral-500">
          <IoIosSearch />
          <input
            type="text"
            placeholder="search..."
            className="w-56 outline-none border-none"
          />
        </div>
        <div>
          <button className="cursor-pointer flex justify-center items-center gap-2 bg-blue-600 rounded-lg py-2 px-4 text-md">
            <FaPencilAlt />
            <Link>Write Post</Link>
          </button>
        </div>
        <div>
          <button className="cursor-pointer flex justify-center items-center gap-2 bg-indigo-600 rounded-lg py-2 px-4 text-md">
            <PiSignIn />
           <Link>Sign in</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
