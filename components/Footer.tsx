import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-32 bg-kalo-950 text-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <Logo size={36} />
              <p className="font-serif text-2xl text-cream-50">
                Pacific <span className="italic">Nutra</span>
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/80">
              Ancestral Polynesian food, translated for the modern kitchen.
              Recipes, field notes, and the occasional cookbook.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://instagram.com/pacificnutra" label="Instagram">
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
              </SocialIcon>
              <SocialIcon href="https://tiktok.com/@pacificnutra" label="TikTok">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </SocialIcon>
              <SocialIcon href="https://pinterest.com/pacificnutra" label="Pinterest">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 20l4-9" />
                <path d="M9 11a3 3 0 1 0 5.5-1.7c.4-2-1-3.3-2.5-3.3-2.5 0-4 2.5-3 4.5" />
              </SocialIcon>
              <SocialIcon href="https://youtube.com/@pacificnutra" label="YouTube">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.32 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </SocialIcon>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-medium uppercase tracking-[0.18em] text-clay-300">
              Explore
            </p>
            <ul className="space-y-2 text-cream-100/85">
              <li><Link href="/blog" className="hover:text-clay-300">Field Notes</Link></li>
              <li><Link href="/shop" className="hover:text-clay-300">Shop</Link></li>
              <li><Link href="/pantry" className="hover:text-clay-300">The Pacific Pantry</Link></li>
              <li><Link href="/about" className="hover:text-clay-300">About</Link></li>
              <li><Link href="/library" className="hover:text-clay-300">My Library</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-medium uppercase tracking-[0.18em] text-clay-300">
              Contact
            </p>
            <ul className="space-y-2 text-cream-100/85">
              <li>
                <a href="mailto:hello@pacificnutra.com" className="hover:text-clay-300">
                  hello@pacificnutra.com
                </a>
              </li>
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

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-kalo-800 text-cream-100/85 transition hover:border-clay-400 hover:text-clay-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  );
}
