import { useAuthStore } from "../store/useAuthStore";

function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Profile Page</h2>

      <p>User: {user?.name || "Not Logged In"}</p>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
