import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = ({ options, selected , onChange, }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <div
        className="bg-slate-200 text-slate-900 px-4 py-2 rounded-xl flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{selected || "Choose Category"}</span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute w-full bg-slate-800 mt-2 rounded-xl shadow-md z-10 text-slate-300 max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option.name);
                setOpen(false);
              }}
              className={`px-4 py-2 hover:bg-slate-700 cursor-pointer ${
                selected === option.name ? "bg-slate-700" : ""
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
