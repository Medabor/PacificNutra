import fs from "fs";
import path from "path";
import { Resend } from "resend";
import { unsubscribeUrl } from "@/lib/unsubscribe";

type ResendResult = { ok: true } | { ok: false; error: string };

// Plain-text alternative for the welcome email. Mail clients that prefer
// text (and spam filters) expect a real text/plain part alongside the HTML;
// shipping HTML-only is a common reason new senders land in spam.
function welcomeText(unsubUrl: string): string {
  return `PACIFIC NUTRA
Welcome — and here's your first recipe

Thanks for joining. Pacific Nutra is about bringing Polynesian food
traditions into the modern kitchen — real ingredients, real flavor, and
dishes that have fed islands for three thousand years.

If this landed in Promotions, drag it to Primary — that tells Gmail
these are letters worth keeping.

Let's get straight to it.

------------------------------------------------------------
RECIPE 1 - SECTION 1
Sweet potato & ginger soup

Two pounds of sweet potato, a generous knob of ginger, a can of coconut
milk. On the table in 30 minutes.

Serves 4-6  -  Time 30 min

INGREDIENTS
- 2 lbs Japanese or orange sweet potatoes, peeled, 1-inch chunks
- 1 medium yellow onion, roughly chopped
- 4 cloves garlic, smashed
- 1 thumb-sized piece fresh ginger, peeled and sliced
- 1 can (14 oz) full-fat coconut milk
- 4 cups chicken or vegetable stock
- 2 tbsp coconut oil
- 1 tsp kosher salt, 1/2 tsp black pepper
- Optional: red pepper flakes, lime wedges, toasted coconut flakes

METHOD
1. Warm coconut oil in a heavy pot over medium heat. Add onion and a pinch
   of salt; cook 4-5 min until softened.
2. Add garlic and ginger; cook 1 min more, stirring, until fragrant.
3. Add sweet potato and stock. Bring to a boil, reduce to a steady simmer,
   cover, and cook 15-18 min until completely tender.
4. Off the heat, stir in the coconut milk, salt, pepper, and pepper flakes
   if using.
5. Blend smooth with an immersion blender (or in batches with a regular
   blender - lid vented, start slow).
6. Taste, adjust salt. Serve with a lime wedge and a sprinkle of toasted
   coconut.
------------------------------------------------------------

WHAT TO EXPECT NEXT
One short letter on Sunday with a recipe, an ingredient note, or a story
from the Pacific kitchen. No spam, no fluff.

Read the free sample of The Pacific Plate (the intro and the full first
section - five recipes, free in your browser):
https://pacificnutra.com/sample

If you like what you cook, the full 30-recipe ebook is $24 - yours forever
with free updates:
https://pacificnutra.com/shop/the-pacific-plate

Mahalo for being here,
- Simo

P.S. Hit reply and say hi - I read every email.

------------------------------------------------------------
Pacific Nutra - https://pacificnutra.com
You're receiving this because you signed up at pacificnutra.com.
Unsubscribe: ${unsubUrl}
`;
}

export async function sendWelcomeEmail(email: string): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[welcome-email] RESEND_API_KEY is not set");
    return { ok: false, error: "resend-not-configured" };
  }

  const resend = new Resend(apiKey);

  let html: string;
  try {
    html = fs.readFileSync(
      path.join(process.cwd(), "email-templates/welcome.html"),
      "utf8",
    );
  } catch {
    console.error("[welcome-email] email-templates/welcome.html not found");
    return { ok: false, error: "welcome-template-not-found" };
  }

  const unsubUrl = unsubscribeUrl(email);
  html = html.replaceAll("{{UNSUBSCRIBE_URL}}", unsubUrl);

  try {
    const { error } = await resend.emails.send({
      from: "Simo from Pacific Nutra <hello@pacificnutra.com>",
      to: email,
      subject: "Welcome — here's your first Pacific recipe",
      html,
      text: welcomeText(unsubUrl),
    });
    if (error) {
      console.error(`[welcome-email] Resend rejected send to ${email}:`, error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error(`[welcome-email] send to ${email} threw:`, msg);
    return { ok: false, error: msg };
  }
}
