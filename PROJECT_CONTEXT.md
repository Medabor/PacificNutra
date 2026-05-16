# Pacific Nutra — Project Context

Snapshot for resuming work in a new session. Last updated: 2026-05-16.

## What this is

Pacific Nutra is a content + commerce site that sells digital ebooks. The
first (and currently only) product is **The Pacific Plate**, a $24 ebook.

## Stack & hosting

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Database / auth / storage:** Supabase
- **Payments:** Stripe (Checkout + webhook)
- **Email:** Beehiiv (newsletter, optional) and Resend (transactional, optional)
- **Hosting:** Hostinger Node.js app. **Auto-deploys on every push** to the
  branch below — no manual deploy step.
- **Repo:** `medabor/pacificnutra`
- **Working branch:** `claude/pacificnutra-business-ideas-V3L9L` — develop,
  commit, and push here.

## Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about`, `/affiliate`, `/privacy`, `/refund`, `/terms` | Static pages |
| `/blog`, `/blog/[slug]` | Blog |
| `/shop`, `/shop/[product]` | Product listing + detail |
| `/library` | Customer ebook library — Supabase magic-link auth |
| `/admin` | Subscribers/orders/revenue dashboard — magic-link auth, gated to `ADMIN_EMAIL`, `noindex`, unlinked from nav/footer |
| `/api/checkout` | Creates a Stripe Checkout session |
| `/api/stripe-webhook` | Handles `checkout.session.completed`; writes the order |
| `/api/subscribe` | Newsletter signup |

## Product

- **The Pacific Plate** — slug `the-pacific-plate`, price $24.00 (`2400` cents).
- Defined in `lib/products.ts`.
- Ebook PDF expected in Supabase Storage at `ebooks/the-pacific-plate-v1.pdf`.

## Database (Supabase)

Schema in `supabase/migrations/0001_init.sql`:
- `subscribers` — `id, email, source, created_at`
- `orders` — `id, email, product_slug, stripe_session_id, status, amount_cents, created_at`
- Private storage bucket `ebooks` (signed URLs handed out for downloads).
- RLS is on; server code uses the service-role key, which bypasses RLS.

## Environment variables (set in Hostinger → Node.js → Environment variables)

```
NEXT_PUBLIC_SITE_URL=https://pacificnutra.com
ADMIN_EMAIL=                              # the email allowed into /admin
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_THE_PACIFIC_PLATE=           # optional
BEEHIIV_API_KEY=                          # optional
BEEHIIV_PUBLICATION_ID=                   # optional
RESEND_API_KEY=                           # optional
```

Var names are read literally by the code — they must match exactly,
including the `NEXT_PUBLIC_` prefix where shown.

## Setup status

**Supabase — done.** Project created, migration run, Auth URL Configuration
set (Site URL + `/library` and `/admin` redirect URLs), env vars in Hostinger.

**Stripe — done, pending live verification.** Live mode. Webhook destination
"PacificNutra" created → endpoint `https://pacificnutra.com/api/stripe-webhook`,
API version `2026-04-22.dahlia`, listening to `checkout.session.completed`.
Live keys + webhook signing secret added to Hostinger.

The webhook route re-fetches the Checkout Session via the Stripe SDK so the
buyer email is reliable regardless of the endpoint's API version.

## Outstanding / next steps

1. **Confirm Stripe payouts** — verify a bank account is linked
   (Stripe → Settings → Payouts) so funds actually pay out.
2. **Live test purchase** — buy The Pacific Plate ($24) with a real card,
   verify: Stripe payment succeeded, webhook delivery succeeded, a `paid`
   row in Supabase `orders`, and the order shows on `/admin`. Then refund.
3. **Upload the ebook PDF** to the Supabase `ebooks` bucket as
   `the-pacific-plate-v1.pdf` (otherwise the library download 404s).
4. **Finish ebook content** (Section 2 was outstanding).
5. **Sample-chapter download** and **SEO plumbing** (sitemap/robots) were
   noted as open items.

## Deployment

Push to `claude/pacificnutra-business-ideas-V3L9L` → Hostinger auto-deploys.
No PRs unless explicitly requested.
