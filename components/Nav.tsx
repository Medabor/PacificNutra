import Link from "next/link";
import LeafMark from "@/components/LeafMark";

const links = [
  { href: "/blog", label: "Field Notes" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-cream-200/70 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-kalo-950">
          <span className="text-clay-500">
            <LeafMark size={28} />
          </span>
          <span className="font-serif text-xl tracking-tight">
            Pacific <span className="italic font-medium text-clay-600">Nutra</span>
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-sm text-kalo-800">
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
      </div>
    </header>
  );
}
