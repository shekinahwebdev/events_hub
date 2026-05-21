import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="font-bold text-sky-900">Event Hub</p>
            <p className="mt-2 text-sm text-slate-600">
              Discover and register for events that matter to you.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-sky-900"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2026 Event Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
