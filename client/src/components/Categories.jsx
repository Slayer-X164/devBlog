import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { addCategoryRoute } from "@/pages/pageRoutes";

const categories = [
  { name: "Fashion & Beauty", slug: "fashion-beauty" },
  { name: "Wellness", slug: "wellness" },
  { name: "Sports", slug: "sports" },
  { name: "Technology", slug: "technology" },
  { name: "Food & Drinks", slug: "food-drinks" },
  { name: "Travel", slug: "travel" },

];

const Categories = () => {
  return (
    <div className=" text-slate-300  rounded-lg shadow-xl w-full mx-10 my-4 overflow-scroll">
        <div className="w-full flex justify-center mb-4 ">
            <Link to={addCategoryRoute} className="flex justify-center items-center gap-1 py-2 px-4  rounded-lg border-dashed border-pink-500/30 border-2 hover:bg-pink-600/20 font-semibold cursor-pointer text-pink-300"><IoMdAdd className="text-lg font-semibold " />Add Category</Link>
        </div>
      <table className="w-full table-auto text-left bg- border-1 border-slate-800 ">
        <thead className="bg-slate-900 ">
          <tr className="">
            <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
              CATEGORY NAME
            </th>
            <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
              SLUG
            </th>
            <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-800 hover:bg-slate-950 transition rounded-lg "
            >
              <td className="py-4 px-3">{category.name}</td>
              <td className="py-4 px-3 text-purple-200">{category.slug}</td>
              <td className="py-4 px-3">
                <div className="flex gap-3">
                  <button className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-pink-400 transition cursor-pointer">
                    <FiEdit2 size={16} />
                  </button>
                  <button className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-pink-400 transition cursor-pointer">
                    <RiDeleteBin6Line size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
