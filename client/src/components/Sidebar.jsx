import React from 'react'
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from 'react-router-dom';
const Sidebar = () => {
     const sidebarLinks = [
    { label: 'Home', path: '/home' , icon: <FaHome />},
    { label: 'Categories', path: '/categories', icon: <BiCategory />}  ,
    { label: 'Blogs', path: '/blogs', icon: <IoDocumentTextOutline />} ,
    { label: 'Comments', path: '/comments', icon: <FaRegComment />} ,
    { label: 'Users', path: '/users', icon: <FaRegUser />} ,
  ];
  const categoryLinks = [
    {label: 'Javascript', path: '/', icon:<GoDotFill /> },
    {label: 'Python', path: '/', icon:<GoDotFill /> },
  ]
  return (
    <div className="h-[calc(100vh-72px)] w-96 bg-slate-950 text-white pr-8 py-8 flex gap-6 flex-col">
        <div className='bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4'>
            {sidebarLinks.map(({label,path,icon},index)=>(
           <div key={index}>
             <Link to={path} className='hover:text-slate-200 flex items-center gap-1 text-slate-400'>{icon}{label}</Link>
           </div>
        ))}
        </div>
        <div className='bg-slate-900/50 w-full border-1 border-slate-800 rounded-lg flex flex-col gap-3 p-4'>
            <h1 className='flex items-center gap-2 text-xl text-slate-200 font-semibold'><span className='text-green-600 p-2 bg-green-600/20 rounded-sm'><MdOutlineCategory /></span> Categories</h1>
            {categoryLinks.map(({label,path,icon},index)=>(
           <div key={index}>
             <Link to={path} className='hover:text-slate-200  flex  items-center gap-1 text-slate-400'>{icon}{label}</Link>
           </div>
        ))}
        </div>
    </div>
  )
}

export default Sidebar