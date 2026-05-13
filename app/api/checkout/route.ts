import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";

const Body = z.object({ slug: z.string().min(1) });

export async function POST(req: Request) {
  let slug: string;
  try {
    slug = Body.parse(await req.json()).slug;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 404 });
  }

  const priceId = process.env[product.stripePriceEnv];
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: product.priceCents,
              product_data: {
                name: product.title,
                description: product.tagline,
              },
            },
          },
        ],
    success_url: `${baseUrl}/library?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop/${product.slug}?canceled=1`,
    customer_creation: "always",
    metadata: { product_slug: product.slug },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
