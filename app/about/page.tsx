import EmailCapture from "@/components/EmailCapture";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Photo slot="aboutHero" ratio="21/9" rounded={false} priority />
          <div className="absolute inset-0 bg-kalo-950/45" />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-28 text-center text-cream-50">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-clay-300">About</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl leading-[1.05]">
            Rebuilding the Pacific pantry,
            <br />
            <span className="italic">one recipe at a time.</span>
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-6 py-20 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
        <p className="lead text-xl text-kalo-800">
          Polynesians have eaten taro, breadfruit, sweet potato, fish, coconut,
          and leafy greens for over three thousand years. When researchers
          studied the original diet of Pacific Islanders, they found some of
          the lowest rates of heart disease, diabetes, and obesity ever
          recorded. Then Western processed foods arrived and those numbers
          reversed within two generations.
        </p>
        <p>
          Pacific Nutra exists to make the ancestral Polynesian diet
          accessible to anyone — without lecturing, without pretending it&apos;s
          a fad, and without selling supplements. Just recipes, stories, and a
          few carefully chosen digital cookbooks.
        </p>

        <h2>What we publish</h2>
        <ul>
          <li>A weekly recipe rooted in traditional Pacific Island cuisine</li>
          <li>In-depth field notes on individual foods — taro, breadfruit, poi, ulu</li>
          <li>Digital cookbooks and meal plans (the only thing we sell)</li>
        </ul>

        <h2>What we&apos;ll never do</h2>
        <ul>
          <li>Sell you a supplement that promises to cure something</li>
          <li>Pretend a single food is a magic bullet</li>
          <li>Bury actual cooking instructions under 2,000 words of preamble</li>
        </ul>

        <h2>Cultural posture</h2>
        <p>
          We are a guide, not a representative of Polynesian culture. We cite
          sources, name regions specifically — Hawaii, Samoa, Tonga, Tahiti —
          rather than collapsing them into one, and credit practitioners where
          relevant. Where we get something wrong, we want to hear about it.
        </p>
      </article>

      <LeafDivider />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="eyebrow">Start here</p>
        <h2 className="mt-2 font-serif text-3xl text-kalo-950">
          Get the first recipe.
        </h2>
        <p className="mt-3 text-kalo-800">
          We&apos;ll send you a free sample recipe from our upcoming cookbook,
          and then one short letter every Sunday.
        </p>
        <div className="mt-8">
          <EmailCapture inline source="about" cta="Send me the recipe" />
        </div>
      </section>
    </>
  );
}
