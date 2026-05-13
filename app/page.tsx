import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";
import BrandPanel from "@/components/BrandPanel";
import { getAllProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const featured = getAllProducts()[0];
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero — full-bleed art panel with overlay copy */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <BrandPanel variant="ocean" ratio="21/9" rounded={false} />
          <div className="absolute inset-0 bg-kalo-950/55" />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-28 sm:py-40 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-clay-300">
            Pacific Nutra · Field Notes & Recipes
          </p>
          <h1 className="mt-6 font-serif text-5xl sm:text-7xl leading-[1.05] tracking-tight">
            Taro. Breadfruit. Poi.
            <br />
            <span className="italic text-cream-100/95">Older than wellness.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-cream-50/90">
            The foods that kept Pacific Islanders healthy for three thousand
            years — translated for the modern kitchen.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <EmailCapture inline source="hero" cta="Send the first recipe" />
            <p className="mt-3 text-xs text-cream-100/70">
              One short email a week. Always a recipe. Never a pitch.
            </p>
          </div>
        </div>
      </section>

      {/* Featured product */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 pt-24">
          <div className="grid items-center gap-12 rounded-3xl bg-cream-100 p-8 sm:grid-cols-5 sm:p-14">
            <div className="sm:col-span-3">
              <p className="eyebrow">New · Pre-launch</p>
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
              <Photo slot="productPacificPlate" ratio="3/4" />
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
          {recentPosts.map((post, idx) => {
            const slots = ["postPolynesianDiet", "postBreadfruit", "postPoi"] as const;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl bg-cream-100 transition hover:-translate-y-1"
              >
                <Photo slot={slots[idx] ?? "postPolynesianDiet"} ratio="4/3" rounded={false} />
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
          <EmailCapture inline source="bottom" cta="Subscribe" />
        </div>
      </section>
    </>
  );
}
