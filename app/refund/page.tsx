import LeafDivider from "@/components/LeafDivider";

export const metadata = { title: "Refunds", alternates: { canonical: "/refund" } };

export default function RefundPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
      <p className="eyebrow">Refunds</p>
      <h1 className="font-serif text-4xl text-kalo-950">
        30-day, no-questions-asked refunds.
      </h1>
      <p className="text-sm text-kalo-400">Last updated: May 2026</p>

      <p className="lead text-xl text-kalo-800">
        We sell digital cookbooks. If a book doesn&apos;t earn its place on
        your shelf, we&apos;ll refund you in full within 30 days of your
        purchase. No forms, no proof of dissatisfaction, no &quot;why are you
        leaving us&quot; survey.
      </p>

      <h2>How to request a refund</h2>
      <ol>
        <li>
          Email <a href="mailto:hello@pacificnutra.com">hello@pacificnutra.com</a>
          from the address you used at checkout.
        </li>
        <li>Subject line: <em>Refund</em>.</li>
        <li>That&apos;s it. You don&apos;t need to explain.</li>
      </ol>
      <p>
        We&apos;ll process the refund through Stripe within two business days.
        It will appear on your statement in 5–10 business days, depending on
        your bank.
      </p>

      <h2>What happens to your library</h2>
      <p>
        After a refund, access to the refunded product is removed from your
        library at <a href="/library">/library</a>. The newsletter
        subscription is unaffected — you can keep getting recipes if you
        want, or unsubscribe with one click.
      </p>

      <h2>If something is wrong with the file</h2>
      <p>
        If your PDF is corrupt, won&apos;t open, or has a content error,
        write to us first — we&apos;d rather fix it than refund it. We
        usually push corrections within 24 hours.
      </p>

      <h2>What we ask in return</h2>
      <p>
        Just one thing: don&apos;t request a refund and then keep using the
        recipes. We trust you.
      </p>

      <LeafDivider />

      <p className="text-sm text-kalo-400">
        Refunds: <a href="mailto:hello@pacificnutra.com">hello@pacificnutra.com</a>
      </p>
    </article>
  );
}
