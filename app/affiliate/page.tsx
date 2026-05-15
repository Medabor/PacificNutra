import Image from "next/image";
import LeafDivider from "@/components/LeafDivider";
import { getAffiliatesByCategory, type AffiliateProduct } from "@/lib/affiliate";

export const metadata = {
  title: "The Pacific Pantry",
  description:
    "A short list of kitchen tools, pantry staples, and books we use to cook from the Pacific. Curated, not exhaustive.",
};

export default function AffiliatePage() {
  const byCategory = getAffiliatesByCategory();
  const categories: Array<keyof typeof byCategory> = ["Tools", "Pantry", "Books"];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow">The Pacific Pantry</p>
      <h1 className="mt-2 font-serif text-5xl text-kalo-950 leading-[1.05]">
        Curated for the Pacific kitchen.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-kalo-800">
        A short list of kitchen tools, pantry staples, and books we actually
        use. No supplements, no protein powders, no "ancient secret"
        anything. If we wouldn&apos;t buy it ourselves, it isn&apos;t here.
      </p>

      <p className="mt-6 max-w-2xl text-sm text-kalo-400">
        Some of these links are affiliate links — if you buy through them, we
        may earn a small commission at no extra cost to you. It helps keep
        the recipes free. We don&apos;t accept paid placements; commission
        doesn&apos;t affect which products make this page.
      </p>

      {categories.map((cat) => {
        const items = byCategory[cat];
        if (!items?.length) return null;
        return (
          <section key={cat} className="mt-20">
            <div className="flex items-end justify-between border-b border-cream-200 pb-4">
              <h2 className="font-serif text-3xl text-kalo-950">{cat}</h2>
              <p className="text-xs uppercase tracking-[0.18em] text-forest-500">
                {items.length} {items.length === 1 ? "pick" : "picks"}
              </p>
            </div>
            <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group block"
                >
                  <ProductImage product={p} />
                  <h3 className="mt-5 font-serif text-2xl text-kalo-950 group-hover:text-clay-600">
                    {p.name}
                  </h3>
                  {p.priceHint && (
                    <p className="mt-1 text-sm text-kalo-400">{p.priceHint}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-kalo-800">
                    {p.blurb}
                  </p>
                  <p className="mt-3 text-sm italic text-kalo-800/85 border-l-2 border-clay-400 pl-3">
                    {p.why}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-clay-600 group-hover:text-clay-700">
                    View on Amazon →
                  </p>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <LeafDivider />

      <section className="mt-12 rounded-2xl bg-cream-100 p-8 sm:p-12 text-center">
        <h2 className="font-serif text-3xl text-kalo-950">
          Something we should add?
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-kalo-800">
          We update this page as we find things worth recommending. If
          there&apos;s a Pacific-kitchen tool, pantry staple, or book that
          changed how you cook,{" "}
          <a
            href="mailto:hello@pacificnutra.com?subject=Pacific Pantry suggestion"
            className="text-clay-600 underline"
          >
            tell us
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function ProductImage({ product }: { product: AffiliateProduct }) {
  if (product.image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  const palette: Record<AffiliateProduct["category"], string> = {
    Tools: "from-kalo-800 via-kalo-900 to-kalo-950 text-cream-100",
    Pantry: "from-clay-400 via-clay-500 to-clay-700 text-cream-50",
    Books: "from-forest-500 via-forest-700 to-forest-800 text-cream-50",
  };
  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br p-6 text-center ${palette[product.category]}`}
    >
      <span className="font-serif text-2xl leading-tight">{product.name}</span>
    </div>
  );
}
