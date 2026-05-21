import { prisma } from "@/lib/db";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MdLocationOn, MdEventAvailable } from "react-icons/md";

export default async function EventsPage() {
  const events = await prisma.event.findMany();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-600">
              Browse
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              All Events
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Explore all available events and find the perfect one for you.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-900 hover:bg-sky-900 hover:text-white"
          >
            Back to home
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200"
              >
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
                  {Number(event.remainingSlots) > 0 ? "Available" : "Full"}
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-sky-900 transition">
                  {event.title}
                </h2>

                <p className="mt-2 text-sm text-slate-600 leading-6">
                  {event.description}
                </p>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MdLocationOn className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MdEventAvailable className="w-4 h-4" />
                    <span>{event.totalSlots} total slots</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-medium">
                      {event.remainingSlots} spots available
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/book?id=${event.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-sky-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-800"
                  >
                    Book now
                  </Link>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:border-sky-900 hover:bg-sky-900 hover:text-white"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-600">No events available at the moment.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
