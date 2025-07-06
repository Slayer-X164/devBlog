import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaFire, FaHandsHelping, FaGrinStars } from "react-icons/fa";
import { GiDolphin } from "react-icons/gi";
import { BsEmojiDizzy } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import Loading from "@/components/Loading";
import { decode } from "entities";
import Comments from "@/components/Comments";
import { LiaCommentsSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { PiSignIn } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import EachComment from "@/components/EachComment";
import confetti from "canvas-confetti";
import Like from "@/components/Like";
import GithubBtn from "@/components/GithubBtn";
const BlogRead = () => {

  const { slug } = useParams();
  const user = useSelector((state) => state.user);
  let {
    data: blogData,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/read/${slug}`, {
    method: "get",
    credentials: "include",
  });
  let formatedDate;
  if (blogData) {
    const rawDate = blogData.blog.createdAt;
    const date = new Date(rawDate);
    formatedDate = date.toLocaleDateString("en-GB");
  }

  return (
    <div className="w-full md:p-8 p-5 flex-col md:flex-row items-start md:flex  justify-between  gap-6">
      <div className="w-[25%]  md:block hidden">
       <GithubBtn/>
      </div>
      <div className="md:w-[75%]  ">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full md:max-w-3xl mx-auto p-4 md:p-8  bg-slate-900  dark:text-white rounded-lg shadow-md">
            {/* Profile Section */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    (blogData && blogData.blog.author.photoURL) || "user.png"
                  }
                  alt="User"
                  className="w-11 h-11 rounded-full border-2 border-slate-500"
                />
                <div>
                  <h2 className="font-bold  text-lg">
                    {blogData && blogData.blog.author.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {blogData && formatedDate}
                  </p>
                </div>
              </div>
                  {blogData && user.isSignedIn && <Like blogId={blogData.blog._id}/>}
            </div>

            {/* Title */}
            <h1 className="text-4xl text-slate-200 font-extrabold mb-2">
              {blogData && blogData.blog.title}
            </h1>

            {/* Tags */}
            <div className="flex gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="text-blue-300 text-lg bg-blue-600/20 mt-4 py-1 px-4 rounded-lg">
                {blogData && blogData.blog.category.name}
              </span>
            </div>

            {/* Content */}
            <div
              dangerouslySetInnerHTML={
                blogData && {
                  __html: decode(blogData.blog.blogContent) || "",
                }
              }
              className="space-y-4 text-lg  text-slate-300"
            ></div>

            {/* Button */}
            {/* <div className="mt-6">
              <a
                href="#"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Live here 👉
              </a>
            </div> */}

            {/* Divider */}
            <hr className="my-10 border-gray-300 dark:border-gray-700" />

            {user.isSignedIn ? (
              blogData && <Comments props={blogData} />
            ) : (
              <Link
                to="/sign-in"
                className="cursor-pointer flex justify-center items-center gap-2 bg-indigo-600 rounded-lg py-2 px-4 text-md"
              >
                <PiSignIn />
                Sign in to Like & Comment
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogRead;
