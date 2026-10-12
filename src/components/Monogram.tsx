/**
 * "JS" monogram — geometric letterforms drawn as strokes so they stay crisp
 * at the small size the navigation uses.
 */
export default function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 24"
      className={className}
      role="img"
      aria-label="JS monogram"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
    >
      {/* J */}
      <path d="M16 3v12.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5" />
      <path d="M9 3h9" />
      {/* S — tucked in close to the J so the pair reads as one mark. */}
      <g transform="translate(-6 0)">
        <path d="M40 6.5A4.5 4.5 0 0 0 35.5 3h-3a4 4 0 0 0 0 8h3a4 4 0 0 1 0 8h-3A4.5 4.5 0 0 1 28 15" />
      </g>
    </svg>
  );
}
