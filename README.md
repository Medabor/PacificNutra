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

## Deployment

This site is built to self-host on **any Node.js host** — Hostinger VPS,
Hostinger shared hosting with Node.js Selector, DigitalOcean, Railway,
Render, etc. We avoid Vercel because its free tier prohibits commercial
use.

Production builds use `output: "standalone"` (see `next.config.mjs`),
which produces a self-contained server bundle in `.next/standalone/`
with only the runtime dependencies needed to start the app.

### Option A — Hostinger VPS (recommended)

The cheapest Hostinger VPS plan (KVM 1, ~$5/mo) is enough to run this
site comfortably. You get root SSH access, which makes everything easy.

```bash
# 1. SSH into the VPS
ssh root@your-vps-ip

# 2. Install Node 20+ and PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx
npm install -g pm2

# 3. Clone the repo and install deps
cd /var/www
git clone <your-repo-url> pacificnutra
cd pacificnutra
npm ci

# 4. Create .env.local with your production values
nano .env.local   # copy from .env.local.example, fill in real keys

# 5. Build and start
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup       # follow the printed instructions to enable on boot
```

Then put Nginx in front of it as a reverse proxy with SSL:

```nginx
# /etc/nginx/sites-available/pacificnutra
server {
  listen 80;
  server_name pacificnutra.com www.pacificnutra.com;

  # Stripe sends large webhook payloads; raise the limit a bit.
  client_max_body_size 2m;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

```bash
ln -s /etc/nginx/sites-available/pacificnutra /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Get free SSL via Let's Encrypt
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d pacificnutra.com -d www.pacificnutra.com
```

To deploy updates: `git pull && npm ci && npm run build && pm2 reload pacificnutra`.

### Option B — Hostinger shared hosting with Node.js Selector

If you only have shared hosting (Premium/Business), Hostinger's hPanel
exposes a **Node.js** section that runs an app per domain:

1. In hPanel → **Advanced → Node.js**, create a new app:
   - **Node.js version:** 20.x
   - **Application root:** `domains/pacificnutra.com/public_html`
   - **Application URL:** `pacificnutra.com`
   - **Application startup file:** `node_modules/next/dist/bin/next start`
2. Upload the repo via Git (hPanel → Git) or SFTP.
3. In the Node.js panel, click **Run NPM Install**, then add a custom
   command: `npm run build`.
4. Add all env vars in the Node.js panel under **Environment variables**.
5. Restart the app.

Caveats on shared hosting:
- Middleware works, but background jobs / long-running tasks do not.
- You can&apos;t install system packages, so don&apos;t add deps that need
  native compilation beyond what npm provides.
- If you outgrow it, the VPS path above is a clean migration.

### Stripe webhook (do this once, after the site is live)

1. In Stripe Dashboard → **Developers → Webhooks → Add endpoint**:
   - **Endpoint URL:** `https://pacificnutra.com/api/stripe-webhook`
   - **Events:** `checkout.session.completed`
2. Copy the **Signing secret** (`whsec_...`) into your production
   `.env.local` as `STRIPE_WEBHOOK_SECRET`, then restart the app
   (`pm2 reload pacificnutra` on VPS).

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
