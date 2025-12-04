import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/authSchemas";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);


  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authApi.register(data);
      setAuth(res.data.user, res.data.token);
      navigate("/dashboard");
      console.log("register successful ", res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Input label="Name" name="name" register={register} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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
          className={`w-full p-2 rounded text-white ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && <p className="text-red-500">{error}</p>}

      </form>
    </div>
  );
}

export default RegisterPage;
