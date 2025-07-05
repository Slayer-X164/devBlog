import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const GithubBtn = () => {
  return (
    <div className="bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col justify-center items-center gap-3 p-4">
      <Link
        to="https://github.com/Slayer-X164/devBlog"
        target="_blank"
        className="text-yellow-200   text-md font-mono bg-yellow-400/10 rounded-lg  py-2 px-4 flex items-center justify-center gap-2"
      >
        give a star <FaGithub />
      </Link>
    </div>
  );
};

export default GithubBtn;
