-- Pacific Nutra — initial schema

create extension if not exists "uuid-ossp";

create table if not exists public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  product_slug text not null,
  stripe_session_id text not null unique,
  status text not null default 'pending',
  amount_cents integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_product_slug_idx on public.orders (product_slug);

-- RLS: lock everything down by default. The service-role key (used server-side
-- only) bypasses RLS, which is how the webhook and library page read/write.
alter table public.subscribers enable row level security;
alter table public.orders enable row level security;

-- Authenticated users can read their own orders (handy if we ever query from
-- the browser; the library page uses the service client today).
drop policy if exists "own orders readable" on public.orders;
create policy "own orders readable" on public.orders
  for select
  using (auth.jwt() ->> 'email' = email);

-- Storage bucket for ebook PDFs. Bucket is private; we hand out signed URLs.
insert into storage.buckets (id, name, public)
values ('ebooks', 'ebooks', false)
on conflict (id) do nothing;
