# Portfolio — Jaya Suriya

Personal portfolio site. Next.js (App Router) · TypeScript · Tailwind CSS · statically generated, dark only, no environment variables or secrets.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run typecheck
npm run lint
```

## Editing content

All copy lives in `src/data/` — the components read from it, so the site can be updated without touching any UI code.

| File | Contains |
| --- | --- |
| `src/data/profile.ts` | Name, title, location, hero intro, contact links, canonical URL, About copy, Contact headline |
| `src/data/experience.ts` | Work history |
| `src/data/projects.ts` | Project list **and** the detail-page content for each |
| `src/data/skills.ts` | Skill groups |
| `src/data/education.ts` | Degrees |

Anything written as `[ADD ...]` is an unfilled placeholder. The UI detects these
(`isPlaceholder` in `src/data/profile.ts`) and renders them dimmed and inert rather than
as a broken link, so nothing 404s while the site is incomplete.

Project detail sections (`problem`, `approach`, `architecture`, `features`, `challenges`)
render only when they have content — leaving one out hides its heading entirely.

## Required assets

- **`public/images/portrait.jpg`** — currently a solid neutral-gray placeholder (1200×1600).
  Replace it with the real portrait. It is displayed in grayscale via CSS, so a colour
  original is fine. If the crop cuts the face, adjust `profile.portrait.objectPosition`
  in `src/data/profile.ts`.

  > After swapping the file, the dev server may keep serving the **previously optimized**
  > copy from its image cache. If the old image persists, stop the server and run
  > `rm -rf .next/dev/cache/images`, then start it again.

  The portrait treatment lives in `src/components/Hero.tsx` and is three layers:
  a CSS `grayscale / contrast / brightness` filter, a radial vignette that lets a bright
  studio backdrop recede at the edges, and a short edge-blend gradient that dissolves the
  seam into the page (left edge on desktop, bottom edge on mobile). All three are
  compositional only — none of them touches the face. Delete either overlay `div` for a
  plain hard-edged portrait.
- **`public/resume.pdf`** — not included; the "Resume ↓" button links to it and will 404
  until the real file is added. No placeholder resume was generated.
- **Project screenshots** — optional. Add a file under `public/images/` and set the
  `image` field on that project in `src/data/projects.ts`. Until then the project list
  shows a labelled "Screenshot pending" frame rather than a fabricated preview.

## Typography

The site is set in **Source Serif 4** (via `next/font/google`), used as a stand-in for
**Gwen Text**, which is a commercial face and not distributable through Google Fonts.
Source Serif 4 was chosen for its transitional structure, moderate stroke contrast, sharp
bracketed serifs, and a true 600 SemiBold.

To use licensed Gwen files instead:

1. Put the `.woff2` files in `src/app/fonts/`.
2. In `src/app/layout.tsx`, replace the `Source_Serif_4` import with `next/font/local`:

   ```ts
   import localFont from "next/font/local";

   const serif = localFont({
     variable: "--font-gwen",
     display: "swap",
     src: [
       { path: "./fonts/GwenText-Regular.woff2", weight: "400", style: "normal" },
       { path: "./fonts/GwenText-SemiBold.woff2", weight: "600", style: "normal" },
     ],
   });
   ```

Nothing else changes — every component reads the font through the `--font-gwen` variable,
which `globals.css` maps to the `--font-serif` theme token. If your licence does not
include a Light (300) weight, the hero subtitle and any `font-light` class will synthesise
or fall back to Regular; change those to `font-normal` if that looks wrong.

## Notes

- Design is monochrome by intent: `#000` background, `#FFF` primary text, `#B5B5B5`
  secondary, `#333` borders. No accent colour, no light mode.
- Scroll reveals are pure CSS (`.reveal` in `globals.css`) driven by an IntersectionObserver;
  `prefers-reduced-motion` disables them and smooth scrolling.
- `Person` JSON-LD is emitted from `src/app/layout.tsx` and includes only contact fields
  that have been filled in.
