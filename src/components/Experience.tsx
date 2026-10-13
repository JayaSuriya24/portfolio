import ExpandableList from "./ExpandableList";
import OrgLogo from "./OrgLogo";
import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";
import { experience } from "@/data/experience";
import { isPlaceholder } from "@/data/profile";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <h2
          id="experience-heading"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.005em]"
        >
          Experience
        </h2>
      </Reveal>

      <ul className="mt-12">
        {experience.map((entry, index) => (
          <li key={entry.id}>
            <Reveal delay={160 + index * 110}>
              <article className="grid gap-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
                <p
                  className={`text-xs uppercase tracking-[0.18em] ${
                    isPlaceholder(entry.start) || isPlaceholder(entry.end)
                      ? "text-muted/50"
                      : "text-muted"
                  }`}
                >
                  {entry.start} — {entry.end}
                </p>

                <div className="max-w-[62ch]">
                  <div className="flex items-start gap-4 md:gap-5">
                    {entry.logo && <OrgLogo logo={entry.logo} />}

                    <div className="min-w-0">
                      <h3
                        className={`text-xl font-medium leading-snug md:text-2xl ${
                          isPlaceholder(entry.role) ? "text-muted/50" : ""
                        }`}
                      >
                        {entry.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {entry.company} · {entry.location}
                      </p>
                      {entry.note && <p className="mt-1 text-sm text-muted">{entry.note}</p>}
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-muted">{entry.description}</p>

                  {entry.accomplishments.length > 0 && (
                    <div className="mt-5">
                      <ExpandableList
                        items={entry.accomplishments.map((text) => ({
                          text,
                          placeholder: isPlaceholder(text),
                        }))}
                      />
                    </div>
                  )}

                  {entry.download && (
                    <div className="mt-6">
                      <DownloadButton href={entry.download} />
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
