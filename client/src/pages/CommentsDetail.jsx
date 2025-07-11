import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { addCategoryRoute, editCategoryRoute } from "./pageRoutes";
import { showToast } from "@/features/showToast";
import { useSelector } from "react-redux";

const CommentsDetail = () => {
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user);

  const userData = { id: user.user._id, role: user.user.role };
  let {
    data: commentData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog/get-all/user-comments`,
    {
      method: "POST",
      credentials: "include",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(userData)
    },
    [refresh]
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog/delete-comment/${id}`,
        {
          method: "delete",
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (response) {
        setRefresh(!refresh);
        showToast("success", responseData.message);
      }
    } catch (error) {
      showToast("error", "error while deleting");
    }
  };
  return (
    <div className="text-slate-200 relative w-full h-[calc(100vh-72px)] bg-slate-950  md:flex justify-center p-4">
      <div className=" text-slate-300  rounded-lg shadow-xl w-full md:mx-10 my-4 overflow-scroll">
        {loading && <Loading />}
        <div className="w-full flex justify-center mb-4 "></div>
        <table className="w-full table-auto text-left bg- border-1 border-slate-800 ">
          <thead className="bg-slate-900 ">
            <tr className="">
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Blog
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                User
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Comment
              </th>
              <th className="py-4 px-3 text-sm tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {commentData && commentData?.comments?.length != 0 ? (
              commentData?.comments?.map((comment, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-slate-950 transition rounded-lg "
                >
                  <td className="py-4 px-3">
                    {comment.blogId ? comment.blogId.title : "No Blog"}
                  </td>
                  <td className="py-4 px-3 text-red-200">
                    {comment.author.name}
                  </td>
                  <td className="py-4 px-3 text-red-200">{comment.comment}</td>
                  <td className="py-4 px-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="bg-[#1c1c2b] hover:bg-[#2a2a3d] p-2 rounded-md text-red-500 transition cursor-pointer"
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
    </div>
  );
};

export default CommentsDetail;
