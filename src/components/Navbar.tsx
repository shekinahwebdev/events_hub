"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [initials, setInitials] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showUserModel, setShowUserModel] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        // decoding the token into js object
        const decodedToken = jwtDecode(token || "") as {
          id: string;
          email: string;
        };

        // extracting the user email from the decoded token
        const userEmail = decodedToken.email;

        // getting the initials from the email
        if (userEmail) {
          const namePart = userEmail.split("@")[0].charAt(0).toUpperCase();
          setInitials(namePart);
          setUserEmail(userEmail);
          console.log(namePart);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-sky-900"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center">
              E
            </div>
            Event Hub
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 transition hover:text-sky-900"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium text-slate-600 transition hover:text-sky-900"
            >
              Events
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 transition hover:text-sky-900"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 transition hover:text-sky-900"
            >
              Contact
            </Link>
          </nav>

          {initials ? (
            <button
              onClick={() => setShowUserModel((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-sky-900 text-white flex items-center justify-center text-xs font-medium"
            >
              {initials}
            </button>
          ) : (
            // <div className="w-8 h-8 rounded-full bg-sky-900 text-white flex items-center justify-center text-xs font-medium">
            //   {initials}
            // </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium transition hover:border-sky-900 hover:bg-sky-900 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-sky-900 px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-sky-800"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* User Model */}
        {showUserModel && (
          <div className="absolute right-3 mt-2 w-48 rounded-none shadow-lg bg-white border border-slate-200">
            <div className="py-1">
              <p className="block px-4 py-2 text-sm text-gray-700">
                {userEmail}
              </p>
              <button
                onClick={() => {
                  Cookies.remove("token");
                  window.location.href = "/login";
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
