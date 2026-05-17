import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import LeafDivider from "@/components/LeafDivider";
import BuyButton from "@/components/BuyButton";
import { getEbookSample } from "@/lib/ebook";
import { getProductBySlug } from "@/lib/products";

export const metadata = {
  title: "Read a Sample",
  description:
    "Read the introduction and all five Roots & Tubers recipes from The Pacific Plate — the full first chapter, free.",
};

export default function SamplePage() {
  const sample = getEbookSample();
  const product = getProductBySlug("the-pacific-plate");
  if (!product) return null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="text-center">
        <p className="eyebrow">Free sample</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-kalo-950 leading-tight">
          The Pacific Plate — the first chapter
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-kalo-800 leading-relaxed">
          The introduction and all five recipes of Section 1, Roots &amp;
          Tubers — the same text as the book. The full edition adds 25 more
          recipes across five more sections.
        </p>
      </header>

      <div className="prose prose-lg prose-kalo mt-12 max-w-none prose-headings:font-serif prose-headings:text-kalo-950 prose-a:text-clay-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-clay-400 prose-blockquote:text-kalo-800">
        <MDXRemote source={sample} />
      </div>

      <LeafDivider />

      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-kalo-950 p-10 sm:p-14 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-clay-300">
            Keep reading
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Get all 30 recipes
          </h2>
          <p className="mt-4 text-cream-100/85">{product.tagline}</p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <span className="font-serif text-4xl">
              ${(product.priceCents / 100).toFixed(0)}
            </span>
            <BuyButton slug={product.slug} />
          </div>
          <p className="mt-4 text-xs text-cream-100/60">
            Instant download · 30-day refund ·{" "}
            <Link
              href={`/shop/${product.slug}`}
              className="underline underline-offset-2 hover:text-cream-50"
            >
              full details
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
