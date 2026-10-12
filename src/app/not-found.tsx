import Link from "next/link";
import Monogram from "@/components/Monogram";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col justify-center"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Monogram className="h-5 w-auto text-foreground" />

      <p className="mt-16 text-xs uppercase tracking-[0.18em] text-muted">Error 404</p>

      <h1 className="mt-6 text-[clamp(2rem,6vw,4rem)] font-medium uppercase leading-[1.05] tracking-[-0.02em]">
        Page not found
      </h1>

      <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">
        That page doesn&apos;t exist — it may have been moved or renamed.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-md border border-line px-5 py-3 text-sm text-foreground transition-colors duration-300 hover:border-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to home
      </Link>
    </main>
  );
}
