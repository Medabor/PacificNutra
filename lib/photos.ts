// Photo registry. Single source of truth for what visual asset goes
// where on the site. Each slot resolves to either a `BrandPanel` SVG
// art variant or a real `<Image>` referenced by path.
//
// To swap an entry, change `kind: "panel"` to `kind: "image"` (or the
// reverse) and edit the `src` / `variant`.

import type { ComponentProps } from "react";
import BrandPanel from "@/components/BrandPanel";

type PanelVariant = ComponentProps<typeof BrandPanel>["variant"];

export type PhotoSlot =
  | { kind: "panel"; variant: PanelVariant }
  | { kind: "image"; src: string; alt: string; width: number; height: number };

const slots = {
  homeHero: {
    kind: "image",
    src: "/images/hero-section.jpeg",
    alt: "A Pacific table set with traditional Polynesian dishes — fresh fish, taro, coconut, and tropical fruit",
    width: 1600,
    height: 514,
  },
  aboutHero: {
    kind: "image",
    src: "/images/about-page.jpeg",
    alt: "A Pacific kitchen scene — fresh tropical ingredients and traditional dishes laid out on a wooden table",
    width: 1600,
    height: 457,
  },
  productPacificPlate: {
    kind: "image",
    src: "/images/pacific-plate-cover.png",
    alt: "The Pacific Plate cookbook cover — 30 traditional Polynesian recipes for the modern kitchen",
    width: 512,
    height: 800,
  },
  postPolynesianDiet: {
    kind: "image",
    src: "/images/polynesian-diet.jpeg",
    alt: "A spread of traditional Polynesian foods — fresh fish, taro, breadfruit, sweet potato, coconut, and tropical fruit",
    width: 1600,
    height: 1600,
  },
  postBreadfruit: {
    kind: "image",
    src: "/images/breadfruit.jpeg",
    alt: "A whole breadfruit on a wooden cutting board, sliced open to show the starchy white flesh",
    width: 1600,
    height: 873,
  },
  postPoi: {
    kind: "image",
    src: "/images/hawaiian-poi.jpeg",
    alt: "A bowl of traditional Hawaiian poi — smooth, lavender-grey fermented taro paste",
    width: 1600,
    height: 1375,
  },
  postTaro: {
    kind: "image",
    src: "/images/taro-mash.jpeg",
    alt: "Mashed taro served in a bowl, garnished and ready to eat",
    width: 1600,
    height: 1120,
  },
  postPoke: {
    kind: "image",
    src: "/images/poke.jpeg",
    alt: "A Hawaiian poke bowl — cubed raw ʻahi tuna over rice with sesame, green onion, and furikake",
    width: 1600,
    height: 1120,
  },
  postHaupia: {
    kind: "image",
    src: "/images/haupia.jpeg",
    alt: "Squares of haupia — traditional Hawaiian coconut pudding — served on a plate",
    width: 1600,
    height: 900,
  },
  postCoconut: {
    kind: "image",
    src: "/images/coconut.jpeg",
    alt: "A halved fresh coconut showing the white flesh and clear water inside",
    width: 1600,
    height: 873,
  },
  postLimu: {
    kind: "image",
    src: "/images/limu-seaweed-salad.jpg",
    alt: "A bowl of fresh limu seaweed salad — bright green ogo strands dressed with sesame seeds and chopsticks resting alongside",
    width: 1200,
    height: 800,
  },
  postUala: {
    kind: "image",
    src: "/images/uala-purple-sweet-potato.jpg",
    alt: "Whole and halved ʻuala Hawaiian purple sweet potatoes on a dark slate surface, showing their vivid violet interior",
    width: 1200,
    height: 800,
  },
  productMealPlan: {
    kind: "image",
    src: "/images/30-day-meal-plan-cover.png",
    alt: "30-Day Pacific Meal Plan cover — a four-week eating schedule built from traditional Polynesian recipes",
    width: 1024,
    height: 1536,
  },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof slots;

export function getPhoto(key: PhotoSlotKey): PhotoSlot {
  return slots[key];
}

// Single source of truth mapping blog post slugs to their hero photo slot.
// Used by both the blog index and the post detail page. Posts without an
// entry fall back to `postPolynesianDiet`.
export const POST_PHOTO: Record<string, PhotoSlotKey> = {
  "the-polynesian-diet-why-pacific-islanders-live-longer": "postPolynesianDiet",
  "breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years": "postBreadfruit",
  "what-is-poi-a-complete-guide-to-hawaiis-original-superfood": "postPoi",
  "what-is-taro-the-root-vegetable-of-polynesia": "postTaro",
  "poke-bowl-history-and-how-to-make-it-at-home": "postPoke",
  "what-is-haupia-hawaiian-coconut-pudding": "postHaupia",
  "coconut-milk-coconut-oil-coconut-aminos-guide": "postCoconut",
  "limu-the-seaweed-that-seasoned-the-pacific": "postLimu",
  "uala-the-pacific-sweet-potato": "postUala",
};
