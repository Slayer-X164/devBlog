import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center absolute top-0 left-0 bg-slate-900/80 z-10'><img className='w-14  animate-spin transition-all ease-in  ' src="loading.png" alt="loader" /></div>
  )
}

export default Loading