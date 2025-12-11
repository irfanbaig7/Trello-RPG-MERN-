import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import XPBar from "../game/XPBar";
import { useGameStore } from "../../store/useGameStore";

function Navbar() {
  const { points, level } = useGameStore();

  const navigate = useNavigate();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();          // clear Zustand + localStorage
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="w-full bg-gray-100 p-4 mb-4 rounded flex justify-between items-center">
      {/* Left side: Logo / Home */}
      <Link to="/">
        <h1 className="text-lg font-semibold">Task Game</h1>
      </Link>

      {/* Right side: Links based on auth state */}
      <div className="flex items-center gap-4 text-sm">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">
              Hi, <span className="font-semibold">{user?.name}</span>
            </span>

            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>

            <Link to="/leaderboard" className="hover:underline">
              Leaderboard
            </Link>

            <div className="hidden md:block w-48">
              <XPBar />
            </div>

            <span className="px-2 py-1 bg-yellow-300 rounded text-xs">
              ⭐ {points}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
