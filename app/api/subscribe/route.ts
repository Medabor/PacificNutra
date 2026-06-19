import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { addToBeehiiv } from "@/lib/beehiiv";
import { sendWelcomeEmail } from "@/lib/resend";

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

  // Check before upsert so we know whether to send the welcome email.
  const { data: existing } = await supabase
    .from("subscribers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const { error } = await supabase
    .from("subscribers")
    .upsert({ email, source }, { onConflict: "email" });

  if (error) {
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }

  const isNew = !existing;

  // Sync to Beehiiv — best-effort, never blocks the response.
  addToBeehiiv(email, source);

  // Send the welcome email via Resend for new subscribers only.
  if (isNew) {
    sendWelcomeEmail(email);
  }

  return NextResponse.json({ ok: true });
}
