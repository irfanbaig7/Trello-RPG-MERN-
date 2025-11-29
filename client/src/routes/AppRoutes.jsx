import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Layout from '../components/layouts/Layout'
import DashboardPage from '../pages/DashboardPage'
import ProjectBoardPage from '../pages/ProjectBoardPage'
import LeaderboardPage from '../pages/LeaderboardPage'
import ProfilePage from '../pages/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'

const AppRoutes = () => {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />

                    {/* Auth */}
                    <Route path='/login' element={<Login />} />

                    {/* main app pages */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/project/:id" element={<ProjectBoardPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />

                    <Route path="/register" element={<RegisterPage />} />

                </Routes>
            </Layout>
        </div>
    )
}

export default AppRoutes