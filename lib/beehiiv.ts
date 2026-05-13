type BeehiivResult = { ok: true } | { ok: false; error: string };

export async function addToBeehiiv(email: string, source: string): Promise<BeehiivResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    // Soft-fail: in development without Beehiiv configured we still store in
    // Supabase. The webhook can sync subscribers later.
    return { ok: false, error: "beehiiv-not-configured" };
  }
  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: source,
        }),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `beehiiv ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
