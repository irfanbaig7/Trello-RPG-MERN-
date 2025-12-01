import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    // If user is not logged in -> redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    // Otherwise, render the page
    return children;

}

export default ProtectedRoute