import EmailCapture from "@/components/EmailCapture";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 prose prose-ocean">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-coral-600">About</p>
      <h1 className="font-serif text-4xl text-ocean-950">
        We&apos;re rebuilding the Pacific pantry, one recipe at a time.
      </h1>
      <p className="lead">
        Polynesians have eaten taro, breadfruit, sweet potato, fish, coconut, and leafy
        greens for over three thousand years. When researchers studied the original
        diet of Pacific Islanders, they found some of the lowest rates of heart
        disease, diabetes, and obesity ever recorded. Then Western processed foods
        arrived and those numbers reversed.
      </p>
      <p>
        Pacific Nutra exists to make the ancestral Polynesian diet accessible to
        anyone — without lecturing, without pretending it&apos;s a fad, and without
        selling supplements. Just recipes, stories, and a few carefully chosen
        digital cookbooks.
      </p>
      <h2 className="font-serif">What we publish</h2>
      <ul>
        <li>A weekly recipe rooted in traditional Pacific Island cuisine</li>
        <li>In-depth articles on individual foods — taro, breadfruit, poi, ulu</li>
        <li>Digital cookbooks and meal plans (the only thing we sell)</li>
      </ul>
      <h2 className="font-serif">What we&apos;ll never do</h2>
      <ul>
        <li>Sell you a supplement that promises to cure something</li>
        <li>Pretend a single food is a magic bullet</li>
        <li>Bury actual cooking instructions under 2,000 words of preamble</li>
      </ul>
      <div className="not-prose mt-12 rounded-2xl bg-ocean-50 p-8">
        <h3 className="font-serif text-2xl text-ocean-950">Start with a free recipe</h3>
        <p className="mt-2 text-ocean-700">
          Subscribe and we&apos;ll send you a free sample recipe from our upcoming
          cookbook.
        </p>
        <div className="mt-6">
          <EmailCapture inline source="about" cta="Send me the recipe" />
        </div>
      </div>
    </article>
  );
}
