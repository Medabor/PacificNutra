"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  /** Path the magic link returns to, e.g. "/library" or "/admin". */
  redirectPath?: string;
  buttonLabel?: string;
};

export default function SignInForm({
  redirectPath = "/library",
  buttonLabel = "Email me a sign-in link",
}: Props) {
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
              ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`
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
        className="input-cream"
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"} className="btn-clay">
        {status === "loading" ? "Sending…" : buttonLabel}
      </button>
      {message && (
        <p
          className={`text-sm ${status === "ok" ? "text-forest-700" : "text-clay-700"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
