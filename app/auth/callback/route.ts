import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Behind Hostinger's reverse proxy the request origin resolves to an
// internal localhost, so prefer the public site URL for redirects.
function siteBase(fallbackOrigin: string): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackOrigin;
}

// Only allow same-site relative redirect targets — never an absolute URL —
// so a crafted `next` param can't turn this into an open redirect.
function safeNext(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/library";
}

// Magic-link / OAuth landing route. Supabase sends the recipient here with a
// `?code=` (PKCE) — we exchange it for a session, set the auth cookies, and
// forward them on to their destination. Without this step the code is never
// redeemed and the sign-in page just re-renders (the bug this fixes).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const base = siteBase(origin);
  const next = safeNext(searchParams.get("next"));

  const supabase = await createSupabaseServerClient();

  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${base}${next}`);
    console.error("[auth-callback] exchangeCodeForSession failed:", error.message);
    return NextResponse.redirect(`${base}/library?error=link`);
  }

  // Fallback for token_hash-style links (older Supabase email templates).
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(`${base}${next}`);
    console.error("[auth-callback] verifyOtp failed:", error.message);
  }

  return NextResponse.redirect(`${base}/library?error=link`);
}
