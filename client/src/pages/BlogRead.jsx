import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaFire, FaHandsHelping, FaGrinStars } from "react-icons/fa";
import { GiDolphin } from "react-icons/gi";
import { BsEmojiDizzy } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import Loading from "@/components/Loading";
import { decode } from "entities";
const BlogRead = () => {
  const { slug } = useParams();
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
    console.log(blogData);
    const rawDate = blogData.blog.createdAt;
    const date = new Date(rawDate);
    formatedDate = date.toLocaleDateString("en-GB");
  }

  return (
    <div className="w-full p-8  flex justify-between  gap-6">
      <div className="w-[25%]  ">
        <div className="bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col justify-center items-center gap-3 p-4">
          <Link
            to="https://github.com/Slayer-X164/devBlog"
            target="_blank"
            className="text-yellow-200   text-md font-mono bg-yellow-400/10 rounded-lg  py-2 px-4 flex items-center justify-center gap-2"
          >
            give a star <FaGithub />
          </Link>
        </div>
      </div>
      <div className="w-[75%]  ">
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-md">
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
                  <h2 className="font-bold text-lg">
                    {blogData && blogData.blog.author.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {blogData && formatedDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-md mb-4">
                <span className="flex items-center rounded-lg gap-1 bg-pink-500/20 py-1 px-2">
                  <FaHeart className="text-pink-700" /> 10
                </span>
              </div>
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
              dangerouslySetInnerHTML={blogData &&{
                __html: decode( blogData.blog.blogContent) || "",
              }}
              className="space-y-4 text-lg leading-relaxed"
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

            {/* Why tho? */}
            <h2 className="text-2xl font-bold mb-2">Comments</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogRead;
