import fs from "fs";
import path from "path";
import { Resend } from "resend";

type ResendResult = { ok: true } | { ok: false; error: string };

export async function sendWelcomeEmail(email: string): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "resend-not-configured" };

  const resend = new Resend(apiKey);

  let html: string;
  try {
    html = fs.readFileSync(
      path.join(process.cwd(), "email-templates/welcome.html"),
      "utf8",
    );
  } catch {
    return { ok: false, error: "welcome-template-not-found" };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Simo from Pacific Nutra <hello@pacificnutra.com>",
      to: email,
      subject: "Welcome — here's your first Pacific recipe",
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
