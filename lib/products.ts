export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  priceCents: number;
  bullets: string[];
  filePath: string;
  stripePriceEnv: string;
};

const products: Product[] = [
  {
    slug: "the-pacific-plate",
    title: "The Pacific Plate",
    tagline:
      "30 traditional Polynesian recipes, rebuilt for the modern kitchen.",
    description: `A 90-page cookbook that takes you through thirty foundational Polynesian recipes — taro mash, breadfruit fries, poke bowls, shoyu chicken, lomi salmon, haupia, and more — each with a brief history, the cultural context, and a modern variation that works in any kitchen. Includes a printable shopping list and ingredient sourcing guide.`,
    priceCents: 2400,
    bullets: [
      "30 recipes, 90 pages, beautifully designed PDF",
      "Modern kitchen substitutions for hard-to-find ingredients",
      "Sourcing guide for taro, breadfruit, ulu, and pantry staples",
      "Lifetime updates — every new edition included free",
    ],
    filePath: "ebooks/the-pacific-plate-v1.pdf",
    stripePriceEnv: "STRIPE_PRICE_THE_PACIFIC_PLATE",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
