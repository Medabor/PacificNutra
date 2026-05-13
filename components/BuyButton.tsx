"use client";

import { useState } from "react";

export default function BuyButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="rounded-full bg-coral-500 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-coral-600 disabled:opacity-50"
      >
        {loading ? "Loading…" : "Buy now"}
      </button>
      {error && <p className="mt-2 text-sm text-coral-600">{error}</p>}
    </div>
  );
}
