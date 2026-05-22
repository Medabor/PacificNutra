# Pacific Nutra — Project Context

Snapshot for resuming work in a new session. Last updated: 2026-05-22.

## What this is

Pacific Nutra is a content + commerce site that sells digital ebooks. The
first (and currently only) product is **The Pacific Plate**, a $24 ebook
(30 Polynesian recipes rebuilt for the modern kitchen).

## Stack & hosting

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Database / auth / storage:** Supabase
- **Payments:** Stripe (Checkout + webhook), in **Live mode**
- **Email:** Beehiiv (newsletter, optional) and Resend (transactional, optional)
- **Hosting:** Hostinger, via its **GitHub-connected auto-deployment** for
  Next.js (Node 22.x). Every push to the deploy branch is pulled, built
  (`next build`), and released automatically — no manual step. App runs
  behind a reverse proxy, so `NEXT_PUBLIC_SITE_URL` must be set explicitly
  (the request origin otherwise resolves to an internal `localhost`).
- **Deploy gotchas (hard-won — do not regress):**
  - **No `output: "standalone"`** in `next.config.mjs`. It stops
    `/_next/static` (the CSS/JS bundles) from being served and renders the
    whole site unstyled.
  - **Build tools live in `dependencies`,** not `devDependencies` (Tailwind,
    PostCSS, TypeScript, `@types/*`). A production-mode install otherwise
    skips them and the build ships with no CSS.
  - **The Hostinger CDN is currently OFF.** Re-enable at launch; when it is
    on, purge its cache after each deploy.
  - Hostinger's integration runs the app itself; the repo's `server.js` is
    not used by it.
- **Repo:** `medabor/pacificnutra`
- **Working branch:** `claude/pacificnutra-business-ideas-V3L9L` — the single
  source of truth. Develop, commit, and push here.

> **Branch discipline (read this).** Hostinger auto-deploys *only*
> `claude/pacificnutra-business-ideas-V3L9L`. A session may be assigned a
> different per-session branch name (e.g. `claude/resume-...`) — **ignore it**
> and commit/push to `claude/pacificnutra-business-ideas-V3L9L`, or the work
> won't deploy. On session start, run `git fetch origin` and work on
> `claude/pacificnutra-business-ideas-V3L9L` (it fast-forwards).

## Domain

- **`pacificnutra.com`** — live, connected to Hostinger. All config
  (env vars, Supabase, Stripe) points here.
- The whole site is **`noindex`** until launch (see Outstanding).

## Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about`, `/affiliate`, `/privacy`, `/refund`, `/terms` | Static pages |
| `/blog`, `/blog/[slug]` | Blog |
| `/shop`, `/shop/[product]` | Product listing + detail |
| `/sample` | Free sample — renders intro + Section 1 in-browser, with buy CTA |
| `/library` | Customer ebook library — Supabase magic-link auth |
| `/admin` | Orders/revenue dashboard — magic-link auth, gated to `ADMIN_EMAIL` |
| `/api/checkout` | Creates a Stripe Checkout session |
| `/api/stripe-webhook` | Handles `checkout.session.completed`; writes the order |
| `/api/subscribe` | Newsletter signup |

## Product

- **The Pacific Plate** — slug `the-pacific-plate`, price **$24.00** (2400 cents).
- Defined in `lib/products.ts`. Bullets: 30 recipes, ~80 pages, PDF.
- **Content rule — no pork, no alcohol** anywhere on site (recipes, blog, copy).
- **Ebook PDF:** uploaded to Supabase Storage as `ebooks/the-pacific-plate-v1.pdf`. ✅
- **Ebook source HTML:** `the-pacific-plate-ebook.html` in repo root — the full
  30-recipe manuscript styled for browser/print. Contains:
  - Cover image embedded as base64 (extracted from the approved Canva design)
  - Table of contents
  - 30 recipes across 6 sections with Unsplash photo URLs (visible in browser;
    hidden in CSS `@media print` to avoid blank boxes)
  - Teal section openers with `print-color-adjust: exact` so they keep colour
  - Print CSS: `@page { size: Letter portrait }`, no headers/footers
  - To produce a new PDF: open in Chrome → ⌘P → Portrait, Margins: None,
    uncheck Headers & footers, check Background graphics → Save as PDF
- **Manuscript markdown:** `content/ebook/the-pacific-plate.md` — the `/sample`
  route renders the intro + Section 1 from this file.
- **Book cover:** V3 approved (dark teal, dish photos, "30 recipes" badge,
  Pacific Nutra logo). Embedded in `the-pacific-plate-ebook.html`.
  **Still to do:** wire it into the site as the `/shop` product image
  (currently `polyneian-img2.jpg` placeholder). Export the cover from Canva
  as JPG → upload to `public/images/` → update `lib/photos.ts`
  `productPacificPlate` slot.

## Brand & logo

- **Logo:** `public/brand/pacific-nutra-logo.svg` — circular emblem (taro leaf
  over Pacific waves). Rendered by `components/Logo.tsx` and `app/icon.svg`.
- **Palette:** `#1C3942` ocean-deep teal · `#FAF6EE` cream · `#DD7E5C` clay/
  terracotta · `#D2BE93` warm gold · `#2F4F3A` forest green
- **Fonts:** Fraunces (serif, headings) · Manrope (sans, body)
- **Nav wordmark:** "Pacific" Fraunces regular upright `#1C1209` ·
  "Nutra" Fraunces medium italic `#DD7E5C` · text-xl tracking-tight

## Database (Supabase)

Schema in `supabase/migrations/0001_init.sql`:
- `subscribers` — `id, email, source, created_at`
- `orders` — `id, email, product_slug, stripe_session_id, status, amount_cents, created_at`
- Private storage bucket `ebooks` — signed URLs for downloads.
- RLS is on; server code uses the service-role key (bypasses RLS).
- Supabase Auth → URL Configuration must use `https://pacificnutra.com`
  for Site URL and `/library` + `/admin` redirect URLs.

## Stripe

- Live mode. Webhook: `https://pacificnutra.com/api/stripe-webhook`,
  event `checkout.session.completed`, API version `2026-04-22.dahlia`.
- Webhook handler (`app/api/stripe-webhook/route.ts`) uses `upsert` on
  `stripe_session_id` (idempotent). Re-fetches session via SDK for reliable
  email. Solid — no changes needed.

## Environment variables (Hostinger → Node.js → Environment variables)

```
NEXT_PUBLIC_SITE_URL=https://pacificnutra.com
ADMIN_EMAIL=                              # email allowed into /admin
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

## Launch checklist — what's left

### Must-do before going live

1. **Verify test order in Supabase.** ✅ Done.

2. **Confirm Stripe payouts bank account.** ✅ Done (Stripe Identity verified 2026-05-22).

3. **Flip noindex → live.** Two places:
   - `app/layout.tsx` — remove the `robots: { index: false, follow: false }`
     metadata line (marked with a comment).
   - `app/robots.ts` — swap the `Disallow: /` rule for the launch rule
     (also marked with a comment).

4. **Re-enable Hostinger CDN** (was turned off during build to avoid stale
   cache). Go to Hostinger → your site → CDN → enable. Purge cache after
   first post-launch deploy.

5. **Wire book cover into the shop page.** ✅ Done.

6. **Ebook v1.1 with recipe photos.** ✅ Done.

7. **Blog content.** ✅ Done.

8. **Beehiiv newsletter integration.** 🔄 In progress (2026-05-22).
   - Need: `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` (starts with `pub_`)
     from Beehiiv → Settings → API.
   - Set both in Hostinger environment variables.
   - The `/api/subscribe` route already consumes these — no code changes needed
     once the env vars are set.

## Deployment

Push to `claude/pacificnutra-business-ideas-V3L9L` → Hostinger auto-deploys.
No PRs unless explicitly requested.
