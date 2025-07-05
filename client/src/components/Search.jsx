import { searchRoute } from "@/pages/pageRoutes";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Search = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const getInput = (e) => {
    setQuery(e.target.value);
    navigate(searchRoute(query));
  };
  return (
    <div className="flex items-center justify gap-2 p-2 rounded-lg border border-slate-700  bg-slate-900/50 text-neutral-400">
      <IoIosSearch />
      <input
        type="text"
        placeholder="search..."
        name="query"
        onInput={getInput}
        onChange={handleSearch}
        className="w-56 outline-none border-none"
      />
    </div>
  );
};

export default Search;
