"use client";

import { useState } from "react";

type Props = {
  source?: string;
  cta?: string;
  placeholder?: string;
  inline?: boolean;
};

export default function EmailCapture({
  source = "landing",
  cta = "Get the recipes",
  placeholder = "you@example.com",
  inline = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("ok");
      setMessage("Check your inbox — your first recipe is on the way.");
      setEmail("");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={inline ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3"}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full border border-ocean-200 bg-white px-5 py-3 text-ocean-950 placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none"
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-coral-500 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-coral-600 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : cta}
      </button>
      {message && (
        <p
          className={`text-sm ${status === "ok" ? "text-ocean-700" : "text-coral-600"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
