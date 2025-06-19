import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t-1 border-slate-900  text-center py-4 mt-10 text-slate-400">
      ✨made with passion by{" "}
      <a
        href="https://www.linkedin.com/in/siddhesh-ghag/"
        className="underline text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        Siddhesh
      </a>
    </footer>
  );
};

export default Footer;
