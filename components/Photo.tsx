// Renders whatever the photo registry returns for a given slot — either
// a SVG art panel (default) or a real <Image> (once you swap entries in
// lib/photos.ts).

import Image from "next/image";
import BrandPanel from "@/components/BrandPanel";
import { getPhoto, type PhotoSlotKey } from "@/lib/photos";

type Props = {
  slot: PhotoSlotKey;
  ratio?: "16/9" | "3/4" | "4/3" | "1/1" | "21/9";
  className?: string;
  rounded?: boolean;
  priority?: boolean;
};

export default function Photo({ slot, ratio = "16/9", className, rounded = true, priority }: Props) {
  const photo = getPhoto(slot);
  if (photo.kind === "panel") {
    return (
      <BrandPanel
        variant={photo.variant}
        ratio={ratio}
        rounded={rounded}
        className={className}
      />
    );
  }
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio.replace("/", " / "),
        overflow: "hidden",
        borderRadius: rounded ? "1rem" : undefined,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        style={{ objectFit: "cover" }}
        priority={priority}
      />
    </div>
  );
}
