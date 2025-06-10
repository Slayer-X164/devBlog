import { auth, provider } from "@/features/auth/fireBase";
import { showToast } from "@/features/showToast";
import { setUser } from "@/redux/user/user.slice";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    const googleResponse = await signInWithPopup(auth, provider);
    const userData = {
      name: googleResponse.user.displayName,
      email: googleResponse.user.email,
      photoURL: googleResponse.user.photoURL,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google/sign-in`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      } else {
        dispatch(setUser(data))
        navigate("/");
        showToast("success", data.message);

      }
    } catch (error) {
      showToast("error", console.error.message);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      className="flex text-slate-300 items-center justify-center w-full border border-slate-400 py-2 px-4 rounded-md mb-4 hover:bg-slate-800 cursor-pointer transition"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="h-5 w-5 mr-2"
      />
      Continue With Google
    </button>
  );
};

export default GoogleAuth;
