# Pacific Nutra — Project Context

Snapshot for resuming work in a new session. Last updated: 2026-05-16.

## What this is

Pacific Nutra is a content + commerce site that sells digital ebooks. The
first (and currently only) product is **The Pacific Plate**, a $24 ebook.

## Stack & hosting

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Database / auth / storage:** Supabase
- **Payments:** Stripe (Checkout + webhook), in **Live mode**
- **Email:** Beehiiv (newsletter, optional) and Resend (transactional, optional)
- **Hosting:** Hostinger Node.js app. **Auto-deploys on every push** to the
  branch below — no manual deploy step. App runs behind a reverse proxy, so
  `NEXT_PUBLIC_SITE_URL` must be set explicitly (the request origin resolves
  to an internal `localhost` address otherwise).
- **Repo:** `medabor/pacificnutra`
- **Working branch:** `claude/pacificnutra-business-ideas-V3L9L` — the single
  source of truth. Develop, commit, and push here.

> **Branch discipline (read this).** Hostinger auto-deploys *only*
> `claude/pacificnutra-business-ideas-V3L9L`. A session may be assigned a
> different per-session branch name (e.g. `claude/resume-...`) — **ignore it**
> and commit/push to `claude/pacificnutra-business-ideas-V3L9L`, or the work
> won't deploy. Each session runs in its own git sandbox, so a freshly
> created session branch can look "ahead" of a stale local copy of the deploy
> branch; that is not real divergence. On session start, run `git fetch origin`
> and work on `claude/pacificnutra-business-ideas-V3L9L` (it fast-forwards).
> The GitHub repo should only ever have this one branch.

## Domain plan

- Real domain: **`pacificnutra.com`** — the decision is to connect this domain
  now and keep building on it (zero traffic, so low risk), rather than ship on
  staging and cut over later.
- Staging domain `https://staging.pacificnutra.com` exists but is **not** the
  target — all config (env var, Supabase, Stripe) should point at
  `pacificnutra.com`.
- The whole site is **`noindex`** while building (see below). The site must
  not be shared/marketed until the ebook is finished and uploaded.

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

## Environment variables (Hostinger → Node.js → Environment variables)

```
NEXT_PUBLIC_SITE_URL=https://pacificnutra.com
ADMIN_EMAIL=                              # the email allowed into /admin
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=                        # sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=       # pk_live_...
STRIPE_WEBHOOK_SECRET=                    # whsec_...
STRIPE_PRICE_THE_PACIFIC_PLATE=           # optional
BEEHIIV_API_KEY=                          # optional
BEEHIIV_PUBLICATION_ID=                   # optional
RESEND_API_KEY=                           # optional
```

Var names are read literally by the code — they must match exactly,
including the `NEXT_PUBLIC_` prefix where shown. Changing env vars requires
an app restart in Hostinger.

## Setup status

**Supabase — done.** Project created, migration run, env vars in Hostinger.
Auth → URL Configuration: Site URL and `/library` + `/admin` redirect URLs
should all use `https://pacificnutra.com`.

**Stripe — done, pending live verification.** Live mode. Webhook destination
"PacificNutra" → endpoint `https://pacificnutra.com/api/stripe-webhook`,
API version `2026-04-22.dahlia`, event `checkout.session.completed`. Live
keys + webhook signing secret added to Hostinger. The webhook route
re-fetches the Checkout Session via the SDK so the buyer email is reliable
regardless of the endpoint's API version.

**Test purchase — partial.** A live test purchase was completed using a
100%-off promo code; the payment shows in Stripe. But the webhook delivery
failed (the site/domain wasn't reachable at the time), so the order was
**not** recorded in Supabase. Needs a resend / re-test once the domain and
`NEXT_PUBLIC_SITE_URL` are correct.

**noindex — active.** `app/layout.tsx` has a site-wide
`robots: { index: false, follow: false }` with a comment marking it for
removal at launch.

## Outstanding / next steps

1. **Connect `pacificnutra.com`** in Hostinger/DNS (currently the site is
   reached via the staging domain).
2. **Add `NEXT_PUBLIC_SITE_URL=https://pacificnutra.com`** in Hostinger (it
   was missing — this caused the broken post-checkout redirect). Restart.
3. **Confirm Stripe payouts** — a bank account must be linked
   (Stripe → Settings → Payouts) for funds to pay out.
4. **Fix the failed test order** — in the Stripe webhook's Event deliveries
   tab, resend the failed `checkout.session.completed`, or run a fresh test
   purchase. Verify a `paid` row appears in Supabase `orders` and on `/admin`.
5. **Upload the ebook PDF** to the Supabase `ebooks` bucket as
   `the-pacific-plate-v1.pdf` (otherwise the library download 404s).
6. **Finish ebook content** (Section 2 was outstanding).
7. **Sample-chapter download** and **SEO plumbing** (sitemap/robots) — open
   items.
8. **At launch:** remove the `robots` line in `app/layout.tsx` so the site
   becomes indexable.

## Deployment

Push to `claude/pacificnutra-business-ideas-V3L9L` → Hostinger auto-deploys.
No PRs unless explicitly requested.
