type Props = {
  size?: number;
  className?: string;
};

// Wave-in-square brand mark for Pacific Nutra. Three stylized waves
// inside a rounded square, drawn with a clay → ocean-deep diagonal
// gradient. Used as the primary logo glyph in Nav and Footer.
export default function WaveMark({ size = 32, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="wavemark-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D55A38" />
          <stop offset="1" stopColor="#1C3942" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#wavemark-fill)" />
      <g
        fill="none"
        stroke="#FAF6EE"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M14 24 Q 22 18, 32 24 T 50 24" />
        <path d="M14 33 Q 22 27, 32 33 T 50 33" />
        <path d="M14 42 Q 22 36, 32 42 T 50 42" />
      </g>
    </svg>
  );
}
