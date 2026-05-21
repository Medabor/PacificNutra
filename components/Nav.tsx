"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const links = [
  { href: "/blog", label: "Field Notes" },
  { href: "/shop", label: "Shop" },
  { href: "/pantry", label: "Pantry" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-cream-200/70 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-kalo-950"
          onClick={() => setOpen(false)}
        >
          <Logo size={36} />
          <span className="font-serif text-xl tracking-tight">
            Pacific <span className="italic font-medium text-clay-600">Nutra</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-sm text-kalo-800">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium hover:text-clay-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/library"
            className="rounded-full border border-kalo-200 px-4 py-1.5 font-medium text-kalo-900 hover:border-clay-400 hover:text-clay-600 transition"
          >
            My Library
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex h-9 w-9 items-center justify-center rounded-md text-kalo-800 hover:text-clay-600 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="sm:hidden border-t border-cream-200/70 bg-cream-50/95 px-6 py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-kalo-800 hover:text-clay-600 transition-colors border-b border-cream-200/60 last:border-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/library"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-kalo-200 px-4 py-1.5 text-sm font-medium text-kalo-900 hover:border-clay-400 hover:text-clay-600 transition"
              >
                My Library
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
