import { useForm } from "react-hook-form"
import Input from '../components/ui/Input';

const Login = () => {

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log("Login Form Data:", data);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" name="email" register={register} />
        <Input label="Password" type="password" name="password" register={register} />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-sm">
          Don’t have an account?
          <a href="/register" className="text-blue-600 underline ml-1">Register</a>
        </p>

      </form>
    </div>
  )
}

export default Login