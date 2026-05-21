// Photo registry. Single source of truth for what visual asset goes
// where on the site. Each slot resolves to either a `BrandPanel` SVG
// art variant or a real `<Image>` referenced by path.
//
// To swap an entry, change `kind: "panel"` to `kind: "image"` (or the
// reverse) and edit the `src` / `variant`.
//
// Unused photos (kept in public/images/ for future blog posts):
//   - Polynian-img3.jpg  (rice + egg bowl)
//   - Polynian-img4.jpg  (carved pineapple centerpiece)
//   - Polynesian-img5.jpg (pineapple shrimp fried rice)

import type { ComponentProps } from "react";
import BrandPanel from "@/components/BrandPanel";

type PanelVariant = ComponentProps<typeof BrandPanel>["variant"];

export type PhotoSlot =
  | { kind: "panel"; variant: PanelVariant }
  | { kind: "image"; src: string; alt: string; width: number; height: number };

const slots = {
  homeHero: {
    kind: "image",
    src: "/images/Polynesian-img9.jpg",
    alt: "Two Hawaiian nēnē geese stand in a taro field with the Kauai mountains rising in the background",
    width: 2000,
    height: 1335,
  },
  aboutHero: {
    kind: "image",
    src: "/images/Polynesian-img8.jpg",
    alt: "A sunflower field in front of the Koʻolau mountain range on Oahu",
    width: 2000,
    height: 1333,
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
    src: "/images/polynesian-img1.jpg",
    alt: "Overhead Polynesian table spread on a woven raffia tablecloth — cast-iron skillet with seasoned greens and protein, rice noodles, slaw, and dipping sauce",
    width: 5519,
    height: 4139,
  },
  postBreadfruit: {
    kind: "image",
    src: "/images/Polynesian-img7.jpg",
    alt: "Traditional Pacific seafood wrapped in banana leaf — squid and greens dressed in a herb sauce",
    width: 2000,
    height: 905,
  },
  postPoi: {
    kind: "image",
    src: "/images/Polynesian-img6.jpg",
    alt: "Balinese-style fruit and flower offerings on a woven raffia table, framed by large kalo (taro) leaves in a tropical garden",
    width: 1170,
    height: 2080,
  },
  postTaro: {
    kind: "image",
    src: "/images/Polynesian-img9.jpg",
    alt: "Two Hawaiian nēnē geese stand in a taro field with the Kauai mountains rising in the background",
    width: 2000,
    height: 1335,
  },
  postPoke: {
    kind: "image",
    src: "/images/Polynian-img3.jpg",
    alt: "Overhead view of a Pacific-style rice bowl with egg and fresh vegetables on a woven placemat",
    width: 2909,
    height: 2195,
  },
  postHaupia: {
    kind: "image",
    src: "/images/Polynesian-img5.jpg",
    alt: "Pineapple fried rice with vegetables and herbs served in a Pacific-style presentation",
    width: 6000,
    height: 4000,
  },
  postCoconut: {
    kind: "image",
    src: "/images/Polynesian-img7.jpg",
    alt: "Traditional Pacific seafood wrapped in banana leaf — squid and greens dressed in a herb sauce",
    width: 2000,
    height: 905,
  },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof slots;

export function getPhoto(key: PhotoSlotKey): PhotoSlot {
  return slots[key];
}
