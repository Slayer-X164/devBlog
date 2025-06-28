import React, { useState } from "react";
import { LiaCommentsSolid } from "react-icons/lia";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { z } from "zod";
import { showToast } from "@/features/showToast";
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import EachComment from "./EachComment";
const Comments = ({ props }) => {
  const user = useSelector((state) => state.user);
  const blogId = props.blog._id
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [refresh,setRefresh] = useState(false)
  const formSchema = z.object({
    comment: z.string().nonempty("Enter a valid comment"),
  });
  let resData
  const CommentApiFunction = async (result) => {
    const newResult = {
      author: user.user._id,
      blogId: props.blog._id,
      result,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog-comment/add`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newResult),
        }
      );
      resData = await response.json();
      if (resData) {
        showToast("success", resData.message);
        setRefresh(!refresh)
        
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse({ comment });
    if (result.success) {
      setComment("");
      setCommentError("");
      CommentApiFunction(result.data.comment);
    } else {
      const fieldError = result.error.flatten().fieldErrors.comment;
      console.log(fieldError);
      setCommentError(fieldError);
    }
  };

  return (
    <div className="w-full">
      <h2 className="flex items-center gap-2 text-2xl font-bold pb-4">
              <LiaCommentsSolid className="text-blue-500" /> Comments
            </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="w-full p-2 bg-slate-700/50 rounded-lg flex items-center ">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write your comment here..."
            className="p-2 flex-1 outline-none border-none"
          />
          <button className="p-2 cursor-pointer bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            <IoPaperPlaneOutline />
          </button>
        </div>
        {commentError && (
          <p className="pt-1 p-1 text-red-500 text-sm">{commentError}</p>
        )}
      </form>
      <EachComment props={{ blogId: blogId,refresh:refresh}} />
    </div>
  );
};

export default Comments;
