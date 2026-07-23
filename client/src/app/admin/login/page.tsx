"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/admin/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful.");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111] border border-yellow-500/20 rounded-3xl p-10">

        <h1 className="text-4xl font-black text-center">
          Admin Login
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-10">
          Sign in to manage Roaring Machines.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >          {/* Email */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 outline-none focus:border-yellow-500 transition"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-black border border-yellow-500/20 rounded-xl p-4 pr-14 outline-none focus:border-yellow-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>

            </div>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-4 rounded-xl font-bold text-lg transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            href="/"
            className="text-yellow-500 hover:text-yellow-400 transition"
          >
            ← Back to Website
          </Link>

        </div>

      </div>

    </div>
  );
}