type Props = {
  size?: number;
  className?: string;
};

export default function LeafMark({ size = 24, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 72"
      width={size}
      height={(size * 72) / 64}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M32 6 L32 14" />
      <path d="M32 14 C26 6, 14 7, 8 17 C2 30, 8 52, 32 66 C56 52, 62 30, 56 17 C50 7, 38 6, 32 14 Z" />
      <path d="M32 16 L32 62" />
      <path d="M32 28 C26 30, 22 32, 16 32" />
      <path d="M32 28 C38 30, 42 32, 48 32" />
      <path d="M32 42 C27 44, 24 46, 20 48" />
      <path d="M32 42 C37 44, 40 46, 44 48" />
    </svg>
  );
}
