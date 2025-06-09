import { showToast } from "@/features/showToast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
const Signin = () => {
  const navigate = useNavigate();
  //zod schema
  const formSchema = z.object({
    email: z.string().email("enter valid email"),
    password: z.string().min(6, "password must be atleast 6 character long"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const signInApiFunction = async (result) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(result),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", `error: ${data.message}`);
      } else {
        navigate("/");
        showToast("success", data.message);
      }
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    console.log("worked signin");

    e.preventDefault();
    const result = formSchema.safeParse({ email, password });
    if (result.success) {
      signInApiFunction(result.data);
      setError({ email: "", password: "" });
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
    }
  };
  return (
    <div className="text-neutral-200 h-screen w-full flex items-center justify-center p-3">
      <div className="drop-shadow-2xl drop-shadow-blue-600/12 w-96 h-auto py-6 px-4 rounded-lg bg-slate-900 flex flex-col ">
        <div>
          <h1 className="text-2xl text-center mb-6 text-slate-500 font-semibold">
            Login Into Account
          </h1>
        </div>
        <button className="flex text-slate-300 items-center justify-center w-full border border-slate-400 py-2 px-4 rounded-md mb-4 hover:bg-slate-800 cursor-pointer transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Continue With Google
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-slate-500" />
          <span className="mx-2 text-slate-500">OR</span>
          <hr className="flex-grow border-slate-500" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-400 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-400  text-slate-400 rounded-md px-4 py-2 outline-none"
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
              placeholder="Enter your password"
              className="w-full border border-slate-400 text-slate-400  rounded-md px-4 py-2 outline-none"
            />
            {error.password && (
              <p className="ml-2 text-red-500 text-sm">{error.password}</p>
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
          Don't have account?
          <Link to="/sign-up" className="text-blue-600 p-1  hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
