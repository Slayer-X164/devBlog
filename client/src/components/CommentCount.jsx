import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";

const CommentCount = ({ blogId }) => {
  const {
    data: commentData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog-comment/comments/${blogId}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  let commentsLength;
  if (commentData) {
    commentsLength = commentData.comments.length;
  }
  return (
    <>
      {loading ? (
        <div className="h-full mb-4 bg-slate-700 animate-pulse  rounded-xl p-4 shadow-lg border border-slate-800  transition-all duration-100   w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"></div>
      ) : (
        <div className="flex items-center gap-1">
          <FaRegComment /> {commentsLength || "0"}
        </div>
      )}
    </>
  );
};

export default CommentCount;
