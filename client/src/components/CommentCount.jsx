import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaRegComment } from 'react-icons/fa';

const CommentCount = ({blogId}) => {
    const {
        data: commentData,
        loading,
        error,
      } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/blog-comment/comments/${
          blogId
        }`,
        {
          method: "get",
          credentials: "include",
        }
      );
      let commentsLength
      if(commentData){
        commentsLength = commentData.comments.length
      }
  return (
    <div className='flex items-center gap-1'><FaRegComment /> {commentsLength || "0"}</div>
  )
}

export default CommentCount