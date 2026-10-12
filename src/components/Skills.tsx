import Reveal from "./Reveal";
import { skills } from "@/data/skills";
import { isPlaceholder } from "@/data/profile";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <h2
          id="skills-heading"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.005em]"
        >
          Skills
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={160 + index * 90}>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-muted">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={isPlaceholder(item) ? "text-muted/50" : "text-foreground"}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
