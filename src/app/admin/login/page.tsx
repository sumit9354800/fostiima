"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const { error: signInError } =
      await authClient.signIn.email({
        email,
        password,
      });

    setIsLoading(false);

    if (signInError) {
      setError(
        signInError.message ||
          "Invalid email or password.",
      );
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 py-10">
      <div className="w-full max-w-md">
        <div className="border border-[#dbe3ee] bg-white p-7 shadow-[0_15px_40px_rgba(6,26,58,0.08)] sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center bg-[#061a3a] text-sm font-bold text-[#e5b83f]">
            FB
          </div>

          <span className="mt-7 block text-md font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
            Administration
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#061a3a]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to manage the FOSTIIMA website.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#061a3a]"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="h-11 w-full border border-[#dbe3ee] bg-white pl-10 pr-4 text-sm text-[#061a3a] outline-none transition focus:border-[#c31e3b]"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#061a3a]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="h-11 w-full border border-[#dbe3ee] bg-white pl-10 pr-4 text-sm text-[#061a3a] outline-none transition focus:border-[#c31e3b]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center bg-[#c31e3b] px-5 text-sm font-bold text-white transition hover:bg-[#a91832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}