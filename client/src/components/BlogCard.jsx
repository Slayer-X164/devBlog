import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { decode } from "entities";
import { Link } from "react-router-dom";
import { useMemo } from "react";
const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user);

  const rawDate = props.createdAt;
  const date = new Date(rawDate);
  const formatedDate = date.toLocaleDateString("en-GB");
  let time;
  let text;
  const getReadTime = (blogContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blogContent;
    text = tempDiv.textContent || tempDiv.innerText || "";

    const words = text.trim().split(/\s+/).length;
    time = `${Math.ceil(words / 200)} min read`;
  };
  getReadTime(props.blogContent);
  const blogDescription = decode(text.replace(/<[^>]*>?/gm, ""));
   const colorCombinations = useMemo(() => [
    { bg: "bg-yellow-600/20", text: "text-yellow-400" },
    { bg: "bg-green-600/20", text: "text-green-400" },
    { bg: "bg-blue-600/20", text: "text-blue-400" },
    { bg: "bg-purple-600/20", text: "text-purple-400" },
    { bg: "bg-pink-600/20", text: "text-pink-400" },
    { bg: "bg-red-600/20", text: "text-red-400" },
    { bg: "bg-indigo-600/20", text: "text-indigo-400" },
    { bg: "bg-teal-600/20", text: "text-teal-400" },
  ], []);

  // Function to get a random color combination
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorCombinations.length);
    return colorCombinations[randomIndex];
  };

  // Get random colors for the category
  const categoryColors = useMemo(() => getRandomColor(), []);

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 shadow-lg border border-slate-800 hover:border-slate-600 hover:drop-shadow-2xl hover:drop-shadow-slate-950 cursor-default transition-all duration-100   w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10  rounded-full flex items-center justify-center text-white  font-bold">
          <img
            src={props.author.photoURL || "user.png"}
            alt=""
            className=" rounded-full w-full border-2 border-slate-600"
          />
        </div>
        <div>
          <div className="flex gap-2 ">
            <p className="text-sm font-semibold text-pink-100">
              {props.author.name}
            </p>
            {props && props.author.role == "admin" && (
              <p className="text-sm flex justify-center items-center font-bold text-pink-600">
                {props.author.role}
              </p>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {formatedDate} • {time}
          </p>
        </div>
      </div>

      <Link className="hover:underline transform duration-200 text-lg md:text-xl font-bold text-blue-400 ">
        {props.title}
      </Link>

      <p style={{fontFamily:"Truculenta"}} className="text-sm text-slate-400 mt-2 line-clamp-2">
        {blogDescription}
      </p>

      <div className="flex gap-2 mt-4">
        <span className={`${categoryColors.bg} ${categoryColors.text} text-xs px-2 py-1 rounded-md`}>
          {props.category.name}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6 border-t border-slate-800 pt-3 text-slate-400 text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FaRegHeart /> 189
          </span>
          <span className="flex items-center gap-1">
            <FaRegComment /> 32
          </span>
        </div>
        <Link  className="text-blue-400 hover:underline">
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
