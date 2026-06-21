import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { removeFromBeehiiv } from "@/lib/beehiiv";
import { verifyEmailToken, normalizeEmail } from "@/lib/unsubscribe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://pacificnutra.com";

function parse(req: Request): { email: string; token: string } {
  const url = new URL(req.url);
  return {
    email: normalizeEmail(url.searchParams.get("e") || ""),
    token: url.searchParams.get("t") || "",
  };
}

async function unsubscribe(email: string): Promise<void> {
  const supabase = createSupabaseServiceClient();
  await supabase.from("subscribers").delete().eq("email", email);
  // Best-effort: also drop them from Beehiiv so future newsletters stop.
  await removeFromBeehiiv(email).catch(() => {});
}

// One-click unsubscribe (RFC 8058). Gmail/Yahoo POST here automatically when
// the recipient taps the native "unsubscribe" button.
export async function POST(req: Request) {
  const { email, token } = parse(req);
  if (!verifyEmailToken(email, token)) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }
  try {
    await unsubscribe(email);
  } catch (e) {
    // Never fail a one-click unsubscribe — log and report success anyway.
    console.error("[unsubscribe] POST failed:", e);
  }
  return new NextResponse("You have been unsubscribed.", { status: 200 });
}

// Recipient clicks the unsubscribe link in the email body.
export async function GET(req: Request) {
  const { email, token } = parse(req);
  if (!verifyEmailToken(email, token)) {
    return NextResponse.redirect(`${SITE}/unsubscribe?status=invalid`, 303);
  }
  try {
    await unsubscribe(email);
  } catch (e) {
    console.error("[unsubscribe] GET failed:", e);
  }
  return NextResponse.redirect(`${SITE}/unsubscribe?status=done`, 303);
}
