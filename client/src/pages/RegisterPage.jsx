import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Register Form Data:", data);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Name" name="name" register={register} />
        <Input label="Email" type="email" name="email" register={register} />
        <Input label="Password" type="password" name="password" register={register} />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
