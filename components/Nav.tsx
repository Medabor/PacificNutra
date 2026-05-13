import Link from "next/link";

const links = [
  { href: "/blog", label: "Stories" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  return (
    <header className="border-b border-ocean-100 bg-sand-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-2xl tracking-wide text-ocean-900">
          Pacific Nutra
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium text-ocean-800">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-coral-500 transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/library"
            className="rounded-full border border-ocean-300 px-4 py-1.5 text-ocean-800 hover:bg-ocean-50"
          >
            Library
          </Link>
        </nav>
      </div>
    </header>
  );
}
