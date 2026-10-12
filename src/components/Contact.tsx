import Reveal from "./Reveal";
import { contact, isPlaceholder, profile } from "@/data/profile";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: profile.linkedin, href: profile.linkedin },
    { label: "GitHub", value: profile.github, href: profile.github },
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
            <li key={label}>
              {isPlaceholder(value) ? (
                <div className="flex min-h-[64px] flex-wrap items-center gap-x-8 gap-y-1 py-4">
                  <span className="w-24 shrink-0 text-xs uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                  <span className="text-muted/50">{value}</span>
                </div>
              ) : (
                <a
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer noopener"}
                  className="group flex min-h-[64px] flex-wrap items-center gap-x-8 gap-y-1 py-4"
                >
                  <span className="w-24 shrink-0 text-xs uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                  <span className="text-base transition-colors duration-300 group-hover:text-muted sm:text-lg">
                    {value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
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
