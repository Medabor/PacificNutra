import { notFound } from "next/navigation";
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

export default async function ProductPage({ params }: Props) {
  const { product } = await params;
  const p = getProductBySlug(product);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-12 sm:grid-cols-2">
        <div className="aspect-[3/4] w-full rounded-2xl bg-gradient-to-br from-coral-400 via-sand-300 to-ocean-300 shadow-xl flex items-center justify-center">
          <span className="font-serif text-3xl text-ocean-950 px-8 text-center">
            {p.title}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-coral-600">
            Digital cookbook
          </p>
          <h1 className="mt-2 font-serif text-4xl text-ocean-950">{p.title}</h1>
          <p className="mt-4 text-lg text-ocean-800">{p.tagline}</p>
          <p className="mt-6 text-ocean-700 leading-relaxed">{p.description}</p>
          <ul className="mt-8 space-y-2 text-ocean-800">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-coral-500">✦</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-serif text-3xl text-ocean-950">
              ${(p.priceCents / 100).toFixed(0)}
            </span>
            <BuyButton slug={p.slug} />
          </div>
          <p className="mt-3 text-xs text-ocean-600">
            Instant PDF download. 30-day refund if you don&apos;t love it.
          </p>
        </div>
      </div>
    </div>
  );
}
