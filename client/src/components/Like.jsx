import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
const Like = ({ blogId }) => {
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = user.user._id;
  const data = { userId, blogId };
  //   console.log(data);

  const {
    data: likeData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog/like-count/${blogId}`,
    {
      method: "get",
      credentials: "include",
    },
    [refresh]
  );
  useEffect(() => {
    if (likeData) {
      setLiked(!liked);
    

      setLikeCount(likeData.totalLikeCount != 0 && likeData.totalLikeCount);
    }
  }, [likeData]);
  const likeApiFunction = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog/like`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const resData = await response.json();
      if (resData) {
        setRefresh(!refresh);
      }
    } catch (error) {}
  };

  const handleLike = () => {
    likeApiFunction();

    if (liked) {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };
  return (
    <>
      <div
        onClick={handleLike}
        className="flex gap-4 text-lg mb-4 cursor-pointer active:scale-90"
      >
        <span className="flex items-center rounded-lg gap-1 bg-pink-500/10 py-1.5 px-2">
          <FaHeart className="text-pink-700" />

          {likeCount == 0 ? 0 : likeCount}
        </span>
      </div>
    </>
  );
};

export default Like;
