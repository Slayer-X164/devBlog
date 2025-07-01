import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogByCategory = () => {
  const { category } = useParams();

  let {
    data: blogData,
    loading,
    error: blogError,
  } = useFetch(
    ` ${import.meta.env.VITE_API_BASE_URL}/blog/get-all/${category}`,
    {
      method: "get",
      credentials: "include",
    },
    [category]
  );
  if (blogData) {
    console.log(blogData);
  }

  return (
    <div className="p-6  w-full  bg-slate-950 text-slate-400">
      <div className="columns-1 sm:columns-2 lg:columns-2  gap-4 mt-4">
        {loading && <Loading />}
        {blogData &&
          blogData.blogs.map((blog) => (
            <div key={blog._id} className="mb-4 break-inside-avoid">
              <BlogCard props={blog} />
            </div>
          ))}
      </div>
      {blogData && blogData.blogs.length == 0 && (
        <div className="w-full ">
          <h2 className="text-center">No Blog Available in this Category</h2>
        </div>
      )}
    </div>
  );
};

export default BlogByCategory;
