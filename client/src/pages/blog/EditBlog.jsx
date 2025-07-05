import React, { useEffect, useState } from "react";
import z from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { blogRoute } from "../pageRoutes";
import slugify from "slugify";
import Select from "@/components/Select";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Dropzone from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import Editor from "@/components/Editor";
import { showToast } from "@/features/showToast";
import { useSelector } from "react-redux";
import { decode } from "entities";
const EditBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.user);
  const blogId = useParams();

  const [error, setError] = useState({
    title: "",
    slug: "",
    category: "",
    blogContent: "",
  });
  const [selectedOption, setSelectedOption] = useState();

  const {
    data: blogData,
    loading,
    error: blogError,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog/get/${blogId.blog_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [refresh]
  );
  let { data: categoryData } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/show-all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );
  useEffect(() => {
    if (categoryData) {
      setCategoryOption(categoryData.categories);
    }
  }, [categoryData]);
  useEffect(() => {
    if (blogData) {
      setTitle(blogData.blog.title);
      setSlug(blogData.blog.slug);
      setSelectedOption(blogData.blog.category.name);
      setBlogContent(decode(blogData.blog.blogContent));
    }
  }, [blogData]);
  const updateBlogApiFunction = async (result) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog/update/${blogId.blog_id}`,
        {
          method: "put",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(result),
        }
      );
      const responseData = await response.json();
      if (response) {
        setRefresh(!refresh);
        showToast("success", responseData.message);
        console.log(responseData);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const blogFormSchema = z.object({
    title: z.string().min(3, "title must be atleast 3 character long"),
    category: z.string().min(3, "category must be atleast 3 character long"),
    slug: z.string().min(3, "slug must be atleast 3 character long"),
    blogContent: z
      .string()
      .min(3, "blog content must be atleast 3 character long"),
  });
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    const generatedSlug = slugify(value, {
      lower: true,
      strict: true,
      trim: true,
    });
    setSlug(generatedSlug);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = blogFormSchema.safeParse({
      title,
      category: selectedOption,
      slug,
      blogContent,
    });
    if (result.success) {
      setError({ title: "", slug: "", category: "", blogContent: "" });
      updateBlogApiFunction(result.data);
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        title: fieldErrors.title,
        slug: fieldErrors.slug,
        category: fieldErrors.category,
        blogContent: fieldErrors.blogContent,
      });
    }
  };

  const handleEditorData = (e, editor) => {
    const data = editor.getData();
    setBlogContent(data);
  };
  return (
    <div className="w-full  md:flex justify-start  gap-6 items-center p-4 flex-col">
      <form
        onSubmit={handleSubmit}
        className="relative md:w-2xl rounded-xl  border-dashed mt-4 p-4 md:p-6 flex  flex-col h-auto items-center   border-pink-700/50 gap-3 bg-neutral-50"
      >
        {loading && <Loading />}
        <div>
          <h1 className="text-green-600  font-semibold text-2xl">
            Edit Your Blog
          </h1>
        </div>
        <div className="flex flex-col gap-1 w-full text-md text-slate-900">
          <label className="text-lg">Title</label>
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            placeholder="Enter Blog Title"
            className="p-2 w-full rounded-md bg-slate-200 outline-none border-2 border-dashed border-slate-400"
          />
          {error.title && (
            <h3 className="text-sm text-red-500 ">{error.title}</h3>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full text-md text-slate-900">
          <label className="text-lg">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            placeholder="Enter Blog Slug"
            className="p-2 w-full rounded-md bg-slate-200 outline-none border-2 border-dashed border-slate-400"
          />
          {error.slug && (
            <h3 className="text-sm text-red-500 ">{error.slug}</h3>
          )}
        </div>
        <div className="flex flex-col justify-center items-start  gap-1 w-full text-md text-slate-900">
          <label className="text-lg ">Category</label>
          <Select
            options={categoryOption}
            selected={selectedOption}
            onChange={setSelectedOption}
            // placeholder="Choose Category"
          />
          {error.category && (
            <h3 className="text-sm text-red-500 ">{error.category}</h3>
          )}
        </div>

        {/* editor */}
        <div className=" w-full flex flex-col gap-2">
          <label className="text-lg ">Blog Content</label>
          {blogContent && (
            <Editor
              initialData={blogContent}
              handleEditorData={handleEditorData}
            />
          )}
          {error.blogContent && (
            <h3 className="text-sm text-red-500 ">{error.blogContent}</h3>
          )}
        </div>

        <div className="w-full mt-5 ">
          <button
            type="submit"
            className="rounded-full text-lg w-full py-2 px-4 cursor-pointer  border-2 border-green-700 hover:bg-green-600/30 border-dashed text-green-700 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div>
        <Link
          to={blogRoute}
          className="md:flex hidden  items-center gap-0.5 text-sm text-slate-400 font-light border-b "
        >
          <IoMdArrowBack />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default EditBlog;
