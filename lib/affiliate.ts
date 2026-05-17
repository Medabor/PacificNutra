// Affiliate product registry. Curated, not exhaustive. Every product has
// to pass: (a) it makes sense in a Pacific kitchen, (b) it isn't a
// supplement, and (c) we'd buy it ourselves.
//
// `url` should include your Amazon Associates tag once approved. Until
// then, set `url` to the bare Amazon URL — the page will still render
// and link out, just without commission. The TODO marker below makes the
// missing tag easy to grep for.

export type AffiliateProduct = {
  slug: string;
  name: string;
  category: "Tools" | "Pantry" | "Books";
  blurb: string;
  why: string;
  /** Optional local path in /public/images/affiliate/. Falls back to a
   *  styled placeholder if missing. Once you have real product photos,
   *  set this to e.g. "/images/affiliate/cast-iron.jpg" and drop the
   *  file into public/images/affiliate/. */
  image?: string;
  url: string;
  priceHint?: string; // e.g. "~$30"
};

const products: AffiliateProduct[] = [
  {
    slug: "lodge-cast-iron-12",
    name: "Lodge 12\" cast iron skillet",
    category: "Tools",
    blurb:
      "A single heavy pan that handles every cooking method in the Pacific Plate: searing fish, roasting breadfruit wedges, braising shoyu chicken.",
    why:
      "The skillet you see on our home page hero is this one. We've used it for four years and it's still the most-used pan in the kitchen.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/dp/B0000CF66W?tag=TODO-affiliate-tag",
    priceHint: "~$35",
  },
  {
    slug: "bamboo-steamer",
    name: "Two-tier bamboo steamer (10\")",
    category: "Tools",
    blurb:
      "For taro, sweet potato, fish parcels wrapped in banana leaf, lau lau, and steamed buns. Stacks two tiers so a whole meal cooks at once.",
    why:
      "Pacific cooking leans hard on steaming over boiling — better texture, no leaching of minerals into water. A bamboo steamer beats a metal one by a mile.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/s?k=bamboo+steamer+10+inch&tag=TODO-affiliate-tag",
    priceHint: "~$20",
  },
  {
    slug: "alaea-hawaiian-sea-salt",
    name: "ʻAlaea Hawaiian sea salt",
    category: "Pantry",
    blurb:
      "Volcanic red clay sea salt, the traditional Hawaiian finishing salt. Mineral-rich, mellower than refined salt, beautiful color on a plate.",
    why:
      "We use it as the finishing salt on roasted breadfruit, poke, and lomi salmon. Any of our roots/tubers recipes call for it specifically.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/s?k=alaea+hawaiian+sea+salt&tag=TODO-affiliate-tag",
    priceHint: "~$12",
  },
  {
    slug: "coconut-aminos",
    name: "Coconut Secret coconut aminos",
    category: "Pantry",
    blurb:
      "A soy-free, lower-sodium substitute for soy sauce that's actually traditional to Pacific cooking. Slightly sweet, deeply savory.",
    why:
      "Pacific cuisine pre-contact had no soy. Coconut aminos give the same umami without the soy-sauce overcorrection that most modern poke shops lean on.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/s?k=coconut+secret+coconut+aminos&tag=TODO-affiliate-tag",
    priceHint: "~$10",
  },
  {
    slug: "furikake",
    name: "Nori komi furikake",
    category: "Pantry",
    blurb:
      "Roasted seaweed + sesame + a few salts. Sprinkled on rice, poke, fish, eggs, anything. Borrowed from Japan, adopted by Hawaii a century ago.",
    why:
      "If you're going to make poke bowls at home, furikake is the difference between fine and very good. The Eden brand is the cleanest version on Amazon.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/s?k=eden+furikake&tag=TODO-affiliate-tag",
    priceHint: "~$8",
  },
  {
    slug: "hawaii-cooks-cookbook",
    name: "Hawaiʻi Cooks · Roy Yamaguchi",
    category: "Books",
    blurb:
      "Roy Yamaguchi is one of the chefs who put modern Pacific Rim cuisine on the map. The recipes are ambitious but the technique notes alone are worth the cover price.",
    why:
      "A good companion to our Pacific Plate cookbook — Roy's book leans restaurant-style and chef-y; ours leans home-kitchen and ancestral. Together they cover the spectrum.",
    // image: "/images/affiliate/...jpg",  // add real photo here
    url: "https://www.amazon.com/s?k=hawaii+cooks+roy+yamaguchi&tag=TODO-affiliate-tag",
    priceHint: "~$28",
  },
];

export function getAllAffiliates(): AffiliateProduct[] {
  return products;
}

export function getAffiliatesByCategory(): Record<string, AffiliateProduct[]> {
  return products.reduce<Record<string, AffiliateProduct[]>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});
}
