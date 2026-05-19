import { prisma } from "@/lib/db";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MdLocationOn, MdEventAvailable } from "react-icons/md";

const page = async () => {
  const events = await prisma.event.findMany();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-600">
              Welcome to Event Hub
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover events that matter to you
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Explore a curated list of events happening in your area. Register
              for free and never miss an opportunity to connect, learn, and
              grow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-xl bg-sky-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
              >
                Browse Events
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-900 hover:bg-sky-900 hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 p-6 sm:p-8 border border-sky-100">
              <p className="text-4xl sm:text-5xl font-bold text-sky-900">
                {events.length}+
              </p>
              <p className="mt-2 text-sm text-slate-600">Featured Events</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-50 p-6 sm:p-8 border border-emerald-100">
              <p className="text-4xl sm:text-5xl font-bold text-emerald-900">
                10k+
              </p>
              <p className="mt-2 text-sm text-slate-600">Active Users</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-slate-50 p-6 sm:p-8 border border-violet-100">
              <p className="text-4xl sm:text-5xl font-bold text-violet-900">
                500+
              </p>
              <p className="mt-2 text-sm text-slate-600">Registrations</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-slate-50 p-6 sm:p-8 border border-amber-100">
              <p className="text-4xl sm:text-5xl font-bold text-amber-900">
                24/7
              </p>
              <p className="mt-2 text-sm text-slate-600">Support</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-600">
            Upcoming
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Featured Events
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Don't miss out on these exciting events. Register today to secure
            your spot!
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200"
              >
                {/* Badge */}
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
                  {Number(event.remainingSlots) > 0 ? "Available" : "Full"}
                </span>

                {/* Title */}
                <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-sky-900 transition">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {event.description}
                </p>

                {/* Meta Info */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MdLocationOn className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MdEventAvailable className="w-4 h-4" />
                    <span>{event.remainingSlots} spots available</span>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-xl bg-sky-900 py-2.5 text-sm font-medium text-white transition hover:bg-sky-800">
                  View Details
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-600">No events available at the moment.</p>
          </div>
        )}

        {events.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-900 hover:bg-sky-900 hover:text-white"
            >
              View All Events
            </Link>
          </div>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="rounded-3xl bg-gradient-to-r from-sky-900 to-sky-800 p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to join?</h2>
          <p className="mt-4 text-lg text-sky-100">
            Sign up today and get access to hundreds of amazing events.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-medium text-sky-900 transition hover:bg-sky-50"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default page;
