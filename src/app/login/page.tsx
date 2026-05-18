import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-lg flex-col justify-center rounded-3xl border border-black/10 p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">Event Hub</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Login</h1>
        <p className="mt-3 text-sm leading-6 text-black/60">
          Placeholder page for the future student auth flow.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}