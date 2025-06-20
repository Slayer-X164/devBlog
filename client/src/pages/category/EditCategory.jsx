import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { categoriesRoute } from "../pageRoutes";
import slugify from "slugify";
import { showToast } from "@/features/showToast";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";

const EditCategory = () => {
  const [catName, setCatName] = useState("");
  const [catSlug, setSlug] = useState("");
  const [catError, setCatError] = useState({ catName: "", catSlug: "" });

  const { categoryId } = useParams();

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/show-category/${categoryId}`,
    {
      method: "get",
      credentials: "include",
    },
    [categoryId]
  );
  useEffect(() => {
    if (categoryData) {
      setCatName(categoryData.category.name);
      setSlug(categoryData.category.slug);
    }
  }, [categoryData]);

  const updateCategoryApiFunction = async (result) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/category/update-category/${categoryId}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(result),
        }
      );
      const responseData = await response.json();
   

      showToast("success", responseData.message);
    } catch (error) {
      console.log(error);

      showToast("error", error.message);
    }
  };
  const formSchema = z.object({
    name: z.string().min(3, "Category name must be atleast 3 characters long"),
    slug: z.string().min(3, "Category slug must be atleast 3 characters long"),
  });
  const handleChangeName = (e) => {
    const value = e.target.value;
    setCatName(value);
    const generatedSlug = slugify(value, {
      lower: true,
      strict: true,
      trim: true,
    });
    setSlug(generatedSlug);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse({
      name: catName,
      slug: catSlug,
    });
    if (result.success) {
      updateCategoryApiFunction(result.data);
      setCatError({ catName: "", catSlug: "" });
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setCatError({
        catName: fieldErrors.name?.[0],
        catSlug: fieldErrors.slug?.[0],
      });
    }
  };

  return (
    <div className="w-full  flex justify-start mt-10 gap-6 items-center p-4 flex-col">
      <form
        onSubmit={handleAddCategory}
        className="relative w-xl rounded-xl  border-dashed mt-4 p-6 flex  flex-col h-auto items-center   border-pink-700/50 gap-3 bg-slate-900/50"
      >
        {loading && <Loading />}
        <div>
          <h1 className="text-slate-400 font-semibold text-2xl">
            Edit Category
          </h1>
        </div>
        <div className="flex flex-col gap-1 w-full text-md text-slate-400">
          <label className="text-lg">Name</label>
          <input
            value={catName}
            onChange={handleChangeName}
            type="text"
            placeholder="Enter Your Name"
            className="p-2 w-full rounded-md bg-slate-800/50 outline-none"
          />
          {catError.catName && (
            <h3 className="text-sm text-red-500 ">{catError.catName}</h3>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full text-md text-slate-400">
          <label className="text-lg">slug</label>
          <input
            value={catSlug}
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
            className="p-2 w-full rounded-md bg-slate-800/50 outline-none"
          />
          {catError.catSlug && (
            <h3 className="text-sm text-red-500 ">{catError.catSlug}</h3>
          )}
        </div>
        <div className="w-full mt-5 ">
          <button
            type="submit"
            className="rounded-full text-lg w-full py-2 px-4 cursor-pointer  border-2 border-pink-600/50 hover:bg-pink-600/20 border-dashed text-pink-300 font-semibold"
          >
            save changes
          </button>
        </div>
      </form>
      <div>
        <Link
          to={categoriesRoute}
          className="flex items-center gap-0.5 text-sm text-slate-400 font-light border-b "
        >
          <IoMdArrowBack />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default EditCategory;
