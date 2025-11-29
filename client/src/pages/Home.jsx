import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to Task Game 🎮</h2>
            <p className="text-gray-700">
                Manage your tasks, earn points, level up, and compete on the leaderboard!
            </p>

            <div className="flex gap-4 mt-4">
                {/* Login Button */}
                <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Login
                </Link>

                {/* Dashboard Button */}
                <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default Home