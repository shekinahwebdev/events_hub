"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function RegisterEventPage() {
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  useEffect(() => {
    if (!eventId) {
      setError("No event selected");
      setIsLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/register`,
        );

        if (!response.ok) {
          setError("Failed to load event details");
          return;
        }

        const data = await response.json();
        setEventDetails(data);
      } catch (error: any) {
        setError(
          error.message || "Failed to load event. Check your connection.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsRegistering(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to register for an event");
        setIsRegistering(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/book/ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: parseInt(eventId || "0"),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setIsRegistering(false);
        return;
      }

      setSuccess(true);
    } catch (error: any) {
      setError(
        error.message || "Connection refused. Is your backend server running?",
      );
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Navbar />
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <p className="text-slate-600">Loading event details...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Navbar />

        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200 text-center">
            <MdCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-950 mb-2">
              Registration Successful!
            </h1>
            <p className="text-slate-600 mb-6">
              You have successfully registered for{" "}
              <span className="font-semibold">{eventDetails?.title}</span>
            </p>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">Event:</span>{" "}
                {eventDetails?.title}
              </p>
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">Location:</span>{" "}
                {eventDetails?.location}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Confirmation email sent to:</span>{" "}
                Check your inbox for details
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/events"
                className="flex-1 rounded-xl bg-sky-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
              >
                View All Events
              </Link>
              <Link
                href="/"
                className="flex-1 rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <Link
          href={`/events/${eventId}`}
          className="inline-flex items-center gap-2 mb-8 text-sky-900 hover:text-sky-800 transition font-medium"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Event
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-600">
              Event Registration
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Register for Event
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Complete your registration to secure your spot
            </p>
          </div>

          {eventDetails && (
            <div className="mt-8 bg-sky-50 rounded-lg p-6 border border-sky-200 mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {eventDetails.title}
              </h2>
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {eventDetails.location}
                </p>
                <p>
                  <span className="font-medium">Available Slots:</span>{" "}
                  {eventDetails.remainingSlots} / {eventDetails.totalSlots}
                </p>
                <p>
                  <span className="font-medium">Description:</span>
                </p>
                <p className="text-slate-600">{eventDetails.description}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Confirmation Details
              </h3>
              <div className="space-y-3 text-sm text-slate-700">
                <p>✓ I confirm that I will attend this event as registered</p>
                <p>
                  ✓ A confirmation email will be sent to my registered email
                </p>
                <p>
                  ✓ I understand that registration is binding and I commit to
                  attending
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isRegistering || !eventDetails}
              className="w-full rounded-xl bg-sky-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegistering ? "Registering..." : "Confirm Registration"}
            </button>
            <Link
              href={`/events/${eventId}`}
              className="block text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Cancel Registration
            </Link>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
