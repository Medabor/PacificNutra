import crypto from "crypto";

// Signs unsubscribe links so a recipient can only unsubscribe their own
// address — the link carries the email plus an HMAC of it, and the route
// rejects any link whose signature doesn't match.
//
// We prefer a dedicated UNSUBSCRIBE_SECRET, but fall back to the
// service-role key (always set in production) so unsubscribe links work
// without anyone having to add a new environment variable.
function secret(): string {
  return (
    process.env.UNSUBSCRIBE_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.STRIPE_WEBHOOK_SECRET ||
    "pacific-nutra-unsubscribe"
  );
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function signEmail(email: string): string {
  return crypto
    .createHmac("sha256", secret())
    .update(normalizeEmail(email))
    .digest("base64url");
}

export function verifyEmailToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = Buffer.from(signEmail(email));
  const given = Buffer.from(token);
  if (expected.length !== given.length) return false;
  return crypto.timingSafeEqual(expected, given);
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pacificnutra.com"
  );
}

export function unsubscribeUrl(email: string): string {
  const e = encodeURIComponent(normalizeEmail(email));
  const t = encodeURIComponent(signEmail(email));
  return `${siteUrl()}/api/unsubscribe?e=${e}&t=${t}`;
}
