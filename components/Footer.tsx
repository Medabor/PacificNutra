import Link from "next/link";
import LeafMark from "@/components/LeafMark";

export default function Footer() {
  return (
    <footer className="mt-32 bg-kalo-950 text-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 text-clay-400">
              <LeafMark size={28} />
              <p className="font-serif text-2xl text-cream-50">
                Pacific <span className="italic">Nutra</span>
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/80">
              Ancestral Polynesian food, translated for the modern kitchen.
              Recipes, field notes, and the occasional cookbook.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-medium uppercase tracking-[0.18em] text-clay-300">
              Explore
            </p>
            <ul className="space-y-2 text-cream-100/85">
              <li><Link href="/blog" className="hover:text-clay-300">Field Notes</Link></li>
              <li><Link href="/shop" className="hover:text-clay-300">Shop</Link></li>
              <li><Link href="/about" className="hover:text-clay-300">About</Link></li>
              <li><Link href="/library" className="hover:text-clay-300">My Library</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-medium uppercase tracking-[0.18em] text-clay-300">
              Legal
            </p>
            <ul className="space-y-2 text-cream-100/85">
              <li><Link href="/terms" className="hover:text-clay-300">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-clay-300">Privacy</Link></li>
              <li><Link href="/refund" className="hover:text-clay-300">Refunds</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-kalo-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-cream-100/60">
          <p>© {new Date().getFullYear()} Pacific Nutra. All rights reserved.</p>
          <p>Made with respect for the Pacific.</p>
        </div>
      </div>
    </footer>
  );
}
