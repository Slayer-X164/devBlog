import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { addCategoryRoute, editCategoryRoute } from "@/pages/pageRoutes";
import { useFetch } from "@/hooks/useFetch";
import Loading from "./Loading";
import { showToast } from "@/features/showToast";


const Categories = () => {
  const [refresh, setRefresh] = useState(false);
  let {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/show-all-category`,
    {
      method: "get",
      credentials: "include",
    },
    [refresh]
  );
  // if (categoryData) {
  //   console.log(categoryData);
  // }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/category/delete-category/${id}`,
        {
          method: "delete",
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (response) {
        setRefresh(!refresh);
        showToast("success", "category deleted");
      }
    } catch (error) {
      showToast("error", "error while deleting");
    }
  };
  return (
    <div className=" text-slate-300  rounded-lg shadow-xl w-full mx-10 my-4 overflow-scroll flex flex-col items-center">
      {loading && <Loading />}
      <div className="w-full flex justify-center mb-4 ">
        <Link
          to={addCategoryRoute}
          className="flex justify-center items-center gap-1 py-2 px-4  rounded-lg border-dashed border-pink-500/30 border-2 hover:bg-pink-600/20 font-semibold cursor-pointer text-pink-300"
        >
          <IoMdAdd className="text-lg font-semibold " />
          Add Category
        </Link>
      </div>
      <table className="w-3/4 table-auto text-left bg- border-1 border-slate-800 ">
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
          {categoryData?.categories?.length > 0 ? (
            categoryData.categories.map((category, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-800 hover:bg-slate-950 transition rounded-lg "
              >
                <td className="py-4 px-3">{category.name}</td>
                <td className="py-4 px-3 text-purple-200">{category.slug}</td>
                <td className="py-4 px-3">
                  <div className="flex gap-3">
                    <Link to={editCategoryRoute(category._id)}>
                      <button className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-pink-400 transition cursor-pointer">
                        <FiEdit2 size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-pink-400 transition cursor-pointer"
                    >
                      <RiDeleteBin6Line size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 px-3">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
