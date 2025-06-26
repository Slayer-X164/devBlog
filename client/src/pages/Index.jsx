import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const Index = () => {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog/get-all`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  // if (data) {
  //   console.log(data.allBlogs);
  // }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-6  w-full  bg-slate-950 text-slate-400">
      <h1 style={{fontFamily:"Truculenta"}} className="font-mono text-5xl text-slate-300 font-bold">
        Latest Developer Posts
      </h1>
      <p  className="text-md pt-1 pb-4">
        discover the latest projects, insights and discussions from the
        developer community
      </p>
      <div className="columns-1 sm:columns-2 lg:columns-2  gap-4 mt-4">
        {data &&
          data.allBlogs.map((eachBlog) => (
            <div key={eachBlog._id} className="mb-4 break-inside-avoid">
              <BlogCard props={eachBlog} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
