# Pacific Nutra — Project Context

Snapshot for resuming work in a new session. Last updated: 2026-06-21.

## What this is

Pacific Nutra is a content + commerce site that sells digital ebooks. The
first (and currently only) product is **The Pacific Plate**, a $24 ebook
(30 Polynesian recipes rebuilt for the modern kitchen).

## Stack & hosting

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Database / auth / storage:** Supabase
- **Payments:** Stripe (Checkout + webhook), in **Live mode**
- **Email:** Resend (welcome email) + Beehiiv (newsletter list + manual Sunday sends)
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
  - **Auth middleware is scoped to `/library` + `/admin` only**
    (`middleware.ts` matcher). It previously ran `supabase.auth.getUser()` on
    *every* request — an outbound Supabase call per page view and per crawler
    hit — which burned Hostinger's rolling 24h resource allowance and caused
    503 throttling (2026-06-21). Do **not** widen the matcher back to the whole
    site; the public pages are static and need no session.
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
- Site is **indexable** as of 2026-05-23 (launched). `/admin`, `/library`,
  and `/api/*` are disallowed in `robots.ts`.

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
| `/unsubscribe` | Unsubscribe confirmation page (noindex) |
| `/api/unsubscribe` | One-click + link unsubscribe — removes from Supabase + Beehiiv |

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
  Pacific Nutra logo). Embedded in `the-pacific-plate-ebook.html` and
  wired on the site as `productPacificPlate` → `pacific-plate-cover.png`.

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

## Email architecture

Three separate jobs, three separate tools:

| Job | Tool | Status |
|---|---|---|
| Welcome email on signup | **Resend** (`lib/resend.ts`) | ✅ Live |
| Subscriber list / newsletter list | **Beehiiv** (API sync on signup) | ✅ Live |
| Weekly Sunday newsletter | **Beehiiv** (manual send) | ⏳ Not started — see below |

### Welcome email (Resend)
- `lib/resend.ts` → `sendWelcomeEmail(email)` — reads `email-templates/welcome.html`
  and sends via Resend API from `hello@pacificnutra.com`.
- Called in `/api/subscribe` for **new subscribers only** (pre-upsert check).
- Domain `pacificnutra.com` verified in Resend. `RESEND_API_KEY` set in Hostinger. ✅
- **Deliverability (2026-06-21):** the send now includes a plain-text part,
  `List-Unsubscribe` + one-click `List-Unsubscribe-Post` headers, and a footer
  unsubscribe link. Send failures are now logged (`[welcome-email] …`) instead
  of silently swallowed.
- **Unsubscribe flow:** footer link + headers point to `/api/unsubscribe`, which
  verifies an HMAC token (signed with the service-role key — no new env var),
  deletes the row from Supabase `subscribers`, and best-effort removes the
  address from Beehiiv (`removeFromBeehiiv` in `lib/beehiiv.ts`) so future
  Sunday sends stop too. `/unsubscribe` is the confirmation page; helpers live
  in `lib/unsubscribe.ts`.
- Beehiiv's automation feature was NOT used — it required a $49/mo upgrade to
  republish a paused automation, so we bypassed it entirely with Resend.
- `BEEHIIV_AUTOMATION_ID` is NOT needed and NOT set.

### Newsletter (Beehiiv)
- New subscribers are synced to Beehiiv via `addToBeehiiv()` in `lib/beehiiv.ts`
  (soft-fail if keys missing). They appear in Beehiiv's subscriber list.
- 29 Sunday newsletter HTML templates are pre-generated in `email-templates/sunday/`
  (one per recipe, skipping 1.3 which is the welcome email recipe).
- **No newsletter has ever been sent.** To send: log into Beehiiv → New Post →
  paste the HTML from `email-templates/sunday/` → send. Do this manually each
  Sunday. Regenerate templates with `node scripts/generate-sunday-emails.mjs`.

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
BEEHIIV_API_KEY=                          # set — syncs subscribers to Beehiiv list
BEEHIIV_PUBLICATION_ID=                   # set — syncs subscribers to Beehiiv list
RESEND_API_KEY=                           # set — sends welcome email on signup
```

## Blog posts

| Slug | Category | Date | Image |
|---|---|---|---|
| `the-polynesian-diet-why-pacific-islanders-live-longer` | Nutrition | 2026-05-01 | `postPolynesianDiet` |
| `breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years` | Ingredients | 2026-05-08 | `postBreadfruit` |
| `what-is-poi-a-complete-guide-to-hawaiis-original-superfood` | Ingredients | 2026-05-15 | `postPoi` |
| `what-is-taro-the-root-vegetable-of-polynesia` | Ingredients | 2026-05-22 | `postTaro` |
| `poke-bowl-history-and-how-to-make-it-at-home` | Recipes | 2026-05-29 | `postPoke` |
| `what-is-haupia-hawaiian-coconut-pudding` | Recipes | 2026-06-05 | `postHaupia` |
| `coconut-milk-coconut-oil-coconut-aminos-guide` | Ingredients | 2026-06-12 | `postCoconut` |
| `limu-the-seaweed-that-seasoned-the-pacific` | Ingredients | 2026-06-10 | `postLimu` |
| `uala-the-pacific-sweet-potato` | Ingredients | 2026-06-17 | `postUala` |
| `inamona-the-hawaiian-kukui-nut-relish` | Ingredients | 2026-06-18 | `postInamona` |
| `kapisi-pulu-tongan-cabbage-and-corned-beef` | Recipes | 2026-06-18 | `postKapisiPulu` |
| `lomi-salmon-hawaiian-cured-salmon-and-tomato` | Recipes | 2026-06-19 | `postLomiSalmon` |
| `whole-fish-in-banana-leaf-the-pacific-way` | Recipes | 2026-06-20 | `postFishBananaLeaf` |
| `shoyu-chicken-the-hawaiian-plate-lunch-classic` | Recipes | 2026-06-21 | `postShoyuChicken` |
| `hawaiian-shave-ice-and-mochi-pacific-desserts` | Recipes | 2026-06-21 | `postShaveIce` |

The four 2026-06-19→21 recipe posts use **Adobe Stock** photos. The
originals were uploaded to the deploy branch via the GitHub web UI at full
resolution (3–10 MB each, with spaces/typos in the filenames). They were
resized to 1600px wide / mozjpeg q80 (~90–240 KB), renamed to clean slugs,
and the oversized originals were removed from the deploy branch. **Always
compress + rename before wiring a photo** — never ship a multi-MB original,
it burns the resource allowance. (Recipe content is grounded in the matching
`email-templates/sunday/` templates: 2-3, 2-5, 5-1, 6-3/6-4.)

All blog images use the shared `POST_PHOTO` map in `lib/photos.ts` —
`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/page.tsx` (homepage
"From the journal" cards) all import from there. Do **not** define a local
POST_PHOTO map in any page file — the homepage had a stale copy that stopped at
`postCoconut`, so all three homepage cards showed the same photo (fixed
2026-06-21).

## Launch checklist

1. **Verify test order in Supabase.** ✅ Done.
2. **Confirm Stripe payouts bank account.** ✅ Done (Stripe Identity verified 2026-05-22).
3. **Flip noindex → live.** ✅ Done 2026-05-23.
4. **Re-enable Hostinger CDN** (was turned off during build to avoid stale
   cache). Go to Hostinger → your site → CDN → enable. Purge cache after
   first post-launch deploy.
5. **Wire book cover into the shop page.** ✅ Done.
6. **Ebook v1.1 with recipe photos.** ✅ Done.
7. **Blog content.** ✅ Done (15 posts live).
8. **Beehiiv newsletter integration.** ✅ Done 2026-05-23.
9. **Welcome email via Resend.** ✅ Done 2026-06-20.

## Deployment

Push to `claude/pacificnutra-business-ideas-V3L9L` → Hostinger auto-deploys.
No PRs unless explicitly requested.

## Open to-dos

- **Koele palau section in ʻUala post** — add a short recipe/explainer section to
  `content/posts/uala-the-pacific-sweet-potato.mdx` targeting the "koele palau"
  query (Hawaiian sweet potato + coconut pudding). No new image needed — it
  bolts onto the existing ʻUala post. Pending: user to find a suitable image or
  confirm they want the text-only addition.

- **Start sending Sunday newsletters** — 29 HTML templates sit in
  `email-templates/sunday/` ready to go. Log into Beehiiv, create a new post,
  paste the HTML, and send. Nothing automated — it's a weekly manual step.
  Start with `1-1-roasted-breadfruit-wedges-with-alaea-salt.html`.
