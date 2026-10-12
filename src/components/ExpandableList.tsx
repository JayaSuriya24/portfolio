"use client";

import { useId, useState } from "react";

type Item = {
  text: string;
  /** Unfilled "[ADD …]" content, shown dimmed. */
  placeholder?: boolean;
};

type Props = {
  items: Item[];
  /** How many items stay visible while collapsed. */
  visible?: number;
};

function Bullet({ item }: { item: Item }) {
  return (
    <li className={`pl-5 -indent-5 leading-relaxed ${item.placeholder ? "text-muted/50" : "text-muted"}`}>
      <span aria-hidden="true">— </span>
      {item.text}
    </li>
  );
}

/**
 * A bullet list that shows the first few items and tucks the rest behind a
 * "Show more" toggle. Lists at or under the limit render plainly, with no
 * button. The hidden items stay in the HTML (readable by search engines) but
 * are `inert` while collapsed, so keyboard and screen-reader users don't land
 * inside content they can't see.
 */
export default function ExpandableList({ items, visible = 3 }: Props) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  const shown = items.slice(0, visible);
  const rest = items.slice(visible);

  if (rest.length === 0) {
    return (
      <ul className="space-y-2">
        {shown.map((item) => (
          <Bullet key={item.text} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <ul className="space-y-2">
        {shown.map((item) => (
          <Bullet key={item.text} item={item} />
        ))}
      </ul>

      {/* Animates height with the grid-rows 0fr -> 1fr technique, so the
          content never needs a measured pixel height. */}
      <div
        id={regionId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-2 pt-2">
            {rest.map((item) => (
              <Bullet key={item.text} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={regionId}
        className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-foreground"
      >
        <span className="border-b border-line pb-0.5 transition-colors duration-300 group-hover:border-foreground">
          {open ? "Show less" : `Show more (${rest.length})`}
        </span>
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-500 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
    </div>
  );
}
