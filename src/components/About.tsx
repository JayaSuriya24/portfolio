import { Fragment } from "react";
import Reveal from "./Reveal";
import { about } from "@/data/profile";

/** Renders **phrase** as white emphasis inside grey body copy. */
function withEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-foreground">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function About() {
  const words = about.statement.split(" ");
  // Words follow each other quickly so the sentence is readable almost at once.
  const wordDelay = (index: number) => 100 + index * 28;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <Reveal>
          <h2
            id="about-heading"
            className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.005em]"
          >
            {about.heading}
          </h2>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{about.lead}</p>
          </Reveal>

          {/* Statement: each word rises from behind its own mask, in sequence.
              The full sentence is exposed once to screen readers; the split
              words are hidden from them so it is not read word by word. */}
          <Reveal group className="mt-6">
            <p className="max-w-[30ch] text-[clamp(1.5rem,2.7vw,2.25rem)] font-normal leading-[1.28] tracking-[-0.005em] text-foreground">
              <span className="sr-only">{about.statement}</span>
              <span aria-hidden="true">
                {words.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <span className="word-mask">
                      <span className="word" style={{ transitionDelay: `${wordDelay(index)}ms` }}>
                        {word}
                      </span>
                    </span>
                    {index < words.length - 1 && " "}
                  </Fragment>
                ))}
              </span>
            </p>
          </Reveal>

          <div className="mt-10 max-w-[62ch] space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={120 + index * 100}>
                <p className="leading-relaxed text-muted">{withEmphasis(paragraph)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Facts row; each fact rises in turn. */}
      <div className="mt-16 md:mt-24">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 md:grid-cols-4 md:gap-x-12">
          {about.facts.map((fact, index) => (
            <Reveal key={fact.label} delay={250 + index * 110}>
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">{fact.label}</dt>
              <dd className="mt-3 leading-snug text-foreground">{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
