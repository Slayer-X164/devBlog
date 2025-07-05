import React, { useEffect, useState } from "react";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
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

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);

  const user = useSelector((state) => state.user);

  const [error, setError] = useState({
    title: "",
    slug: "",
    category: "",
    blogContent: "",
  });
  const [selectedOption, setSelectedOption] = useState();

  let {
    data: categoryData,
    loading,
    error: categoryError,
  } = useFetch(
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
  const addBlogApiFunction = async (result) => {
    const newResult = {
      ...result,
      author: user.user._id,

    };

    try {
      loading = true;
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newResult),
        }
      );

      const responseData = await response.json();
      if (response) {
        showToast("success", responseData.message);
        navigate("/blog");
        setSlug("");
        setTitle("");
      }
    } catch (error) {
      console.log(error.message);
      showToast("error", error.message);
    } finally {
      loading = false;
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
      addBlogApiFunction(result.data);
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
    <div className="w-full  md:flex justify-start  gap-6 items-center p-5 md:p-4 flex-col">
      <form
        onSubmit={handleSubmit}
        className="relative md:w-2xl rounded-xl  border-dashed mt-4 p-6 flex  flex-col h-auto items-center   border-pink-700/50 gap-3 bg-neutral-50"
      >
        {loading && <Loading />}
        <div>
          <h1 className="text-blue-500  font-semibold text-2xl">
            Create New Blog Post
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
          <Editor initialData={""} handleEditorData={handleEditorData} />
          {error.blogContent && (
            <h3 className="text-sm text-red-500 ">{error.blogContent}</h3>
          )}
        </div>

        <div className="w-full mt-5 ">
          <button
            type="submit"
            className="rounded-full text-lg w-full py-2 px-4 cursor-pointer  border-2 border-blue-600 hover:bg-blue-600/30 border-dashed text-blue-500 font-semibold"
          >
            Post Blog
          </button>
        </div>
      </form>
          <div>
        <Link
          to={blogRoute}
          className=" items-center hidden md:flex gap-0.5 text-sm text-slate-400 font-light border-b "
        >
          <IoMdArrowBack />
          Go Back
        </Link>
      </div>
    </div>

  );

};

export default AddBlog;
