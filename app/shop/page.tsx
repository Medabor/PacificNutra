import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-coral-600">Shop</p>
      <h1 className="mt-2 font-serif text-4xl text-ocean-950">Digital cookbooks & guides</h1>
      <p className="mt-3 max-w-2xl text-ocean-700">
        Every product is a polished PDF you download immediately after purchase. No
        shipping, no inventory — just recipes and guides we&apos;ve actually cooked
        from.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            className="group block rounded-2xl border border-ocean-100 bg-white p-8 transition hover:border-coral-300 hover:shadow-md"
          >
            <div className="aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-coral-400 via-sand-300 to-ocean-300 mb-6 flex items-center justify-center">
              <span className="font-serif text-2xl text-ocean-950 px-6 text-center">
                {p.title}
              </span>
            </div>
            <h2 className="font-serif text-2xl text-ocean-950 group-hover:text-coral-600">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-ocean-700">{p.tagline}</p>
            <p className="mt-4 font-medium text-ocean-900">
              ${(p.priceCents / 100).toFixed(0)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
