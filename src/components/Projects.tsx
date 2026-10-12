import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <h2
          id="projects-heading"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.005em]"
        >
          Projects
        </h2>
      </Reveal>

      <div className="mt-12">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={160 + index * 110}>
            <ProjectItem project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
