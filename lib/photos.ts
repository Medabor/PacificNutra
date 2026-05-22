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
    width: 7168,
    height: 2304,
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
    src: "/images/polynesian-diet.jpeg",
    alt: "A spread of traditional Polynesian foods — fresh fish, taro, breadfruit, sweet potato, coconut, and tropical fruit",
    width: 8192,
    height: 8192,
  },
  postBreadfruit: {
    kind: "image",
    src: "/images/breadfruit.jpeg",
    alt: "A whole breadfruit on a wooden cutting board, sliced open to show the starchy white flesh",
    width: 5632,
    height: 3072,
  },
  postPoi: {
    kind: "image",
    src: "/images/hawaiian-poi.jpeg",
    alt: "A bowl of traditional Hawaiian poi — smooth, lavender-grey fermented taro paste",
    width: 2400,
    height: 2063,
  },
  postTaro: {
    kind: "image",
    src: "/images/taro-mash.jpeg",
    alt: "Mashed taro served in a bowl, garnished and ready to eat",
    width: 5120,
    height: 3584,
  },
  postPoke: {
    kind: "image",
    src: "/images/poke.jpeg",
    alt: "A Hawaiian poke bowl — cubed raw ʻahi tuna over rice with sesame, green onion, and furikake",
    width: 5120,
    height: 3584,
  },
  postHaupia: {
    kind: "image",
    src: "/images/haupia.jpeg",
    alt: "Squares of haupia — traditional Hawaiian coconut pudding — served on a plate",
    width: 4096,
    height: 2304,
  },
  postCoconut: {
    kind: "image",
    src: "/images/coconut.jpeg",
    alt: "A halved fresh coconut showing the white flesh and clear water inside",
    width: 5632,
    height: 3072,
  },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof slots;

export function getPhoto(key: PhotoSlotKey): PhotoSlot {
  return slots[key];
}
