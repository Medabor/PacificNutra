import Image from "next/image";
import BrandPanel from "@/components/BrandPanel";
import { getPhoto, type PhotoSlotKey } from "@/lib/photos";

type Props = {
  slot: PhotoSlotKey;
  ratio?: "16/9" | "3/4" | "4/3" | "1/1" | "21/9" | "2/3";
  className?: string;
  rounded?: boolean;
  priority?: boolean;
  fit?: "cover" | "contain";
  /**
   * When true, the photo fills its closest positioned ancestor (caller
   * provides `position: relative | absolute`). Aspect ratio is ignored.
   * Use this for full-bleed hero sections.
   */
  fill?: boolean;
};

export default function Photo({
  slot,
  ratio = "16/9",
  className,
  rounded = true,
  priority,
  fit = "cover",
  fill,
}: Props) {
  const photo = getPhoto(slot);

  if (fill) {
    if (photo.kind === "panel") {
      return (
        <div className={className} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <BrandPanel variant={photo.variant} ratio={ratio} rounded={false} />
        </div>
      );
    }
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority={priority}
        className={className}
      />
    );
  }

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
        background: fit === "contain" ? "var(--color-kalo-950, #0e1a11)" : undefined,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        style={{ objectFit: fit }}
        priority={priority}
      />
    </div>
  );
}
