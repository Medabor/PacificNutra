import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { addToBeehiiv } from "@/lib/beehiiv";

const Body = z.object({
  email: z.string().email(),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const { email, source = "unknown" } = parsed;

  const supabase = createSupabaseServiceClient();
  const { error } = await supabase
    .from("subscribers")
    .upsert({ email, source }, { onConflict: "email" });

  if (error) {
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }

  // Best-effort sync to Beehiiv. We don't fail the request if this errors —
  // the row already lives in Supabase and we can re-sync later.
  await addToBeehiiv(email, source);

  return NextResponse.json({ ok: true });
}
