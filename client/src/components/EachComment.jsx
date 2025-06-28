import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { MdComment } from "react-icons/md";
import Loading from "./Loading";
const EachComment = ({ props }) => {
  const {
    data: commentData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog-comment/comments/${
      props.blogId
    }`,
    {
      method: "get",
      credentials: "include",
    },[props.refresh]
  );
  // if (commentData) {
  //   console.log("props:", props.blogId, "and", commentData.comments);
  // }
if(loading){
  return <Loading/>
}
  return (
    <>
      {commentData &&
        commentData.comments.map((e, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-slate-800/30 rounded-2xl mt-3"
          >
            {/* Avatar */}
            <div>
              <img
                src={e.author.photoURL || "user.png"}
                alt="Floyd Miles"
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Name */}
              <h4 className="font-semibold">{e.author.name}</h4>

              {/* Message */}
              <p className="mt-1 text-slate-200 text-sm">{e.comment}</p>

              {/* Reactions */}
              <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
               
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default EachComment;
