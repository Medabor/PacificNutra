import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ocean-100 bg-ocean-950 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-sand-50">Pacific Nutra</p>
          <p className="mt-2 text-sm text-sand-200">
            Ancestral Polynesian foods, reframed for modern wellness.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-wider text-sand-300">Explore</p>
          <ul className="space-y-2 text-sand-200">
            <li><Link href="/blog" className="hover:text-coral-400">Stories</Link></li>
            <li><Link href="/shop" className="hover:text-coral-400">Shop</Link></li>
            <li><Link href="/about" className="hover:text-coral-400">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-wider text-sand-300">Legal</p>
          <ul className="space-y-2 text-sand-200">
            <li><Link href="/terms" className="hover:text-coral-400">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-coral-400">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ocean-900 py-4 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} Pacific Nutra. All rights reserved.
      </div>
    </footer>
  );
}
