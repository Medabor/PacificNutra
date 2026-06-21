import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Behind Hostinger's reverse proxy the request origin resolves to an
// internal localhost, so prefer the public site URL for redirects.
function siteBase(fallbackOrigin: string): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackOrigin;
}

// Only allow same-site relative redirect targets to prevent open-redirect.
function safeNext(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/library";
}

// Build a Supabase server client whose setAll writes directly onto the
// given NextResponse, so the session cookies travel with the redirect.
function makeClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet: CookieToSet[]) => {
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
}

// Magic-link / OAuth landing route.  Supabase sends the recipient here after
// verifying the OTP — either as a PKCE ?code= or an older ?token_hash=.
// We redeem it, write the session cookies onto the redirect response, and
// forward to the requested destination.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const base = siteBase(origin);
  const next = safeNext(searchParams.get("next"));

  // PKCE flow (default for @supabase/ssr).
  const code = searchParams.get("code");
  if (code) {
    const redirect = NextResponse.redirect(`${base}${next}`);
    const supabase = makeClient(request, redirect);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect;
    console.error("[auth-callback] exchangeCodeForSession failed:", error.message);
    return NextResponse.redirect(`${base}/library?error=link`);
  }

  // Fallback for token_hash-style links (older Supabase email templates).
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (tokenHash && type) {
    const redirect = NextResponse.redirect(`${base}${next}`);
    const supabase = makeClient(request, redirect);
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return redirect;
    console.error("[auth-callback] verifyOtp failed:", error.message);
  }

  return NextResponse.redirect(`${base}/library?error=link`);
}
