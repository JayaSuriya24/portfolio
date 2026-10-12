import Image from "next/image";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

/**
 * Asymmetric split: type on the left (~53%), full-height portrait on the
 * right (~47%). On mobile the composition is rebuilt rather than shrunk —
 * the portrait becomes a full-bleed band above a single column of type.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative" data-scroll-hero>
      <div className="flex flex-col md:h-screen md:min-h-[600px] md:flex-row">
        {/* Portrait — first on mobile, right-hand column on desktop. */}
        <div className="relative order-1 h-[54vh] min-h-[340px] w-full shrink-0 overflow-hidden md:order-2 md:h-full md:w-[43%]">
          {/* Scroll-linked: zooms and drifts slower than the page as the
              hero leaves (ScrollEffects). The overlays below stay fixed. */}
          <div className="absolute inset-0" data-scroll="hero-photo">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 43vw"
            style={{ objectPosition: profile.portrait.objectPosition }}
            /* Grayscale with a light contrast/brightness push. Deliberately
               gentle: the portrait is the most prominent element on the page,
               so the face stays bright and recognisable rather than sinking
               into the black. */
            className="object-cover grayscale contrast-[1.12] brightness-[0.88]"
          />
          </div>

          {/* Vignette: pulls the bright studio backdrop down at the edges so it
              recedes into the page, while the centre — the face — is left at
              full brightness. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_62%_38%,transparent_36%,rgba(0,0,0,0.62)_100%)]"
          />

          {/* Edge blend, so the portrait emerges from the page instead of
              ending at a hard rectangle: the seam against the type column on
              desktop, the seam against the name on mobile. The fade is short
              enough that it never reaches the face. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--background)_0%,transparent_30%)] md:bg-[linear-gradient(to_right,var(--background)_0%,transparent_38%)]"
          />
        </div>

        {/* Type — sits in the middle-to-lower-middle of the column, not dead centre. */}
        <div data-scroll="hero-text" className="order-2 flex w-full flex-col justify-end px-[var(--gutter)] py-12 md:order-1 md:w-[57%] md:py-0 md:pb-[15vh] md:pt-24 lg:pl-[calc(var(--gutter)+1.5rem)]">
          <h1
            id="hero-name"
            /* Two scales, because the column changes width at the breakpoint:
               full-width on mobile, 57% on desktop. Both are sized so the
               unbreakable 14-character surname fits without spilling across
               the seam onto the portrait. */
            className="text-[clamp(1.5rem,8.5vw,3rem)] font-semibold uppercase leading-[1.05] tracking-[0.005em] md:text-[clamp(1.75rem,4.5vw,4.5rem)]"
          >
            {profile.fullName}
          </h1>

          {/* Tracks the name at roughly 0.72x so the name stays dominant at
              every width — including the breakpoint, where the name is at its
              smallest. */}
          <p className="mt-3 text-[clamp(1.1rem,6.1vw,2.2rem)] font-light leading-[1.12] tracking-[-0.005em] text-foreground md:text-[clamp(1.25rem,3.24vw,3.25rem)]">
            {profile.title}
          </p>

          <div className="mt-8 max-w-[46ch] space-y-3">
            {profile.intro.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-muted sm:text-base">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
            {profile.location}
          </p>

          <SocialLinks className="mt-6 -ml-3" />
        </div>
      </div>
    </section>
  );
}
