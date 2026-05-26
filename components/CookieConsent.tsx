"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pn-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const choice = window.localStorage.getItem(STORAGE_KEY);
    if (!choice) {
      const t = window.setTimeout(() => setVisible(true), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  function dismiss(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-kalo-200/60 bg-cream-50 px-5 py-4 shadow-[0_8px_30px_rgba(28,57,66,0.15)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
        <p className="text-sm leading-relaxed text-kalo-800">
          We use a few essential cookies to keep the site running — for
          checkout, sign-in, and remembering your choices. No tracking, no
          ads.{" "}
          <Link
            href="/privacy"
            className="font-medium text-clay-600 underline underline-offset-2 hover:text-clay-700"
          >
            Learn more
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => dismiss("declined")}
            className="rounded-full px-4 py-2 text-sm font-medium text-kalo-700 transition hover:text-kalo-950"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="btn-clay px-5 py-2 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
