import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Monogram from "@/components/Monogram";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/data/projects";
import { isPlaceholder } from "@/data/profile";
import DownloadButton from "@/components/DownloadButton";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Jaya Suriya`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | Jaya Suriya`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Jaya Suriya`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { detail } = project;

  // Each entry renders only if it has content, so an unfilled field never
  // leaves a bare heading on the live site.
  const prose: { heading: string; body: string | undefined }[] = [
    { heading: "Problem", body: detail.problem },
    { heading: "Approach", body: detail.approach },
    { heading: "Architecture", body: detail.architecture },
  ];

  const lists: { heading: string; items: string[] | undefined }[] = [
    { heading: "Key features", items: detail.features },
    { heading: "Challenges", items: detail.challenges },
  ];

  const links = [
    { label: "GitHub", href: project.github },
    { label: "Live demo", href: project.demo },
  ].filter((link) => link.href && !isPlaceholder(link.href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-background">
        <div
          className="flex h-16 items-center justify-between gap-6"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <Link href="/" aria-label="Back to home" className="-ml-1 flex items-center py-2 pr-2">
            <Monogram className="h-5 w-auto" />
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-light text-muted transition-colors duration-300 hover:text-foreground"
          >
            <span aria-hidden="true">←</span>
            All projects
          </Link>
        </div>
      </header>

      <main id="main" className="pt-16">
        <article>
          <div
            className="py-16 md:py-24"
            style={{ paddingInline: "var(--gutter)" }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Project</p>

            <h1 className="mt-6 max-w-[20ch] text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {project.title}
            </h1>

            <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted">
              {project.overview}
            </p>

            {(links.length > 0 ||
              project.download ||
              (project.status && !isPlaceholder(project.status))) && (
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {/* Primary action: solid, so it leads the outlined links. */}
                {project.download && <DownloadButton href={project.download} />}

                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-md border border-line px-5 py-3 text-sm text-foreground transition-colors duration-300 hover:border-foreground"
                  >
                    {link.label} ↗
                  </a>
                ))}

                {project.status && !isPlaceholder(project.status) && (
                  <span className="text-sm text-muted">{project.status}</span>
                )}
              </div>
            )}
          </div>

          {project.image && (
            <div
              className="pb-16 md:pb-24"
              style={{ paddingInline: "var(--gutter)" }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-line">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>
          )}

          {prose.map(({ heading, body }) =>
            body ? (
              <section
                key={heading}
                className="py-14 md:py-20"
                style={{ paddingInline: "var(--gutter)" }}
              >
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-muted">
                    {heading}
                  </h2>
                  <p className="max-w-[62ch] leading-relaxed text-muted">{body}</p>
                </div>
              </section>
            ) : null,
          )}

          {lists.map(({ heading, items }) =>
            items && items.length > 0 ? (
              <section
                key={heading}
                className="py-14 md:py-20"
                style={{ paddingInline: "var(--gutter)" }}
              >
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-muted">
                    {heading}
                  </h2>
                  <ul className="max-w-[62ch] space-y-4">
                    {items.map((item) => (
                      <li key={item} className="pl-5 -indent-5 leading-relaxed text-muted">
                        <span aria-hidden="true">— </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null,
          )}

          <section
            className="py-14 md:py-20"
            style={{ paddingInline: "var(--gutter)" }}
          >
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
              <h2 className="text-xs uppercase tracking-[0.18em] text-muted">Stack</h2>
              <p className="max-w-[62ch] leading-relaxed text-foreground">
                {project.stack.join(" · ")}
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
