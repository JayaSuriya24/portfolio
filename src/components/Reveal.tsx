import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, applied as a transition delay (capped by ScrollEffects). */
  delay?: number;
  as?: ElementType;
  /**
   * When true, the wrapper does not move itself; its children run their own
   * one-off choreography on entry (the word-by-word statement in About).
   */
  group?: boolean;
};

/**
 * One-shot entrance, played by ScrollEffects when the block scrolls into
 * view (see globals.css, "Entrance motion"). This component only tags it.
 */
export default function Reveal({ children, className = "", delay = 0, as, group = false }: Props) {
  const Tag = (as ?? "div") as ElementType;

  if (group) {
    return <Tag className={`reveal-group ${className}`}>{children}</Tag>;
  }

  return (
    <Tag data-scroll="rise" data-scroll-delay={delay || undefined} className={className}>
      {children}
    </Tag>
  );
}
