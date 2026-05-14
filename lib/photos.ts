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
    src: "/images/polynesian-img1.jpg",
    alt: "Overhead Polynesian table spread on a woven raffia tablecloth — cast-iron skillet with seasoned greens and protein, rice noodles, slaw, and dipping sauce",
    width: 5519,
    height: 4139,
  },
  aboutHero: {
    kind: "image",
    src: "/images/Polynian-img4.jpg",
    alt: "A carved pineapple table centerpiece with pandanus leaves, surrounded by plates of food in soft warm light",
    width: 6000,
    height: 4000,
  },
  productPacificPlate: {
    kind: "image",
    src: "/images/polyneian-img2.jpg",
    alt: "A traditional Polynesian-style plate with rice, mixed vegetables, glazed protein, and noodles served on woven raffia",
    width: 5863,
    height: 3909,
  },
  postPolynesianDiet: {
    kind: "image",
    src: "/images/Polynesian-img5.jpg",
    alt: "Pineapple shrimp fried rice — yellow rice and prawn served inside a halved pineapple",
    width: 6000,
    height: 4000,
  },
  postBreadfruit: {
    kind: "image",
    src: "/images/Polynian-img3.jpg",
    alt: "Close-up of a wholesome bowl with wild rice, soft-boiled egg, mixed vegetables, and a side of broth",
    width: 2909,
    height: 2195,
  },
  // No real taro / poi photo on hand yet — the BrandPanel "poi" art is
  // thematically perfect (clay pottery rings) for this post.
  postPoi: { kind: "panel", variant: "poi" },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof slots;

export function getPhoto(key: PhotoSlotKey): PhotoSlot {
  return slots[key];
}
