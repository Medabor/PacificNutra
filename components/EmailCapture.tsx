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
  cta = "Send the first recipe",
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
      setMessage("Check your inbox — the first recipe is on its way.");
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
        className="input-cream flex-1"
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"} className="btn-clay">
        {status === "loading" ? "Sending…" : cta}
      </button>
      {message && (
        <p
          className={`text-sm ${status === "ok" ? "text-forest-700" : "text-clay-700"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
