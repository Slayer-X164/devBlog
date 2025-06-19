import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { addBlogRoute, updateBlogRoute } from "../pageRoutes";
import { z } from "zod";
const Blog = () => {


  return (
    <div className="text-slate-200 relative w-full h-[calc(100vh-72px)] bg-slate-950  flex justify-center p-4">
      <div className=" text-slate-300  rounded-lg shadow-xl w-full mx-10 my-4 overflow-scroll">
        {/* {loading && <Loading />} */}
        <div className="w-full flex justify-center mb-4 ">
          <Link
            to={addBlogRoute}
            className="flex justify-center items-center gap-1 py-2 px-4  rounded-lg border-dashed border-blue-500/50 border-2 hover:bg-blue-600/20 font-semibold cursor-pointer text-blue-300"
          >
            <IoMdAdd className="text-lg font-semibold " />
            Add Blog
          </Link>
        </div>
        <table className="w-full table-auto text-left bg- border-1 border-slate-800 ">
          <thead className="bg-slate-900 ">
            <tr className="">
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Author
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Category
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Title
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Slug
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Dated
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {categoryData && categoryData.categories.length > 0 ? (
            categoryData.categories.map((category, idx) => ( */}
            <tr className="border-b border-gray-800 hover:bg-slate-950 transition rounded-lg ">
              <td className="py-4 px-3">sidd</td>
              <td className="py-4 px-3 ">Frontend</td>
              <td className="py-4 px-3 text-blue-400">
                How to Make cool animations
              </td>
              <td className="py-4 px-3 ">
                How-to-Make-cool-animations
              </td>
              <td className="py-4 px-3 ">
                23/1/2025
              </td>
              <td className="py-4 px-3">
                <div className="flex gap-3">
                  <Link to={updateBlogRoute()}>
                    <button className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-blue-400 transition cursor-pointer">
                      <FiEdit2 size={16} />
                    </button>
                  </Link >
                  <button className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-blue-400 transition cursor-pointer">
                    <RiDeleteBin6Line size={16} />
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-4 px-3">Data Not Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
