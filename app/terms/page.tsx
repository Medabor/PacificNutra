import LeafDivider from "@/components/LeafDivider";

export const metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
      <p className="eyebrow">Terms</p>
      <h1 className="font-serif text-4xl text-kalo-950">Terms of service.</h1>
      <p className="text-sm text-kalo-400">Last updated: May 2026</p>

      <p>
        These terms govern your use of pacificnutra.com (the &quot;Site&quot;)
        and any digital products or newsletters we sell or send. By using the
        Site, you agree to them.
      </p>

      <h2>What we provide</h2>
      <p>
        Pacific Nutra publishes recipes, articles, and digital cookbooks
        related to traditional Polynesian and Pacific Islander cuisine. The
        Site also offers an opt-in newsletter and an affiliate-link page for
        recommended kitchen tools, pantry staples, and books.
      </p>

      <h2>Educational content, not medical advice</h2>
      <p>
        Everything on this Site is for educational and culinary interest only.
        It is <strong>not</strong> medical advice, dietary advice, or a
        diagnosis or treatment of any condition. Talk to a qualified medical
        or nutrition professional before making significant dietary changes,
        especially if you are pregnant, breastfeeding, or managing a medical
        condition.
      </p>

      <h2>Allergies & food safety</h2>
      <p>
        Recipes may contain common allergens (fish, shellfish, coconut, soy
        substitutes, etc.). Always check ingredient labels for the brands you
        buy. Cooking temperatures and times are guidance — use a thermometer
        for meat and fish, and follow standard food-safety practice for raw
        seafood (poke, lomi salmon).
      </p>

      <h2>Purchases of digital products</h2>
      <ul>
        <li>
          Digital products are licensed to you for personal, non-commercial use.
          You may print copies for your own kitchen.
        </li>
        <li>
          You may not redistribute, resell, post publicly, or share access
          credentials to your library.
        </li>
        <li>
          See our <a href="/refund">refund policy</a> for the 30-day refund
          window.
        </li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Some outbound links — particularly on the{" "}
        <a href="/affiliate">Pacific Pantry</a> page — are affiliate links. If
        you buy through them we may earn a small commission at no extra cost
        to you. We don&apos;t accept paid placements, and commission does not
        influence which products we recommend.
      </p>

      <h2>Newsletter</h2>
      <p>
        By subscribing you agree to receive the Pacific Nutra newsletter and
        occasional related emails. Unsubscribe with one click in any email.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All original content (text, images, recipes, designs) is owned by
        Pacific Nutra. You may quote short excerpts with credit and a link
        back. For longer use or republication, please ask first.
      </p>

      <h2>Cultural attribution</h2>
      <p>
        Pacific Nutra is a publishing project, not a cultural institution. We
        write about Polynesian and Pacific Islander food traditions with
        respect, cite our sources, and welcome corrections. If you believe
        anything we publish misrepresents a cultural practice or community,
        please write to us.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, Pacific Nutra is not liable for
        any indirect, incidental, or consequential damages arising from your
        use of the Site or its content. Our total liability is limited to the
        amount you paid us, if any, in the twelve months preceding the claim.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of the jurisdiction in which
        Pacific Nutra is registered. Disputes will be resolved in the courts
        of that jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms occasionally. Material changes will be
        announced on this page and via the newsletter.
      </p>

      <LeafDivider />

      <p className="text-sm text-kalo-400">
        Questions: <a href="mailto:hello@pacificnutra.com">hello@pacificnutra.com</a>
      </p>
    </article>
  );
}
