"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MdMailOutline,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      Cookies.set("token", data.accessToken, { expires: 1 / 24 }); // Expires in 1 hour

      const token = Cookies.get("token");

      // console.log("User token", token);

      const decodedUserToken = jwtDecode(token || "") as {
        id: string;
        email: string;
        iat: number;
        exp: number;
      };

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
      router.refresh();
    } catch (error: any) {
      setError(
        error.message || "Connection refused. Is your backend server running?",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-600">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Login to Event Hub
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to your account to register for events
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdMailOutline className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLockOutline className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="w-5 h-5" />
                  ) : (
                    <MdVisibility className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm font-medium text-sky-900 hover:text-sky-800 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-sky-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-sky-900 hover:text-sky-800 transition"
            >
              Sign up
            </Link>
          </p>

          <Link
            href="/"
            className="mt-6 block text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Back to home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
