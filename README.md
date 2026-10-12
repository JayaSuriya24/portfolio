# Portfolio — Jaya Suriya

Personal portfolio site. Next.js (App Router) · TypeScript · Tailwind CSS · statically generated, dark only, no environment variables or secrets.

**Live:** https://jayasuriya-manick-portfolio.netlify.app · hosted on Netlify — see
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for redeploying, access settings and the launch checklist.

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

- **`public/images/portrait.jpg`** — the hero portrait. To replace it, drop in a new file
  with the same name. It is displayed in grayscale via CSS, so a colour original is fine.
  If the crop cuts the face, adjust `profile.portrait.objectPosition` in `src/data/profile.ts`.

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

## Motion and backdrop

All motion is transform/opacity only, and none of it runs JavaScript on every scroll frame.

| Effect | Where | How |
| --- | --- | --- |
| Block entrances (fade + lift) | `Reveal.tsx`, `ScrollEffects.tsx` | One-shot. An IntersectionObserver removes `.reveal-pending` and a CSS transition plays. |
| Word-by-word About statement | `About.tsx` (`<Reveal group>`) | Same observer; each `.word` has a short staggered transition. |
| Contact headline slide | `Contact.tsx` (`data-scroll="slide"`) | Same as entrances, sideways by `--dir`. |
| Hero parallax (portrait zoom, text lift) | `Hero.tsx`, `ScrollEffects.tsx` | The only scroll-linked JS; writes `--hp` and only runs while the hero is on screen. |
| Backdrop: dashed dial, inner ring, needle, gutter rule, dotted ring | `Backdrop.tsx` | CSS scroll-driven animations (`animation-timeline: scroll()`), compositor-run. |
| Outlined section numerals 01–06 | `SectionMark.tsx`, `page.tsx` | CSS `animation-timeline: view()`; glide sideways as each section passes. |

Rules worth knowing before changing any of it (styles are in `src/app/globals.css`):

- **Text is visible by default.** `ScrollEffects` hides only blocks that are still below
  the fold at load. Anything it misses (no JS, reduced motion, a hot reload) just shows.
  Do not add a CSS rule that hides `[data-scroll]` unconditionally.
- **`delay` on `<Reveal>` is a transition delay in ms**, capped at 450 ms by `ScrollEffects`.
- **Text knockout:** headings, paragraphs, text list items and labels inside `<main>` get
  the page background and `width: fit-content` (the "Text knockout" rule, in
  `@layer base`), so the backdrop and numerals pass *behind* words and show only in empty
  space. New text elements are covered automatically; a list item that wraps a whole
  card (`li` containing a `div`/`article`) is deliberately excluded.
- **Browser support:** scroll-driven animations run in Chromium and Safari 26+. Elsewhere
  the backdrop and numerals render still, which is the intended fallback.
- **Reduced motion:** `prefers-reduced-motion` turns off entrances, the backdrop, the
  numerals and smooth scrolling.
- The fullscreen menu uses GSAP (`FullscreenMenu.tsx`): about 0.8 s clip-path reveal with
  staggered links.

## Notes

- Design is monochrome by intent: `#000` background, `#FFF` primary text, `#B5B5B5`
  secondary, `#333` borders. No accent colour, no light mode.
- Layout is responsive (checked at 390 px and 1440 px): the hero becomes a full-bleed portrait above a
  single column of type on phones, and nothing scrolls horizontally (`<main>` uses
  `overflow-x: clip`).
- `Person` JSON-LD is emitted from `src/app/layout.tsx` and includes only contact fields
  that have been filled in.
