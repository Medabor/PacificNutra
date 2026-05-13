// On-brand SVG art panels. Used wherever a hero / cover image would go.
// These are intentionally NOT stock photography — they're a graphic
// identity asset. Once we have real product photography we can swap them
// out via `lib/photos.ts` (returns a URL → renders `<img>`; returns a
// variant string → renders one of the panels below).

import { CSSProperties } from "react";

type Variant = "ocean" | "leaf" | "weave" | "sunset" | "taro" | "poi";

type Props = {
  variant: Variant;
  className?: string;
  rounded?: boolean;
  ratio?: "16/9" | "3/4" | "4/3" | "1/1" | "21/9";
};

export default function BrandPanel({
  variant,
  className = "",
  rounded = true,
  ratio = "16/9",
}: Props) {
  const ratioMap: Record<NonNullable<Props["ratio"]>, string> = {
    "16/9": "56.25%",
    "3/4": "133.33%",
    "4/3": "75%",
    "1/1": "100%",
    "21/9": "42.85%",
  };
  const wrapperStyle: CSSProperties = {
    paddingBottom: ratioMap[ratio],
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: rounded ? "1rem" : undefined,
  };
  return (
    <div className={className} style={wrapperStyle} aria-hidden="true">
      <div style={{ position: "absolute", inset: 0 }}>
        {variant === "ocean" && <OceanPanel />}
        {variant === "leaf" && <LeafPanel />}
        {variant === "weave" && <WeavePanel />}
        {variant === "sunset" && <SunsetPanel />}
        {variant === "taro" && <TaroPanel />}
        {variant === "poi" && <PoiPanel />}
      </div>
    </div>
  );
}

const palette = {
  cream: "#FAF6EE",
  cream100: "#F1E9D8",
  cream200: "#E4D5B7",
  kalo: "#1F1A17",
  kalo800: "#3A2E25",
  clay: "#B8553A",
  clay300: "#E4A38C",
  clay700: "#7D3220",
  forest: "#2F4F3A",
  forest500: "#4A7359",
  oceanDeep: "#1C3942",
};

function OceanPanel() {
  // Layered horizon: deep ocean → warm cream sky, with a hand-drawn sun.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.cream} />
          <stop offset="0.55" stopColor={palette.cream100} />
          <stop offset="1" stopColor={palette.clay300} />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.forest500} />
          <stop offset="1" stopColor={palette.oceanDeep} />
        </linearGradient>
      </defs>
      <rect width="1600" height="540" fill="url(#sky)" />
      <circle cx="1080" cy="380" r="90" fill={palette.clay} opacity="0.85" />
      <rect y="540" width="1600" height="360" fill="url(#water)" />
      {/* Subtle horizon lines */}
      <g stroke={palette.cream} strokeOpacity="0.18" strokeWidth="2">
        <path d="M0 620 Q 800 605 1600 620" fill="none" />
        <path d="M0 700 Q 800 685 1600 700" fill="none" />
        <path d="M0 780 Q 800 770 1600 780" fill="none" />
      </g>
      {/* Tapa-cloth motif at bottom */}
      <Tapa y={830} color={palette.cream} opacity={0.18} />
    </svg>
  );
}

function LeafPanel() {
  // Large stylized taro leaves on cream.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="1600" height="900" fill={palette.cream100} />
      <g opacity="0.85">
        <BigLeaf x={200} y={700} scale={9} rotate={-25} fill={palette.forest} />
        <BigLeaf x={1100} y={250} scale={7} rotate={140} fill={palette.forest500} />
        <BigLeaf x={1400} y={780} scale={5} rotate={-60} fill={palette.forest} />
      </g>
      <Tapa y={20} color={palette.kalo} opacity={0.06} />
    </svg>
  );
}

function WeavePanel() {
  // Lauhala weave pattern over warm cream.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <pattern id="weave" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <rect width="80" height="80" fill={palette.cream100} />
          <rect x="0" y="0" width="40" height="40" fill={palette.cream200} opacity="0.7" />
          <rect x="40" y="40" width="40" height="40" fill={palette.cream200} opacity="0.7" />
          <path d="M0 40 L 80 40 M 40 0 L 40 80" stroke={palette.kalo} strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#weave)" />
      <rect width="1600" height="900" fill={palette.clay} opacity="0.05" />
    </svg>
  );
}

function SunsetPanel() {
  // Banded warm sunset with palm-frond silhouettes.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.clay700} />
          <stop offset="0.4" stopColor={palette.clay} />
          <stop offset="0.75" stopColor={palette.clay300} />
          <stop offset="1" stopColor={palette.cream100} />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sunset)" />
      <circle cx="800" cy="640" r="180" fill={palette.cream} opacity="0.55" />
      <circle cx="800" cy="640" r="120" fill={palette.cream} opacity="0.4" />
      {/* Horizon line */}
      <rect y="720" width="1600" height="180" fill={palette.kalo800} opacity="0.85" />
      <rect y="720" width="1600" height="4" fill={palette.kalo} opacity="0.4" />
      {/* Palm fronds */}
      <PalmFrond x={150} y={780} scale={1.2} flip={false} />
      <PalmFrond x={1450} y={780} scale={1.4} flip={true} />
    </svg>
  );
}

function TaroPanel() {
  // Deep taro purple-brown panel with a single centered leaf mark.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="taroBg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor={palette.kalo800} />
          <stop offset="1" stopColor={palette.kalo} />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#taroBg)" />
      <Tapa y={50} color={palette.clay} opacity={0.1} />
      <Tapa y={820} color={palette.clay} opacity={0.1} />
      <g transform="translate(800 450) scale(8) translate(-32 -36)" stroke={palette.cream} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
        <path d="M32 6 L32 14" />
        <path d="M32 14 C26 6, 14 7, 8 17 C2 30, 8 52, 32 66 C56 52, 62 30, 56 17 C50 7, 38 6, 32 14 Z" />
        <path d="M32 16 L32 62" />
        <path d="M32 28 C26 30, 22 32, 16 32" />
        <path d="M32 28 C38 30, 42 32, 48 32" />
        <path d="M32 42 C27 44, 24 46, 20 48" />
        <path d="M32 42 C37 44, 40 46, 44 48" />
      </g>
    </svg>
  );
}

function PoiPanel() {
  // Warm clay pottery panel with concentric bowl rings.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="poiBg" cx="0.5" cy="0.4" r="0.8">
          <stop offset="0" stopColor={palette.clay300} />
          <stop offset="0.6" stopColor={palette.clay} />
          <stop offset="1" stopColor={palette.clay700} />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#poiBg)" />
      <g stroke={palette.kalo} fill="none" strokeWidth="3" opacity="0.18">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="800" cy="500" rx={120 + i * 60} ry={40 + i * 22} />
        ))}
      </g>
      <ellipse cx="800" cy="500" rx="180" ry="70" fill={palette.kalo} opacity="0.7" />
      <ellipse cx="800" cy="490" rx="160" ry="50" fill={palette.kalo800} opacity="0.9" />
    </svg>
  );
}

function BigLeaf({ x, y, scale, rotate, fill }: { x: number; y: number; scale: number; rotate: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-32 -36)`} fill={fill}>
      <path d="M32 14 C26 6, 14 7, 8 17 C2 30, 8 52, 32 66 C56 52, 62 30, 56 17 C50 7, 38 6, 32 14 Z" />
      <path d="M32 6 L32 14" stroke={fill} strokeWidth="1.5" />
    </g>
  );
}

function PalmFrond({ x, y, scale, flip }: { x: number; y: number; scale: number; flip: boolean }) {
  const flipX = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${flipX * scale} ${scale})`} fill={palette.kalo} opacity="0.85">
      <path d="M0 0 C -10 -40, -30 -90, -100 -160 C -60 -130, -25 -90, -10 -50 L 10 -50 C 25 -90, 60 -130, 100 -160 C 30 -90, 10 -40, 0 0 Z" />
      <rect x="-2" y="0" width="4" height="40" />
    </g>
  );
}

function Tapa({ y, color, opacity }: { y: number; color: string; opacity: number }) {
  // Repeating triangular tapa-cloth band.
  const tiles = Array.from({ length: 80 });
  return (
    <g fill={color} opacity={opacity}>
      {tiles.map((_, i) => {
        const x = i * 22;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <polygon points="0,0 10,18 20,0" />
            <polygon points="10,22 0,40 20,40" />
            <circle cx="10" cy="50" r="2" />
          </g>
        );
      })}
    </g>
  );
}
