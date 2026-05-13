import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { getAllProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const featured = getAllProducts()[0];
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-50 via-sand-50 to-sand-50" />
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-coral-600">
            Pacific Nutra
          </p>
          <h1 className="font-serif text-5xl leading-tight text-ocean-950 sm:text-6xl">
            Ancestral Polynesian foods,
            <br />
            <span className="italic text-ocean-700">reframed for modern wellness.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ocean-800">
            Taro, breadfruit, poke, poi, kalo — the foods that kept Pacific Islanders
            healthy for centuries are some of the world&apos;s most overlooked superfoods.
            We translate them for the modern kitchen.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <EmailCapture inline source="hero" cta="Send my free recipe" />
            <p className="mt-3 text-xs text-ocean-600">
              Join the list and we&apos;ll email you a free recipe from our upcoming
              cookbook. No spam — unsubscribe any time.
            </p>
          </div>
        </div>
      </section>

      {/* Featured product */}
      {featured && (
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-10 rounded-3xl bg-ocean-950 p-10 text-sand-50 sm:grid-cols-2 sm:p-14">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral-400">
                New release
              </p>
              <h2 className="mt-3 font-serif text-4xl text-sand-50">{featured.title}</h2>
              <p className="mt-4 text-sand-200">{featured.tagline}</p>
              <ul className="mt-6 space-y-2 text-sm text-sand-200">
                {featured.bullets.map((b) => (
                  <li key={b}>— {b}</li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href={`/shop/${featured.slug}`}
                  className="rounded-full bg-coral-500 px-6 py-3 font-medium text-white hover:bg-coral-600"
                >
                  Get the cookbook — ${(featured.priceCents / 100).toFixed(0)}
                </Link>
                <Link href="/shop" className="text-sm underline text-sand-200 hover:text-coral-400">
                  See all products
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-xs rounded-2xl bg-gradient-to-br from-coral-400 via-sand-300 to-ocean-300 shadow-2xl ring-1 ring-sand-100/20 flex items-center justify-center">
                <span className="font-serif text-2xl text-ocean-950 px-6 text-center">
                  {featured.title}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent stories */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl text-ocean-950">From the journal</h2>
          <Link href="/blog" className="text-sm text-ocean-700 hover:text-coral-500">
            All stories →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-ocean-100 bg-white p-6 transition hover:border-coral-300 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wider text-coral-600">
                {post.category}
              </p>
              <h3 className="mt-2 font-serif text-xl text-ocean-950 group-hover:text-coral-600">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-ocean-700">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom email capture */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-ocean-950">
          A weekly recipe rooted in the Pacific.
        </h2>
        <p className="mt-3 text-ocean-700">
          One short email, every Sunday. A traditional Polynesian recipe rebuilt for a
          modern kitchen, plus the story of where it came from.
        </p>
        <div className="mt-8">
          <EmailCapture inline source="bottom" cta="Subscribe" />
        </div>
      </section>
    </>
  );
}
