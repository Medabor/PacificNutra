type Props = {
  size?: number;
  className?: string;
};

// Pacific Nutra emblem — a taro (kalo) leaf rising over Pacific waves,
// set in a gold-ringed roundel. Brand mark used in Nav and Footer.
// Mirrors public/brand/pacific-nutra-logo.svg.
export default function Logo({ size = 36, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Pacific Nutra"
      className={className}
    >
      <circle cx="60" cy="60" r="60" fill="#1C3942" />
      <circle
        cx="60"
        cy="60"
        r="50.5"
        fill="none"
        stroke="#D2BE93"
        strokeWidth="1.4"
        opacity="0.65"
      />
      <g fill="none" stroke="#DD7E5C" strokeWidth="4.2" strokeLinecap="round">
        <path d="M38 86 Q49 80 60 86 T82 86" />
        <path d="M44 95 Q52 90 60 95 T76 95" />
      </g>
      <g transform="translate(60 47) scale(0.9) translate(-32 -36)">
        <path
          d="M32 6 L32 14"
          fill="none"
          stroke="#FAF6EE"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
        <path
          d="M32 14 C26 6 14 7 8 17 C2 30 8 52 32 66 C56 52 62 30 56 17 C50 7 38 6 32 14 Z"
          fill="#FAF6EE"
        />
        <g
          fill="none"
          stroke="#2F4F3A"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 16 L32 62" />
          <path d="M32 28 C26 30 22 32 16 32" />
          <path d="M32 28 C38 30 42 32 48 32" />
          <path d="M32 42 C27 44 24 46 20 48" />
          <path d="M32 42 C37 44 40 46 44 48" />
        </g>
      </g>
    </svg>
  );
}
