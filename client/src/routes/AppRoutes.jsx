import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Layout from '../components/layouts/Layout'

const AppRoutes = () => {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </div>
    )
}

export default AppRoutes