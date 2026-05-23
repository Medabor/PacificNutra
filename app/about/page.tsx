import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";

export const metadata = { title: "About", alternates: { canonical: "/about" } };

const PROMISES = [
  {
    title: "We cite our sources.",
    body:
      "Where a claim about diet or longevity comes from a study or a historical record, we name the source. The bibliography in every cookbook lists everything.",
  },
  {
    title: "We test before we publish.",
    body:
      "Every recipe is cooked at least three times in our kitchen, twice with the substitutions, before it ships. We name what didn't work in the notes.",
  },
  {
    title: "We name regions specifically.",
    body:
      "Hawaii, Samoa, Tonga, Tahiti, Fiji are different places with different traditions. We don't collapse them into one Polynesia™.",
  },
  {
    title: "We don't sell supplements.",
    body:
      "Not now, not later. The only thing we sell are the cookbooks and guides on the Shop page. The Pacific Pantry page links to other people's products with full disclosure.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Photo slot="aboutHero" fill priority />
        <div className="absolute inset-0 bg-gradient-to-b from-kalo-950/55 via-kalo-950/40 to-kalo-950/55" />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-clay-300">
            About
          </p>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-[1.05]">
            Rebuilding the Pacific pantry,
            <br />
            <span className="italic">one recipe at a time.</span>
          </h1>
        </div>
      </section>

      {/* Opening prose */}
      <article className="mx-auto max-w-2xl px-6 py-20 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
        <p className="lead text-xl text-kalo-800">
          Polynesians have eaten taro, breadfruit, sweet potato, fish,
          coconut, and leafy greens for over three thousand years. When
          researchers studied the original diet of Pacific Islanders, they
          found some of the lowest rates of heart disease, diabetes, and
          obesity ever recorded. Then Western processed foods arrived and
          those numbers reversed within two generations.
        </p>
        <p>
          Pacific Nutra exists to make the ancestral Polynesian diet
          accessible to anyone — without lecturing, without pretending
          it&apos;s a fad, and without selling supplements. Just recipes,
          stories, and a few carefully chosen digital cookbooks.
        </p>
      </article>

      {/* Mid-page photo break */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src="/images/Polynian-img4.jpg"
            alt="A carved pineapple table centerpiece with pandanus leaves, surrounded by plates of food in soft warm light"
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="mt-3 text-xs italic text-kalo-400 text-center">
          A traditional Pacific table — figs, pineapple, candied palm,
          banana flowers. The diet at home, before the trade routes.
        </p>
      </section>

      {/* What we publish (card section) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="eyebrow">What we publish</p>
        <h2 className="mt-2 font-serif text-4xl text-kalo-950">
          Three things, in this order.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-cream-100 p-7">
            <p className="font-serif text-2xl text-clay-500">01</p>
            <h3 className="mt-3 font-serif text-2xl text-kalo-950">
              Field Notes
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-kalo-800">
              Long-form articles on individual foods, nutritional research,
              and the history of Pacific cuisine. Free, weekly.
            </p>
          </div>
          <div className="rounded-2xl bg-cream-100 p-7">
            <p className="font-serif text-2xl text-clay-500">02</p>
            <h3 className="mt-3 font-serif text-2xl text-kalo-950">
              Cookbooks
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-kalo-800">
              Polished PDFs with thirty-or-so recipes each, tested in a
              real kitchen, with sourcing notes and modern substitutions.
              Paid.
            </p>
          </div>
          <div className="rounded-2xl bg-cream-100 p-7">
            <p className="font-serif text-2xl text-clay-500">03</p>
            <h3 className="mt-3 font-serif text-2xl text-kalo-950">
              The Pantry
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-kalo-800">
              A short, curated list of the kitchen tools, pantry staples,
              and reference books we use. Affiliate links, fully disclosed.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial promises */}
      <section className="mx-auto max-w-4xl px-6">
        <p className="eyebrow">What we promise</p>
        <h2 className="mt-2 font-serif text-4xl text-kalo-950">
          Four standing rules.
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {PROMISES.map((p) => (
            <div key={p.title}>
              <h3 className="font-serif text-2xl text-kalo-950">{p.title}</h3>
              <p className="mt-2 text-kalo-800 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <LeafDivider />

      {/* Cultural posture */}
      <article className="mx-auto max-w-2xl px-6 pt-12 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
        <h2>Cultural posture</h2>
        <p>
          We are a publishing project, not a cultural institution. We&apos;re
          guided by the source material — ethnographies, oral histories,
          chefs and home cooks who carry the traditions — and try to credit
          the people, regions, and practices these recipes come from. Where
          we get something wrong, we want to hear about it. The email at
          the back of every book reaches a human who reads everything.
        </p>
        <p>
          If your family kept a recipe alive that you think belongs in our
          next cookbook, write to us. We pay for contributions we use, with
          credit by name and a copy of the book.
        </p>
      </article>

      <LeafDivider />

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="eyebrow">Start here</p>
        <h2 className="mt-2 font-serif text-3xl text-kalo-950">
          Get the first recipe.
        </h2>
        <p className="mt-3 text-kalo-800">
          We&apos;ll send you a free sample recipe from the upcoming
          cookbook, and then one short letter every Sunday.
        </p>
        <div className="mt-8">
          <EmailCapture inline source="about" cta="Send me the recipe" />
        </div>
      </section>
    </>
  );
}
