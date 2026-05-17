# Pacific Nutra — Project Context

Snapshot for resuming work in a new session. Last updated: 2026-05-17.

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
| `/sample` | Free sample — renders the intro + Section 1 of the ebook manuscript in-browser, with a buy CTA |
| `/library` | Customer ebook library — Supabase magic-link auth |
| `/admin` | Subscribers/orders/revenue dashboard — magic-link auth, gated to `ADMIN_EMAIL`, `noindex`, unlinked from nav/footer |
| `/api/checkout` | Creates a Stripe Checkout session |
| `/api/stripe-webhook` | Handles `checkout.session.completed`; writes the order |
| `/api/subscribe` | Newsletter signup |

## Product

- **The Pacific Plate** — slug `the-pacific-plate`, price $24.00 (`2400` cents).
- Defined in `lib/products.ts`.
- Ebook PDF expected in Supabase Storage at `ebooks/the-pacific-plate-v1.pdf`.
- Manuscript draft: `content/ebook/the-pacific-plate.md`. Intro + Sections 1–2
  (11 recipes) fully written; Sections 3–6 (19 recipes) still outline-only.
  The `/sample` route renders the intro + Section 1 from this file.

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

**noindex — active.** Two coordinated crawl blocks while building:
`app/layout.tsx` has a site-wide `robots: { index: false, follow: false }`,
and `app/robots.ts` serves `Disallow: /`. Both carry a comment marking them
for the launch toggle.

**SEO plumbing — done.** `app/sitemap.ts` (lists all public routes, posts,
and products) and `app/robots.ts` are in place.

## Outstanding / next steps

1. ~~Connect `pacificnutra.com` in Hostinger/DNS.~~ **Done.**
2. ~~Add `NEXT_PUBLIC_SITE_URL=https://pacificnutra.com` in Hostinger.~~
   **Done.**
3. **Confirm Stripe payouts** — verify a bank account is linked
   (Stripe → Settings → Payouts) for funds to pay out. Still to check.
4. **Verify the test order recorded.** A real order was placed and shows in
   Stripe; confirm a `paid` row also appears in Supabase `orders` and on
   `/admin` (i.e. the webhook delivered successfully).
5. **Upload the ebook PDF** to the Supabase `ebooks` bucket as
   `the-pacific-plate-v1.pdf` (otherwise the library download 404s).
   Blocked on item 6 — the manuscript must be finished first.
6. **Finish ebook content.** Intro + Sections 1–2 are written; Sections 3–6
   (19 recipes) are still outline-only in
   `content/ebook/the-pacific-plate.md`.
7. ~~Sample-chapter page and SEO plumbing (sitemap/robots).~~ **Done** —
   `/sample` route + `sitemap.ts` + `robots.ts`.
8. **At launch:** remove the `robots` line in `app/layout.tsx` *and* flip
   `app/robots.ts` to the launch rule (both noted in-file) so the site
   becomes indexable.

## Deployment

Push to `claude/pacificnutra-business-ideas-V3L9L` → Hostinger auto-deploys.
No PRs unless explicitly requested.
