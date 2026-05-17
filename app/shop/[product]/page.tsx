import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import LeafDivider from "@/components/LeafDivider";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import BuyButton from "@/components/BuyButton";

type Props = { params: Promise<{ product: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { product } = await params;
  const p = getProductBySlug(product);
  if (!p) return {};
  return { title: p.title, description: p.tagline };
}

const SECTIONS = [
  {
    n: "01",
    title: "Roots & Tubers",
    count: 5,
    teaser:
      "Roasted breadfruit with ʻAlaea salt · Taro mash with brown butter · Sweet potato + ginger soup · Cassava fries · ʻUlu rice with coconut",
  },
  {
    n: "02",
    title: "From the Sea",
    count: 6,
    teaser:
      "Ahi poke (classic) · Salmon poke (modern) · Lomi salmon · Coconut-ginger shrimp · Whole grilled fish in banana leaf · Octopus with chili-lime",
  },
  {
    n: "03",
    title: "Greens",
    count: 5,
    teaser:
      "Coconut-creamed kalo leaves · Watercress and sesame · Pohole fern salad · Ginger-garlic bok choy · Taro leaf wraps",
  },
  {
    n: "04",
    title: "Coconut",
    count: 5,
    teaser:
      "Toasted coconut chips · Coconut rice · Haupia · Lower-sugar coconut macaroons · Coconut-poached white fish",
  },
  {
    n: "05",
    title: "One-Pot Meals",
    count: 5,
    teaser:
      "Kalua-style pork (oven method) · Chicken adobo · Coconut curry with taro · Poke bowl, four ways · Spam musubi, rebuilt",
  },
  {
    n: "06",
    title: "Sweet",
    count: 4,
    teaser:
      "Haupia, modern variations · Banana lumpia · Pineapple-ginger shave ice · Mochi, basic + variations",
  },
];

const FAQ = [
  {
    q: "What format is it?",
    a: "A polished PDF (~90 pages, ~25 MB). It opens in any PDF reader on Mac, Windows, iOS, Android, and Kindle. Print as many copies as you want for your own kitchen.",
  },
  {
    q: "How do I get it after I pay?",
    a: "You're redirected to your library at /library, where you sign in with the same email you used at checkout (we email you a one-time magic link, no password). Download the PDF — it's yours to keep.",
  },
  {
    q: "Will I get future editions?",
    a: "Yes — every revision and expansion is delivered free to your library. We push updates a few times a year as we test new recipes and refine sourcing notes.",
  },
  {
    q: "What if I can't find taro or breadfruit?",
    a: "Every recipe includes a Modern Variation that names the substitution and the trade-off it makes. The book is designed to work in a normal grocery-store kitchen.",
  },
  {
    q: "Refund policy?",
    a: "30 days, no questions asked. One email and your money is back in your account within two business days. Full policy at /refund.",
  },
  {
    q: "Is this medical or dietary advice?",
    a: "No. It's a cookbook. Talk to your doctor or a registered dietitian before making significant dietary changes, especially if you're managing a medical condition.",
  },
];

export default async function ProductPage({ params }: Props) {
  const { product } = await params;
  const p = getProductBySlug(product);
  if (!p) notFound();

  const totalRecipes = SECTIONS.reduce((s, x) => s + x.count, 0);

  return (
    <>
      {/* Hero / above-the-fold */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 sm:grid-cols-5">
          <div className="sm:col-span-2">
            <Photo slot="productPacificPlate" ratio="3/4" priority />
            <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-kalo-800">
              <li className="rounded-lg bg-cream-100 py-2">
                <span className="block font-serif text-lg text-kalo-950">{totalRecipes}</span>
                recipes
              </li>
              <li className="rounded-lg bg-cream-100 py-2">
                <span className="block font-serif text-lg text-kalo-950">~90</span>
                pages
              </li>
              <li className="rounded-lg bg-cream-100 py-2">
                <span className="block font-serif text-lg text-kalo-950">PDF</span>
                instant
              </li>
            </ul>
          </div>
          <div className="sm:col-span-3">
            <p className="eyebrow">Digital cookbook · First edition</p>
            <h1 className="mt-2 font-serif text-5xl text-kalo-950 leading-tight">{p.title}</h1>
            <p className="mt-4 text-xl text-kalo-800">{p.tagline}</p>
            <p className="mt-6 text-kalo-800 leading-relaxed">{p.description}</p>
            <ul className="mt-8 space-y-2 text-kalo-800">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-clay-500">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-5">
              <span className="font-serif text-4xl text-kalo-950">
                ${(p.priceCents / 100).toFixed(0)}
              </span>
              <BuyButton slug={p.slug} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-kalo-400">
              <span>✓ Instant PDF download</span>
              <span>✓ Free lifetime updates</span>
              <span>
                ✓ <Link href="/refund" className="underline hover:text-clay-600">30-day refund</Link>
              </span>
            </div>
            <p className="mt-5 text-sm">
              <Link
                href="/sample"
                className="font-medium text-clay-600 underline-offset-4 hover:underline"
              >
                Read the first chapter free →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider />

      {/* What's inside */}
      <section className="mx-auto max-w-5xl px-6 pt-12">
        <p className="eyebrow text-center">Table of contents</p>
        <h2 className="mt-2 text-center font-serif text-4xl text-kalo-950">
          Six sections. {totalRecipes} recipes.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-kalo-800">
          Each recipe lists serves, time, ingredients with sourcing notes,
          method, a Modern Variation for hard-to-source ingredients, and a
          serving suggestion linking to recipes elsewhere in the book.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.n} className="flex gap-5">
              <span className="font-serif text-2xl text-clay-500 leading-none pt-1">
                {s.n}
              </span>
              <div>
                <h3 className="font-serif text-2xl text-kalo-950">
                  {s.title}{" "}
                  <span className="ml-1 text-sm font-sans uppercase tracking-wider text-forest-500">
                    {s.count} recipes
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kalo-800/85">
                  {s.teaser}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LeafDivider />

      {/* From the publisher */}
      <section className="mx-auto max-w-3xl px-6 pt-12 text-center">
        <p className="eyebrow">A note from the publisher</p>
        <h2 className="mt-2 font-serif text-3xl text-kalo-950">
          Why this cookbook exists.
        </h2>
        <div className="mt-6 space-y-4 text-left text-kalo-800 leading-relaxed">
          <p>
            Polynesians ate this way for three thousand years. Then refined
            flour, refined sugar, and processed food arrived on the trade
            routes, and within two generations one of the healthiest dietary
            patterns ever measured had been replaced by one of the most
            burdened.
          </p>
          <p>
            <em>The Pacific Plate</em> is a working translation of the
            ancestral Polynesian diet into recipes that work in a normal
            kitchen with ingredients you can mostly find at a normal
            grocery store. Where an ingredient is hard to source, the book
            names the substitution and the trade-off it makes. Where it&apos;s
            worth the effort to find the real thing, the book says so and
            explains why.
          </p>
          <p>
            We are not Polynesian. Pacific Nutra is a publishing project
            that takes pains to credit the regions and traditions these
            recipes come from. The bibliography lists every source. The
            email at the back of the book reaches a human who reads
            everything.
          </p>
        </div>
      </section>

      <LeafDivider />

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pt-12">
        <p className="eyebrow text-center">FAQ</p>
        <h2 className="mt-2 text-center font-serif text-4xl text-kalo-950">
          The questions we get most.
        </h2>
        <dl className="mt-12 divide-y divide-cream-200">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="py-6">
              <dt className="font-serif text-xl text-kalo-950">{q}</dt>
              <dd className="mt-2 text-kalo-800 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Final CTA */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <div className="rounded-3xl bg-kalo-950 p-10 sm:p-14 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-clay-300">
            Get the book
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{p.title}</h2>
          <p className="mt-4 text-cream-100/85">{p.tagline}</p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <span className="font-serif text-4xl">${(p.priceCents / 100).toFixed(0)}</span>
            <BuyButton slug={p.slug} />
          </div>
          <p className="mt-4 text-xs text-cream-100/60">
            Instant download · 30-day refund ·{" "}
            <Link
              href="/sample"
              className="underline underline-offset-2 hover:text-cream-50"
            >
              read a sample
            </Link>
          </p>
        </div>
      </section>

      {/* Cross-sell to /affiliate */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="eyebrow">While you&apos;re here</p>
        <h2 className="mt-2 font-serif text-2xl text-kalo-950">
          Tools to cook from this book.
        </h2>
        <p className="mt-3 text-kalo-800">
          A short, curated list of pans, pantry staples, and reference books
          we keep coming back to.
        </p>
        <Link
          href="/affiliate"
          className="mt-6 inline-block text-sm font-medium text-clay-600 underline-offset-4 hover:underline"
        >
          See the Pacific Pantry →
        </Link>
      </section>
    </>
  );
}
