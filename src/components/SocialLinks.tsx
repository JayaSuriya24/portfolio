import type { ComponentType } from "react";
import { isPlaceholder, profile } from "@/data/profile";

type IconProps = { size?: number };

/* lucide-react v1 no longer ships brand icons, so the two marks are inlined. */

function GithubIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

type Props = {
  className?: string;
  /** Icon edge length in px. The touch target stays 44px regardless. */
  size?: number;
};

/**
 * Profile links. Email is deliberately not here — it has its own row in the
 * Contact section, where it reads as an address rather than an icon.
 */
export default function SocialLinks({ className = "", size = 18 }: Props) {
  const links: {
    label: string;
    href: string;
    icon: ComponentType<IconProps>;
    placeholderNote: string;
  }[] = [
    {
      label: "GitHub",
      href: profile.github,
      icon: GithubIcon,
      placeholderNote: "GitHub URL not set",
    },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      icon: LinkedinIcon,
      placeholderNote: "LinkedIn URL not set",
    },
  ];

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map(({ label, href, icon: Icon, placeholderNote }) => (
        <li key={label}>
          {isPlaceholder(href) ? (
            // Unfilled: inert and visibly dimmed rather than a dead link.
            // No `title` — it produced a browser tooltip on hover. The label is
            // exposed to assistive tech only, via role + aria-label.
            <span
              role="img"
              aria-label={placeholderNote}
              className="flex h-11 w-11 items-center justify-center text-muted/40"
            >
              <Icon size={size} />
            </span>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground"
            >
              <Icon size={size} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
