"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <p className="mb-3 text-sm font-medium text-red-600">
          Something went wrong
        </p>

        <h1 className="mb-4 text-3xl font-bold">
          An unexpected error occurred
        </h1>

        <p className="mb-8 text-gray-600">
          We couldnt load this page. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}