import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

type Props = {
  project: Project;
  /** Zero-based position; rendered as 01, 02, 03… */
  index: number;
};

export default function ProjectItem({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group">
      <Link
        href={`/projects/${project.slug}`}
        className="grid gap-6 py-10 md:grid-cols-[auto_minmax(0,1.6fr)_minmax(0,1fr)] md:items-start md:gap-12"
      >
        <span
          aria-hidden="true"
          className="text-xs tabular-nums tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-foreground"
        >
          {number}
        </span>

        <div className="max-w-[56ch]">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.005em]">
            {project.title}
          </h3>

          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

          <p className="mt-5 text-sm text-muted">{project.stack.join(" · ")}</p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
            View project
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>

        {/* Real screenshot when supplied; otherwise a labelled empty frame —
            never a fabricated preview. */}
        <div className="relative aspect-[16/10] w-full max-w-full overflow-hidden border border-line">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface">
              <span className="px-4 text-center text-[0.7rem] uppercase tracking-[0.18em] text-muted/60">
                Screenshot pending
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
