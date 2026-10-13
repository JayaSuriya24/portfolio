import { isPlaceholder } from "@/data/profile";

/**
 * "Download the app" call to action. Solid white when `href` is a real URL;
 * while it is still an "[ADD …]" placeholder it renders as an inert, dashed
 * "Coming soon" button, so visitors never land on a broken link.
 */
export default function DownloadButton({ href, className = "" }: { href: string; className?: string }) {
  if (isPlaceholder(href)) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex cursor-not-allowed items-center gap-3 rounded-md border border-dashed border-line px-5 py-3 text-sm text-muted ${className}`}
      >
        Download the app
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted/70">Coming soon</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 ${className}`}
    >
      Download the app
      {/* bg-transparent: overrides the global text knockout inside the white button. */}
      <span aria-hidden="true" className="bg-transparent">↓</span>
    </a>
  );
}
