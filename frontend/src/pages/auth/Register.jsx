import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import { userRegister } from "../../services/user.service";

export default function Register() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  function handleData(data) {
    console.log("Form data:", data);

    userRegister(data).then(function (res) {
      console.log(res);
      navigate("/login");
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-800 text-xl font-bold text-white">
            IMS
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Get started with your Inventory Management System
          </p>
        </div>

        <form onSubmit={handleSubmit(handleData)} className="space-y-3">
          <Input
            placeholder="Enter your Name"
            label="Name"
            type="text"
            register={register}
            name="name"
          />
          <Input
            placeholder="Enter your email"
            label="Email"
            type="email"
            register={register}
            name="email"
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            type="password"
            register={register}
            name="password"
          />

          <Button text="Signup" type="submit" />
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
