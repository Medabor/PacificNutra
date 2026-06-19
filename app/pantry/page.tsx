import LeafDivider from "@/components/LeafDivider";
import { getAffiliatesByCategory, type AffiliateProduct } from "@/lib/affiliate";

export const metadata = {
  title: "The Pacific Pantry",
  description:
    "The Pacific pantry — kitchen tools, pantry staples, and cookbooks we use to cook traditional Polynesian and Hawaiian food at home. Curated, not exhaustive.",
  alternates: { canonical: "/pantry" },
};

const CATEGORY_COLOR: Record<AffiliateProduct["category"], string> = {
  Tools: "bg-kalo-900 text-cream-50",
  Pantry: "bg-clay-500 text-cream-50",
  Books: "bg-forest-700 text-cream-50",
};

export default function PantryPage() {
  const byCategory = getAffiliatesByCategory();
  const categories: Array<keyof typeof byCategory> = ["Tools", "Pantry", "Books"];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow">The Pacific Pantry</p>
      <h1 className="mt-2 font-serif text-5xl text-kalo-950 leading-[1.05]">
        Curated for the Pacific kitchen.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-kalo-800">
        A short list of kitchen tools, pantry staples, and books we actually
        use. No supplements, no protein powders, no &ldquo;ancient secret&rdquo;
        anything. If we wouldn&apos;t buy it ourselves, it isn&apos;t here.
      </p>
      <p className="mt-4 max-w-2xl text-sm text-kalo-400">
        Some of these links are affiliate links — if you buy through them, we
        may earn a small commission at no extra cost to you. It helps keep the
        recipes free. We don&apos;t accept paid placements; commission
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
            <div className="mt-2 flex flex-col divide-y divide-cream-200">
              {items.map((p) => (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group grid gap-4 py-8 sm:grid-cols-[120px_1fr] sm:gap-10"
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] ${CATEGORY_COLOR[p.category]}`}
                    >
                      {p.category}
                    </span>
                    {p.priceHint && (
                      <p className="mt-3 hidden sm:block font-serif text-2xl text-kalo-950">
                        {p.priceHint}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-kalo-950 group-hover:text-clay-600 transition-colors">
                      {p.name}
                    </h3>
                    {p.priceHint && (
                      <p className="mt-1 font-serif text-xl text-kalo-950 sm:hidden">
                        {p.priceHint}
                      </p>
                    )}
                    <p className="mt-3 leading-relaxed text-kalo-800">{p.blurb}</p>
                    <p className="mt-3 border-l-2 border-clay-400 pl-4 text-sm italic text-kalo-800/85">
                      {p.why}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-clay-600 group-hover:text-clay-700">
                      View on Amazon →
                    </p>
                  </div>
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
