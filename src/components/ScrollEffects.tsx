"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Longest stagger allowed, so nothing waits on screen long enough to look missing. */
const MAX_DELAY = 450;

/**
 * Motion for the whole site. It renders nothing.
 *
 *   data-scroll="rise"        fades and lifts in, once, as it enters
 *   data-scroll="slide"       slides in sideways, once (direction: --dir)
 *   data-scroll="hero-photo"  --hp  portrait zooms and drifts as the hero leaves
 *   data-scroll="hero-text"   --hp  hero type lifts and fades as the hero leaves
 *   .reveal-group             children run their own entrance (About's words)
 *
 * Fail-safe by design: content is visible by default. Only blocks that are
 * still below the fold get .reveal-pending (hidden), and an
 * IntersectionObserver removes it as they enter, letting a short CSS
 * transition play. Anything never marked — no JS, reduced motion, elements
 * swapped in by a hot reload — is simply shown.
 */
export default function ScrollEffects() {
  // Re-scan after client-side navigation, which swaps the page's elements.
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = (element: Element) => element.classList.remove("reveal-pending");

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Also reveal anything already scrolled past (e.g. after a jump link).
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              reveal(entry.target);
              observer?.unobserve(entry.target);
            }
          });
        },
        // Trigger a little before the element is fully in view so text is
        // already settling by the time it is read.
        { rootMargin: "0px 0px -8% 0px", threshold: 0 },
      );

      const fold = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>('[data-scroll="rise"], [data-scroll="slide"], .reveal-group')
        .forEach((element) => {
          // Already on screen: leave it alone so nothing visible blinks out.
          if (element.getBoundingClientRect().top < fold) return;
          const delay = Math.min(Number(element.dataset.scrollDelay ?? 0), MAX_DELAY);
          if (delay) element.style.setProperty("--delay", `${delay}ms`);
          element.classList.add("reveal-pending");
          observer?.observe(element);
        });
    }

    // Hero parallax: scroll-linked, but only while the hero is on screen.
    const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");
    const heroPhoto = document.querySelector<HTMLElement>('[data-scroll="hero-photo"]');
    const heroText = document.querySelector<HTMLElement>('[data-scroll="hero-text"]');
    const desktop = window.matchMedia("(min-width: 768px)");

    let frame = 0;
    let heroHeight = hero?.offsetHeight ?? 0;
    let lastProgress = -1;

    const update = () => {
      frame = 0;
      if (!hero || !heroHeight) return;
      const progress = clamp(window.scrollY / heroHeight);
      if (progress === lastProgress) return;
      lastProgress = progress;
      const value = progress.toFixed(4);
      heroPhoto?.style.setProperty("--hp", value);
      // On phones the type sits below the photo; fading it while it is
      // still being read would hide it, so it stays put there.
      if (heroText) {
        if (desktop.matches) heroText.style.setProperty("--hp", value);
        else heroText.style.removeProperty("--hp");
      }
    };

    const schedule = () => {
      // Once the hero is fully gone, its final state is already set.
      if (!frame && (lastProgress < 1 || window.scrollY < heroHeight)) {
        frame = window.requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      heroHeight = hero?.offsetHeight ?? 0;
      lastProgress = -1;
      schedule();
    };

    if (hero) {
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize);
    }

    return () => {
      observer?.disconnect();
      // Never leave anything hidden behind once this effect is torn down.
      document.querySelectorAll(".reveal-pending").forEach(reveal);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return null;
}
