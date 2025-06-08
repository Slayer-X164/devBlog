import React from 'react'
import Layout from './Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Test from './pages/Test'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path='/test' element={<Test/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App