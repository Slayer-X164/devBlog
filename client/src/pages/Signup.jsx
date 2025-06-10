import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/features/showToast";
import GoogleAuth from "@/components/GoogleAuth";
const Signup = () => {
  const navigate = useNavigate();
  //zod schema
  const formSchema = z
    .object({
      name: z.string().min(3, "name must be atleast 3 characters long"),
      email: z.string().email("enter valid email"),
      password: z.string().min(6, "password must be atleast 6 character long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "password does not match",
    });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const signUpApiFunction = async (result) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials:'include',
          body: JSON.stringify(result),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      } else {
        navigate("/sign-in");
        showToast("success", data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("worked");

    const result = formSchema.safeParse({
      email,
      password,
      name,
      confirmPassword,
    });
    if (result.success) {
      signUpApiFunction(result.data);
      setError({ email: "", password: "", name: "", confirmPassword: "" });
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        email: fieldErrors.email?.[0] || "",
        name: fieldErrors.name?.[0] || "",
        password: fieldErrors.password?.[0] || "",
        confirmPassword: fieldErrors.confirmPassword?.[0] || "",
      });
    }
  };
  return (
    <div className="text-neutral-200 h-screen w-full flex items-center justify-center p-3">
      <div className="drop-shadow-2xl drop-shadow-blue-600/12 w-96 h-auto py-6 px-4 rounded-lg bg-slate-900 flex flex-col ">

        <div>
          <h1 className="text-2xl text-center mb-6 text-slate-500 font-semibold">
            Create Your Account
          </h1>
        </div>
         {/* <GoogleAuth/> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-400 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="enter your name"
              className="w-full border border-slate-400 rounded-md text-slate-400 px-4 py-2 outline-none"
            />
            {error.name && (
              <p className=" ml-2 text-red-500 text-sm">{error.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-slate-400 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="enter your email"
              className="w-full border border-slate-400 text-slate-400  rounded-md px-4 py-2 outline-none"
            />
            {error.email && (
              <p className=" ml-2 text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="enter your password"
              className="w-full border border-slate-400 text-slate-400  rounded-md px-4 py-2 outline-none"
            />
            {error.password && (
              <p className="ml-2 text-red-500 text-sm">{error.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 mb-1">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="confirm your password"
              className="w-full border border-slate-400 text-slate-400  rounded-md px-4 py-2 outline-none"
            />
            {error.confirmPassword && (
              <p className="ml-2 text-red-500 text-sm">
                {error.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 cursor-pointer transition"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?
          <Link to="/sign-In" className="text-blue-600 p-1  hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
