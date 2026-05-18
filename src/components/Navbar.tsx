import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-sky-900"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center">
              E
            </div>
            Event Hub
          </Link>

          {/* Navigation */}
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

          {/* Auth Buttons */}
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
        </div>
      </div>
    </header>
  );
}
