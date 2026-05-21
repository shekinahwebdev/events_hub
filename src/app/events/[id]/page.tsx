import { prisma } from "@/lib/db";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MdLocationOn,
  MdEventAvailable,
  MdArrowBack,
  MdCalendarToday,
} from "react-icons/md";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

const EventDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;

  if (!rawId || isNaN(Number(rawId))) {
    redirect("/events");
  }

  let eventId: bigint;
  try {
    eventId = BigInt(rawId);
  } catch {
    redirect("/events");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    redirect("/events");
  }

  const spotsLeft = Number(event.remainingSlots);
  const isFull = spotsLeft === 0;
  const totalSlots = Number(event.totalSlots);
  const bookedSlots = totalSlots - spotsLeft;
  const occupancyPercent = Math.round((bookedSlots / totalSlots) * 100);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-900 hover:text-sky-800 transition"
        >
          <MdArrowBack className="w-4 h-4" />
          Back to events
        </Link>

        <div className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
                {isFull ? "Event Full" : "Registration Open"}
              </span>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {event.title}
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">
                Event Information
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-sky-50 p-3">
                    <MdLocationOn className="w-6 h-6 text-sky-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Location
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <MdEventAvailable className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Capacity
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">
                      {event.totalSlots} spots
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-violet-50 p-3">
                    <MdCalendarToday className="w-6 h-6 text-violet-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Spots Available
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">
                      {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">
                Registration Status
              </h2>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-600">
                    {bookedSlots} of {totalSlots} spots booked
                  </span>
                  <span className="text-sm font-bold text-slate-950">
                    {occupancyPercent}%
                  </span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-600 transition-all duration-300"
                    style={{ width: `${occupancyPercent}%` }}
                  />
                </div>
              </div>

              <Link
                href={`/book?id=${event.id}`}
                className={`mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition ${
                  isFull
                    ? "bg-slate-200 text-slate-600 cursor-not-allowed"
                    : "bg-sky-900 text-white hover:bg-sky-800"
                }`}
              >
                {isFull ? "Event Full" : "Book Now"}
              </Link>
            </div>
          </div>

          <div>
            <div className="sticky top-20 rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-950">
                Ready to join?
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                {isFull
                  ? "This event is currently full. Check back later for updates."
                  : `Only ${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} remaining!`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EventDetailPage;
