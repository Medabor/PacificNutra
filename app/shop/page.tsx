import Link from "next/link";
import Photo from "@/components/Photo";
import LeafDivider from "@/components/LeafDivider";
import EmailCapture from "@/components/EmailCapture";
import { getAllProducts } from "@/lib/products";
import type { PhotoSlotKey } from "@/lib/photos";

export const metadata = { title: "Shop", alternates: { canonical: "/shop" } };

const UPCOMING: Array<{
  title: string;
  teaser: string;
  eta: string;
  coverSlot?: PhotoSlotKey;
}> = [
  {
    title: "30-Day Pacific Meal Plan",
    teaser:
      "A four-week schedule built from the recipes in The Pacific Plate, with shopping lists and a Sunday prep routine. Releases summer 2026.",
    eta: "Summer 2026",
    coverSlot: "productMealPlan",
  },
  {
    title: "From the Sea",
    teaser:
      "A dedicated guide to Pacific seafood — sourcing fresh fish, raw preparations, banana-leaf wrapping, sustainable choices.",
    eta: "Late 2026",
  },
];

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-2 font-serif text-5xl text-kalo-950">
          Digital cookbooks &amp; guides.
        </h1>
        <p className="mt-4 max-w-2xl text-kalo-800">
          Every guide is a polished PDF you download immediately after
          purchase. No shipping. No inventory. Just recipes and field
          guides we&apos;ve actually cooked from.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group block overflow-hidden rounded-2xl bg-cream-100 transition hover:-translate-y-1"
            >
              <Photo slot="productPacificPlate" ratio="2/3" fit="contain" rounded={false} />
              <div className="p-7">
                <p className="eyebrow text-forest-500">Cookbook · Out now</p>
                <h2 className="mt-2 font-serif text-3xl text-kalo-950 group-hover:text-clay-600">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-kalo-800">{p.tagline}</p>
                <p className="mt-5 font-serif text-2xl text-kalo-950">
                  ${(p.priceCents / 100).toFixed(0)}
                </p>
              </div>
            </Link>
          ))}

          {UPCOMING.map((u) => (
            <div
              key={u.title}
              className="overflow-hidden rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-8"
            >
              {u.coverSlot ? (
                <Photo slot={u.coverSlot} ratio="2/3" fit="contain" rounded />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-gradient-to-br from-forest-700 via-forest-800 to-kalo-950 p-6 text-center text-cream-50">
                  <span className="font-serif text-2xl leading-tight">
                    {u.title}
                  </span>
                </div>
              )}
              <p className="mt-6 eyebrow text-forest-500">Coming · {u.eta}</p>
              <h3 className="mt-2 font-serif text-2xl text-kalo-950">
                {u.title}
              </h3>
              <p className="mt-3 text-sm text-kalo-800">{u.teaser}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-kalo-400">
                Subscribe to know when it ships
              </p>
            </div>
          ))}
        </div>
      </section>

      <LeafDivider />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="eyebrow">Be first to know</p>
        <h2 className="mt-2 font-serif text-3xl text-kalo-950">
          Get notified when new guides ship.
        </h2>
        <p className="mt-3 text-kalo-800">
          Subscribers get launch-week pricing and the occasional preview
          chapter before publication.
        </p>
        <div className="mt-8">
          <EmailCapture inline source="shop" cta="Notify me" successMessage="You're on the list — we'll keep you posted." />
        </div>
      </section>
    </>
  );
}
