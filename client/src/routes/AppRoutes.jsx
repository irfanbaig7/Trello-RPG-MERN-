import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default AppRoutes