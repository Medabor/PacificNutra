import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, whSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.product_slug;
    const email = session.customer_details?.email ?? session.customer_email;
    const product = slug ? getProductBySlug(slug) : undefined;

    if (email && product) {
      const supabase = createSupabaseServiceClient();
      await supabase.from("orders").upsert(
        {
          email,
          product_slug: product.slug,
          stripe_session_id: session.id,
          status: "paid",
          amount_cents: session.amount_total ?? product.priceCents,
        },
        { onConflict: "stripe_session_id" },
      );
      // Also store the customer as a subscriber.
      await supabase
        .from("subscribers")
        .upsert({ email, source: "purchase" }, { onConflict: "email" });
    }
  }

  return NextResponse.json({ received: true });
}
