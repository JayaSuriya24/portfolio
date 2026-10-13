import Reveal from "./Reveal";
import { contact, isPlaceholder, profile } from "@/data/profile";

/** "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name", for display only. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/* Phone: label on its own line, then address + arrow. From sm up: one row in
   fixed columns, so every channel lines up. */
const rowClass =
  "grid min-h-[64px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1.5 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-x-8";
const labelClass =
  "col-span-2 text-xs uppercase tracking-[0.18em] text-muted sm:col-span-1";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: displayUrl(profile.linkedin), href: profile.linkedin },
    { label: "GitHub", value: displayUrl(profile.github), href: profile.github },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      // Clip sideways so the sliding headline never widens the page.
      className="overflow-x-clip py-20 md:py-32"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <h2
        id="contact-heading"
        className="text-[clamp(2.25rem,8vw,5.5rem)] font-semibold uppercase leading-[1.02] tracking-[0.005em]"
      >
        {/* Each line slides in from alternating sides as the section scrolls up. */}
        {contact.headlineLines.map((line, index) => (
          <span
            key={line}
            data-scroll="slide"
            data-scroll-delay={index * 90}
            className="block"
            style={{ "--dir": index % 2 === 0 ? -1 : 1 } as React.CSSProperties}
          >
            {line}
          </span>
        ))}
      </h2>

      <Reveal delay={80}>
        <p className="mt-10 max-w-[46ch] leading-relaxed text-muted">{contact.blurb}</p>
      </Reveal>

      <Reveal delay={140}>
        <ul className="mt-12">
          {channels.map(({ label, value, href }) => (
            // w-full: rows span the column so every arrow lines up on the right
            // (the global text knockout would otherwise shrink them to fit).
            <li key={label} className="w-full">
              {isPlaceholder(value) ? (
                <div className={rowClass}>
                  <span className={labelClass}>{label}</span>
                  <span className="text-muted/50">{value}</span>
                </div>
              ) : (
                <a
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer noopener"}
                  className={`group ${rowClass}`}
                >
                  <span className={labelClass}>{label}</span>
                  <span className="min-w-0 text-[0.95rem] [overflow-wrap:anywhere] transition-colors duration-300 group-hover:text-muted sm:text-lg">
                    {value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="justify-self-end transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
