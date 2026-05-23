import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";
import { getAllProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/posts";
import type { PhotoSlotKey } from "@/lib/photos";

const POST_PHOTO: Record<string, PhotoSlotKey> = {
  "the-polynesian-diet-why-pacific-islanders-live-longer": "postPolynesianDiet",
  "breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years": "postBreadfruit",
  "what-is-poi-a-complete-guide-to-hawaiis-original-superfood": "postPoi",
  "what-is-taro-the-root-vegetable-of-polynesia": "postTaro",
  "poke-bowl-history-and-how-to-make-it-at-home": "postPoke",
  "what-is-haupia-hawaiian-coconut-pudding": "postHaupia",
  "coconut-milk-coconut-oil-coconut-aminos-guide": "postCoconut",
};

export default function HomePage() {
  const featured = getAllProducts()[0];
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero — full-bleed photo. Fills the section regardless of content
          height; no aspect-ratio cropping the overlay band. */}
      <section className="relative isolate overflow-hidden">
        <Photo slot="homeHero" fill priority />
        <div className="absolute inset-0 bg-gradient-to-b from-kalo-950/70 via-kalo-950/55 to-kalo-950/70" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 sm:py-48 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-clay-300">
            Pacific Nutra
          </p>
          <h1 className="mt-8 font-serif text-5xl sm:text-7xl leading-[1.02] tracking-tight">
            The diet that fed the Pacific
            <br />
            <span className="italic text-clay-300">for three thousand years.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream-50/95">
            Taro. Breadfruit. Poi. Coconut. Fresh fish. The foods of the
            longest-lived people on the planet — translated for the modern
            kitchen, with the receipts.
          </p>
          <div className="mx-auto mt-12 max-w-xl">
            <EmailCapture inline source="hero" cta="Send the first recipe" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cream-100/75">
              One short email a week · Always a recipe · Never a pitch
            </p>
          </div>
        </div>
      </section>

      {/* Why this matters — four editorial cards, no SaaS tinted-icon grid */}
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Why this, why now</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-kalo-950 leading-[1.1]">
            Three thousand years of practice. Two generations of evidence.
          </h2>
          <p className="mt-5 text-lg text-kalo-800">
            Pacific Islanders ate this way long before "longevity" was a
            wellness category. We&apos;re not selling a fad — we&apos;re
            documenting what a population actually ate, why it worked, and
            how to put it on your table this week.
          </p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {[
            {
              n: "01",
              title: "Documented, not theorized.",
              body:
                "Pacific Islander populations have some of the cleanest dietary records in the world — ethnographers, traders, and physicians documented the pre-contact diet in detail, and we have medical evidence from both sides of the Western dietary transition.",
            },
            {
              n: "02",
              title: "Real food. Not pills.",
              body:
                "Taro, breadfruit, fish, leafy greens, coconut. Five categories of whole food, eaten in roughly traditional proportions. No supplements, no protein powders, no proprietary blends.",
            },
            {
              n: "03",
              title: "Tested in a real kitchen.",
              body:
                "Every recipe we publish has been cooked from groceries you can actually buy. Where ingredients are hard to source, we name the substitution and the trade-off it makes.",
            },
            {
              n: "04",
              title: "Respectful, not appropriative.",
              body:
                "We're a guide, not a representative of Polynesian culture. We name regions specifically — Hawaii, Samoa, Tonga, Tahiti — credit practitioners, and welcome corrections.",
            },
          ].map((card) => (
            <div key={card.n} className="flex gap-5">
              <span className="font-serif text-2xl text-clay-500 leading-none pt-1">
                {card.n}
              </span>
              <div>
                <h3 className="font-serif text-2xl text-kalo-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-kalo-800 leading-relaxed">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LeafDivider />

      {/* Featured product */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <div className="grid items-center gap-12 rounded-3xl bg-cream-100 p-8 sm:grid-cols-5 sm:p-14">
            <div className="sm:col-span-3">
              <p className="eyebrow">Cookbook · Out now</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-kalo-950">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-kalo-800">{featured.tagline}</p>
              <ul className="mt-6 space-y-2 text-sm text-kalo-800">
                {featured.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-clay-500">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link href={`/shop/${featured.slug}`} className="btn-clay">
                  Read more — ${(featured.priceCents / 100).toFixed(0)}
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-medium text-kalo-800 underline-offset-4 hover:underline hover:text-clay-600"
                >
                  See all guides →
                </Link>
              </div>
            </div>
            <div className="sm:col-span-2">
              <Photo slot="productPacificPlate" ratio="2/3" fit="contain" />
            </div>
          </div>
        </section>
      )}

      <LeafDivider />

      {/* Recent stories */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Field Notes</p>
            <h2 className="mt-2 font-serif text-4xl text-kalo-950">From the journal</h2>
          </div>
          <Link href="/blog" className="text-sm text-kalo-800 hover:text-clay-600">
            All notes →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {recentPosts.map((post) => {
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl bg-cream-100 transition hover:-translate-y-1"
              >
                <Photo slot={POST_PHOTO[post.slug] ?? "postPolynesianDiet"} ratio="4/3" rounded={false} />
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-kalo-950 group-hover:text-clay-600">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-kalo-800">{post.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <LeafDivider />

      {/* Bottom email capture */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="eyebrow">The Newsletter</p>
        <h2 className="mt-3 font-serif text-4xl text-kalo-950">
          One recipe. One short letter. Every Sunday.
        </h2>
        <p className="mt-3 text-kalo-800">
          A traditional Polynesian recipe rebuilt for a modern kitchen, plus
          the story of where it came from. Nothing else.
        </p>
        <div className="mt-8">
          <EmailCapture inline source="bottom" cta="Subscribe" successMessage="You're in — see you next Sunday." />
        </div>
      </section>
    </>
  );
}
