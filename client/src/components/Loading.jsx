import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center absolute top-0 left-0 bg-slate-900/80 '><img className='w-14  animate-spin transition-all ease-in  ' src="/loading.png" alt="" /></div>
  )
}

export default Loading