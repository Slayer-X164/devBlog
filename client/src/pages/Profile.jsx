import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { z } from "zod";
const Profile = () => {
  const user = useSelector((state) => state.user);

  //fetchData hook
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/user/get-user/${
    user.user._id
  }`;

  const {
    data: userData,
    loading,
    error: userError,
  } = useFetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  useEffect(() => {
    if (userData && userData.success) {
      setName(userData.user.name);
      setEmail(userData.user.email);
    }
  }, [userData]);

  const formSchema = z.object({
    name: z.string().min(3, "name should be atleast 3 characters long"),
    email: z.string().email("enter valid email"),
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState({ name: "", email: "" });

  const handleSave = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse({ name, email });
    if (result.success) {
      setError({ name: "", email: "" });
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        name: fieldErrors.name || "",
        email: fieldErrors.email || "",
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] bg-slate-950 text-neutral-300 flex justify-center p-4">
      <div>
        {loading && <Loading />}
        <form
          onSubmit={handleSave}
          className="relative w-xl rounded-xl border-1 mt-4 p-6 flex  flex-col h-auto items-center   border-slate-700 gap-3"
        >
          <div className="from-indigo-200 via-indigo-500 to-indigo-950 bg-gradient-to-br rounded-full p-1">
            <img
              src={userData?.name?.photoURL || "user.png"}
              alt="user photo"
              className="w-34"
            />
          </div>
          <div className="flex flex-col gap-1 w-full text-md text-slate-400">
            <label className="text-lg">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className="p-2 w-full rounded-md bg-slate-800/50 outline-none"
            />
            {error.name && (
              <h3 className="text-sm text-red-500 ">{error.name}</h3>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full text-md text-slate-400">
            <label className="text-lg">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="p-2 w-full rounded-md bg-slate-800/50 outline-none"
            />
            {error.email && (
              <h3 className="text-sm text-red-500 ">{error.email}</h3>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full text-md text-slate-400">
            <label className="text-lg">Bio</label>
            <textarea
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter Your Bio"
              className="p-2 w-full rounded-md bg-slate-800/50 outline-none"
            ></textarea>
          </div>
          <div className="w-full mt-5 ">
            <button
              type="submit"
              className="rounded-full text-lg w-full py-2 px-4 cursor-pointer bg-gradient-to-br from-slate-950 inset-shadow-sm  inset-shadow-blue-900 via-blue-700 to-slate-950"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
