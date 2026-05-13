"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/library`
              : undefined,
        },
      });
      if (error) throw error;
      setStatus("ok");
      setMessage("Magic link sent — check your inbox.");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Sign in failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-full border border-ocean-200 bg-white px-5 py-3 text-ocean-950 placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none"
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-coral-500 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-coral-600 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Email me a sign-in link"}
      </button>
      {message && (
        <p className={`text-sm ${status === "ok" ? "text-ocean-700" : "text-coral-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
