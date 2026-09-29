"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"entrepreneur" | "officer">("entrepreneur");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock auth: in production this posts to /auth/login and sets an httpOnly cookie.
    router.push(role === "entrepreneur" ? "/dashboard" : "/officer");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-indigo-700 text-white p-12">
        <div className="flex items-center gap-2">
          <Leaf size={24} />
          <span className="font-heading font-extrabold text-xl">MaitriFlow</span>
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold leading-snug max-w-sm">
            One window for every industrial approval in Maharashtra.
          </h1>
          <p className="text-indigo-100 mt-4 max-w-sm text-sm leading-relaxed">
            Track approvals, compliance deadlines, and government schemes —
            without switching between MAITRI, MPCB, and Fire Department
            portals.
          </p>
        </div>
        <p className="text-xs text-indigo-200">
          Government of Maharashtra · Maharashtra State Innovation Society
        </p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <Leaf className="text-teal-600" size={22} />
            <span className="font-heading font-extrabold text-lg text-indigo-700">MaitriFlow</span>
          </div>

          <h2 className="font-heading text-xl font-bold text-ink">
            {mode === "login" ? "Log in to your account" : "Create an account"}
          </h2>
          <p className="text-sm text-ink/50 mt-1 mb-6">
            {mode === "login"
              ? "Enter your credentials to continue."
              : "Register as an entrepreneur or department officer."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-ink/80 mb-1">I am a</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["entrepreneur", "officer"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`rounded border px-3 py-2 text-sm font-medium capitalize ${
                        role === r
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-line text-ink/60"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Email</label>
              <input
                type="email"
                required
                defaultValue="contact@abcindustries.in"
                className="w-full rounded border border-line px-3 py-2 text-sm focus:border-indigo-600"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Password</label>
              <input
                type="password"
                required
                defaultValue="demo-password"
                className="w-full rounded border border-line px-3 py-2 text-sm focus:border-indigo-600"
                placeholder="••••••••"
              />
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-ink/60">
                  <input type="checkbox" className="rounded border-line" />
                  Remember me
                </label>
                <a href="#" className="text-indigo-600 font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {mode === "login" && (
              <div>
                <label className="block text-sm font-medium text-ink/80 mb-1">Log in as</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["entrepreneur", "officer"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`rounded border px-3 py-2 text-sm font-medium capitalize ${
                        role === r
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-line text-ink/60"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 transition-colors"
            >
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-ink/50 mt-6 text-center">
            {mode === "login" ? "New to MaitriFlow?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-indigo-600 font-medium hover:underline"
            >
              {mode === "login" ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
