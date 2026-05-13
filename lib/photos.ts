// Photo registry. Single source of truth for what visual asset goes
// where on the site. Today each slot resolves to a `BrandPanel` variant
// (a hand-built SVG art panel). Once you have real photography — your
// own shots or curated Unsplash photos — change the entries below from
// `{ kind: "panel", variant: "..." }` to
// `{ kind: "image", src: "/images/<file>.jpg", alt: "..." }`.
//
// Suggested Unsplash photos to shop for are listed in
// `public/images/CREDITS.md`.

import type { ComponentProps } from "react";
import BrandPanel from "@/components/BrandPanel";

type PanelVariant = ComponentProps<typeof BrandPanel>["variant"];

export type PhotoSlot =
  | { kind: "panel"; variant: PanelVariant }
  | { kind: "image"; src: string; alt: string; width: number; height: number };

const slots = {
  homeHero: { kind: "panel", variant: "ocean" },
  aboutHero: { kind: "panel", variant: "sunset" },
  productPacificPlate: { kind: "panel", variant: "taro" },
  postPolynesianDiet: { kind: "panel", variant: "sunset" },
  postBreadfruit: { kind: "panel", variant: "leaf" },
  postPoi: { kind: "panel", variant: "poi" },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof slots;

export function getPhoto(key: PhotoSlotKey): PhotoSlot {
  return slots[key];
}
