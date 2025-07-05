import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  // console.log(query);
  let {
    data: blogData,
    loading,
    error: blogError,
  } = useFetch(
    ` ${import.meta.env.VITE_API_BASE_URL}/blog/search?query=${query}`,
    {
      method: "get",
      credentials: "include",
    },[query]
  );
  // if (blogData) {
  //   console.log(blogData);
  // }
  return (
    <div className="p-6 min-h-[calc(100vh-72px)] w-full relative bg-slate-950 text-slate-400">
      <h1 className="text-2xl md:text-4xl pb-3 font-bold text-slate-300">Search Result for : <span className="font-light">{query}</span></h1>
      <div className="columns-1 sm:columns-2 lg:columns-2  gap-4 mt-4">
        {loading && <Loading />}
        {blogData &&
          blogData.searchResult.map((blog) => (
            <div key={blog._id} className="mb-4 break-inside-avoid">
              <BlogCard props={blog} />
            </div>
          ))}
      </div>
      {blogData && blogData.searchResult.length == 0 && (
        <div className="w-full ">
          <h2 className="text-center">Blog Not Found</h2>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
