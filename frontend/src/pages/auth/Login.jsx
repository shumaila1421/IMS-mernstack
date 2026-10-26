import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import { userLogin } from "../../services/user.service";
import { useContext, useState } from "react";
import { UserStore } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserStore);
  const [loading, setLoading] = useState(false);

  async function handleData(data) {
    try {
      setLoading(true);

      const res = await userLogin(data);

      setUser(res.user);
      console.log("Logged-in user:", res.user);
      localStorage.setItem("user", JSON.stringify(res.user));

      localStorage.setItem("token", res.token);

      toast.success("Login successful!", {
        duration: 1000,
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-lg font-bold text-white">
            IMS
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your Inventory Management System
          </p>
        </div>

        <form onSubmit={handleSubmit(handleData)} className="space-y-4">
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

          <Button
            text={loading ? "Logging in..." : "Login"}
            type="submit"
            disabled={loading}
          />
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline"
          >
            Create Account
          </Link>
        </p>

        <p className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
          Inventory Management System
        </p>
      </div>
    </div>
  );
}
