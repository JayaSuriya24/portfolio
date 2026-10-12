import OrgLogo from "./OrgLogo";
import Reveal from "./Reveal";
import { education } from "@/data/education";
import { isPlaceholder } from "@/data/profile";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <h2
          id="education-heading"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.005em]"
        >
          Education
        </h2>
      </Reveal>

      <ul className="mt-12">
        {education.map((entry, index) => (
          <li key={entry.id}>
            <Reveal delay={160 + index * 110}>
              <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
                <p
                  className={`text-xs uppercase tracking-[0.18em] ${
                    isPlaceholder(entry.dates) ? "text-muted/50" : "text-muted"
                  }`}
                >
                  {entry.dates}
                </p>

                <div className="max-w-[62ch]">
                  <div className="flex flex-col items-start gap-4 sm:flex-row md:gap-5">
                    {entry.logo && <OrgLogo logo={entry.logo} />}

                    <div className="min-w-0">
                      <h3 className="text-xl font-medium leading-snug md:text-2xl">
                        {entry.degree}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {entry.school} · {entry.location}
                      </p>
                    </div>
                  </div>

                  {entry.coursework && entry.coursework.length > 0 && (
                    <p className="mt-5 leading-relaxed text-muted">
                      {entry.coursework.join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
