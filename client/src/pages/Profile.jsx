import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Dropzone from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import { showToast } from "@/features/showToast";
import { setUser } from "@/redux/user/user.slice";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [imageSource, setImageSource] = useState();
  const [saveLoad,setSaveLoad] = useState(false)
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
      setBio(userData.user.bio);
    }
  }, [userData]);

  const updateDataApiFunction = async (result) => {
    setSaveLoad(true)
    try {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("data", JSON.stringify(result));
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-user/${
          user.user._id
        }`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const responseData = await response.json();
      dispatch(setUser(responseData.user));
      showToast("success", responseData.message);
      setImageSource(responseData.user.photoURL);
      setSaveLoad(false)
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const formSchema = z.object({
    name: z.string().min(3, "name should be atleast 3 characters long"),
    email: z.string().email("enter valid email"),
    bio: z.string().max(300, "should be less than 300 characters"),
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState({ name: "", email: "", bio: "" });

  const handleSave = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse({ name, email, bio });
    if (result.success) {
      updateDataApiFunction(result.data);
      setError({ name: "", email: "", bio: "" });
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        name: fieldErrors.name || "",
        email: fieldErrors.email || "",
        bio: fieldErrors.bio || "",
      });
    }
  };
  const handleDropZoneFiles = (files) => {
    const file = files[0];
    const filePreview = URL.createObjectURL(file);
    setFile(file);
    setPreview(filePreview);
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] bg-slate-950 text-neutral-300 flex justify-center p-4">
      <div>
        {loading || saveLoad && <Loading />}

        <form
          onSubmit={handleSave}
          className="relative w-xl rounded-xl border-1 mt-4 p-6 flex  flex-col h-auto items-center   border-slate-700 gap-3"
        >
          <Dropzone
            onDrop={(acceptedFiles) => handleDropZoneFiles(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="relative from-indigo-200 via-indigo-500 to-indigo-950 bg-gradient-to-br rounded-full p-1 group w-36 ">
                    <img
                      src={preview ? preview : imageSource || "user.png"}
                      alt="user photo"
                      className="rounded-full "
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 hidden cursor-pointer justify-center items-center w-full h-full rounded-full overflow-hidden group-hover:flex">
                      <FaCamera className="text-2xl text-slate-300" />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

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
            {error.bio && (
              <h3 className="text-sm text-red-500 ">{error.bio}</h3>
            )}
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
