# Pacific Nutra

A Polynesian-nutrition content brand built on Next.js 15 + Supabase + Stripe.
The site hosts a blog (MDX), a shop for digital cookbooks, and a
customer-only library for downloading purchased PDFs.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS** for styling
- **Supabase** — Postgres for `subscribers` / `orders`, Auth (magic link) for
  customer sign-in, Storage for ebook PDFs
- **Stripe** — Stripe Checkout for one-time digital product purchases
- **Beehiiv** — newsletter platform; subscribers are mirrored from Supabase
- **MDX** — blog posts live as files in `content/posts/`

## Local development

```bash
npm install
cp .env.local.example .env.local
# Fill in Supabase + Stripe keys
npm run dev
```

Open http://localhost:3000.

## First-time setup checklist

1. **Create a Supabase project** at https://supabase.com.
2. Run the SQL in `supabase/migrations/0001_init.sql` in the Supabase SQL
   editor. This creates the `subscribers` / `orders` tables and the private
   `ebooks` storage bucket.
3. Copy your Supabase URL, anon key, and service-role key into `.env.local`.
4. **Create a Stripe account**, grab the test secret + publishable keys.
5. Upload your ebook PDF to the `ebooks` storage bucket — the file path must
   match `filePath` in `lib/products.ts` (default:
   `ebooks/the-pacific-plate-v1.pdf`).
6. **Beehiiv (optional but recommended):** create a publication, generate an
   API key, paste the API key + publication ID into `.env.local`. If unset,
   email capture still works — it just writes to Supabase only.
7. Run `npm run dev`.

### Stripe webhook for local development

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe-webhook
# Copy the whsec_... value into STRIPE_WEBHOOK_SECRET
```

### Deploy to Vercel

```bash
# After connecting the repo to Vercel:
# 1. Set all env vars in Vercel project settings
# 2. Point pacificnutra.com DNS to Vercel
# 3. In Stripe Dashboard, create a webhook endpoint pointing to
#    https://pacificnutra.com/api/stripe-webhook
# 4. Subscribe it to checkout.session.completed
# 5. Copy the production webhook secret into Vercel env vars
```

## Project structure

```
app/
  page.tsx                landing
  about/                  brand story
  blog/                   index + [slug] MDX renderer
  shop/                   index + [product] product detail
  library/                auth-gated downloads
  api/
    subscribe/            email → Supabase + Beehiiv
    checkout/             creates Stripe Checkout session
    stripe-webhook/       marks order paid on successful purchase
components/              shared UI
content/posts/           MDX blog posts (just drop new .mdx files here)
lib/
  products.ts            single source of truth for the product catalog
  posts.ts               MDX loader
  supabase/              SSR + service-role clients
  stripe.ts              Stripe SDK
  beehiiv.ts             newsletter sync
supabase/migrations/     SQL migrations
middleware.ts            refreshes Supabase auth cookies
```

## Adding a new blog post

Drop a new `.mdx` file in `content/posts/`. Required frontmatter:

```mdx
---
title: "Your title"
excerpt: "One-sentence summary."
category: "Ingredients"  # or "Longevity", "Recipes", etc.
date: "2026-05-13"
author: "Pacific Nutra"
---

Body in Markdown.
```

The post will appear on `/blog` automatically.

## Adding a new product

Add an entry to `products` in `lib/products.ts`, then:

1. Upload the PDF to the Supabase `ebooks` bucket using the matching
   `filePath`.
2. (Optional) Create a Stripe Product + Price, paste the price ID into
   `.env.local` using the env name you set in `stripePriceEnv`.

The new product appears at `/shop/<slug>` automatically.

## Verifying the end-to-end purchase flow

In test mode:

1. Visit `/shop/the-pacific-plate`, click **Buy now**.
2. Use Stripe test card `4242 4242 4242 4242` with any future date and any
   CVC.
3. After redirect to `/library`, sign in with the same email used at
   checkout — Supabase emails a magic link.
4. The cookbook should appear in your library with a working **Download PDF**
   button (signed URL, 10-minute expiry).
