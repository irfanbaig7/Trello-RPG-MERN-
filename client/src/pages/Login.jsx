import { useForm } from "react-hook-form"
import Input from '../components/ui/Input';
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../utils/authSchemas";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom"



const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate();
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const onSubmit = async (data) => {

    setLoading(true);
    setError(null);

    try {
      const res = await authApi.login(data);
      setAuth(res.data.user, res.data.token)
      navigate("/dashboard")
      console.log("Logged in:", res.data);
    } catch (error) {
      console.log("Login failed", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Input label="Email" type="email" name="email" register={register} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}


        <Input label="Password" type="password" name="password" register={register} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}


        <button
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <p className="text-sm">
          Don’t have an account?
          <a href="/register" className="text-blue-600 underline ml-1">Register</a>
        </p>

      </form>
    </div>
  )
}

export default Login