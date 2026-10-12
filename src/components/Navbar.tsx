"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Monogram from "./Monogram";
import FullscreenMenu from "./FullscreenMenu";
import { navLinks, profile } from "@/data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Transparent over the hero, solid once the page moves.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: the section occupying the upper middle of the viewport wins.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-background" : ""
        }`}
      >
        <div
          className="flex h-16 items-center justify-between gap-6"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <a
            href="#top"
            aria-label={`${profile.name} — back to top`}
            className="-ml-1 flex items-center py-2 pr-2 text-foreground"
          >
            <Monogram className="h-5 w-auto" />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              className="hidden rounded-md border border-line px-4 py-2 text-sm font-light text-foreground transition-colors duration-300 hover:border-foreground md:inline-block"
            >
              Resume ↓
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
              className="-mr-3 flex h-11 w-11 items-center justify-center text-foreground"
            >
              <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </>
  );
}
