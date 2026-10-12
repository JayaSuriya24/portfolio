"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { navLinks, profile } from "@/data/profile";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  open: boolean;
  onClose: () => void;
  activeId: string;
};

export default function FullscreenMenu({ open, onClose, activeId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.set(".menu-link-item", { yPercent: 110 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(containerRef.current, {
        duration: 0.8,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(
        ".menu-link-item",
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power4.out",
        },
        "-=0.4"
      );
  }, { scope: containerRef });

  useEffect(() => {
    if (open) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [open]);

  // Accessibility: focus management and scroll lock
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={containerRef}
      id="fullscreen-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        className="flex h-16 shrink-0 items-center justify-end"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-3 flex h-11 w-11 items-center justify-center text-foreground"
        >
          <X size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <nav
        className="flex flex-1 flex-col justify-center overflow-y-auto py-6"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <ul className="flex flex-col gap-3 sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.id} className="overflow-hidden">
              <a
                href={link.href}
                onClick={onClose}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`menu-link-item block text-[clamp(2.25rem,10vw,4.5rem)] font-light leading-[1.1] tracking-tight transition-colors hover:text-foreground ${
                  activeId === link.id ? "text-foreground" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="flex shrink-0 flex-wrap items-center justify-between gap-4 py-6"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <SocialLinks className="-ml-3" />
        <a
          href={profile.resumeUrl}
          className="rounded-md border border-line px-5 py-3 text-sm text-foreground transition-colors duration-300 hover:border-foreground"
        >
          Resume ↓
        </a>
      </div>
    </div>
  );
}
