import Link from "next/link";
import Photo from "@/components/Photo";
import { getAllProducts } from "@/lib/products";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow">Shop</p>
      <h1 className="mt-2 font-serif text-5xl text-kalo-950">
        Digital cookbooks & guides.
      </h1>
      <p className="mt-4 max-w-2xl text-kalo-800">
        Every guide is a polished PDF you download immediately after
        purchase. No shipping. No inventory. Just recipes and field guides
        we&apos;ve actually cooked from.
      </p>
      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            className="group block overflow-hidden rounded-2xl bg-cream-100 transition hover:-translate-y-1"
          >
            <Photo slot="productPacificPlate" ratio="3/4" rounded={false} />
            <div className="p-7">
              <p className="eyebrow text-forest-500">Cookbook</p>
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
      </div>
    </div>
  );
}
