import Link from "next/link";

const events = [
  {
    title: "Design Sprint Meetup",
    description:
      "A focused session for students to share project ideas and collaborate on fresh event concepts.",
    location: "Main Hall",
    totalSlots: "40",
    remainingSlots: "18",
  },
  {
    title: "Career Skills Workshop",
    description:
      "Simple, practical guidance on resumes, interviews, and preparing for student opportunities.",
    location: "Conference Room A",
    totalSlots: "60",
    remainingSlots: "24",
  },
  {
    title: "Campus Networking Night",
    description:
      "Meet other students, discover clubs, and connect with organizers in a relaxed setting.",
    location: "Open Courtyard",
    totalSlots: "80",
    remainingSlots: "31",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Event Hub</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Events</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            Back to home
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.title} className="rounded-3xl border border-black/10 p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">{event.title}</h2>
              <p className="mt-3 text-sm leading-6 text-black/60">{event.description}</p>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-black/50">Location</dt>
                  <dd className="font-medium">{event.location}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-black/50">Total slot</dt>
                  <dd className="font-medium">{event.totalSlots}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-black/50">Remaining</dt>
                  <dd className="font-medium">{event.remainingSlots}</dd>
                </div>
              </dl>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/85"
                >
                  Register for event
                </Link>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-black px-4 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
                >
                  View event details
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}