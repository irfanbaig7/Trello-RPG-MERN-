import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/authSchemas";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data) => {
    console.log("Register Form Data:", data);
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

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
