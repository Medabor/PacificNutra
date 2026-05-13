import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
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
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-14 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <Photo slot="productPacificPlate" ratio="3/4" priority />
        </div>
        <div className="sm:col-span-3">
          <p className="eyebrow">Digital cookbook</p>
          <h1 className="mt-2 font-serif text-5xl text-kalo-950">{p.title}</h1>
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
          <p className="mt-3 text-xs text-kalo-400">
            Instant PDF download · 30-day refund if you don&apos;t love it.
          </p>
        </div>
      </div>
    </div>
  );
}
