import LeafDivider from "@/components/LeafDivider";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 prose prose-lg prose-kalo prose-headings:font-serif prose-a:text-clay-600">
      <p className="eyebrow">Privacy</p>
      <h1 className="font-serif text-4xl text-kalo-950">Privacy policy.</h1>
      <p className="text-sm text-kalo-400">Last updated: May 2026</p>

      <p>
        Pacific Nutra (&quot;we&quot;, &quot;us&quot;) operates pacificnutra.com.
        This page explains what data we collect, why, where it lives, and your
        rights over it. We try to keep it short and in plain English.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Email address</strong> — when you subscribe to the newsletter
          or buy a product. Stored in our database (Supabase) and our newsletter
          provider (Beehiiv).
        </li>
        <li>
          <strong>Purchase data</strong> — when you buy a digital product, our
          payment processor (Stripe) collects your name, email, billing address,
          and payment details. We never see or store your card number; we only
          see the order amount, your email, and the product you bought.
        </li>
        <li>
          <strong>Basic analytics</strong> — anonymous page-view data (page,
          referrer, country, device type) via privacy-respecting analytics. We
          do not use cross-site tracking cookies or advertising pixels.
        </li>
      </ul>

      <h2>Why we collect it</h2>
      <ul>
        <li>To send you the newsletter you subscribed to</li>
        <li>To deliver the digital product you bought</li>
        <li>To grant access to your library at /library</li>
        <li>To understand which pages people read, in aggregate</li>
        <li>To meet legal and tax obligations on sales</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We share your data only with the service providers we use to run the
        business:
      </p>
      <ul>
        <li><strong>Supabase</strong> — database and file storage</li>
        <li><strong>Stripe</strong> — payment processing</li>
        <li><strong>Beehiiv</strong> — newsletter delivery</li>
        <li><strong>Hostinger</strong> — web hosting</li>
      </ul>
      <p>
        We do <strong>not</strong> sell, rent, or otherwise share your data
        with advertisers, data brokers, or third parties beyond the operational
        providers listed above.
      </p>

      <h2>Cookies</h2>
      <p>
        We use the minimum cookies needed for the site to work — a session
        cookie for sign-in (Supabase Auth) and a small Stripe cookie during
        checkout. We do not use advertising or tracking cookies.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us at any time to:
      </p>
      <ul>
        <li>See what data we hold about you</li>
        <li>Correct anything inaccurate</li>
        <li>Delete your data (subject to legal record-keeping requirements)</li>
        <li>Export your data in a portable format</li>
        <li>Unsubscribe from the newsletter (one click in any email)</li>
      </ul>
      <p>
        Email <a href="mailto:hello@pacificnutra.com">hello@pacificnutra.com</a>
        and we will respond within 30 days. For users in the EU/UK, you also
        have the right to lodge a complaint with your local data-protection
        authority.
      </p>

      <h2>Data retention</h2>
      <p>
        Newsletter subscribers: until you unsubscribe. Purchase records: 7
        years (required for tax). Library access: while you have an active
        purchase. Analytics: 12 months, anonymous.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13. We do not knowingly
        collect data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we make material changes, we will email subscribers and update the
        &quot;last updated&quot; date above.
      </p>

      <LeafDivider />

      <p className="text-sm text-kalo-400">
        Questions: <a href="mailto:hello@pacificnutra.com">hello@pacificnutra.com</a>
      </p>
    </article>
  );
}
