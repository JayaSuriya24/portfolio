/**
 * Oversized outlined numeral set behind a section, editorial style. It glides
 * sideways as the section crosses the viewport (scroll-driven, CSS only).
 */
export default function SectionMark({ index }: { index: number }) {
  return (
    <span aria-hidden="true" className="section-mark">
      {String(index).padStart(2, "0")}
    </span>
  );
}
