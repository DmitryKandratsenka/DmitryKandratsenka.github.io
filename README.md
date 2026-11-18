# Dzmitry Kandratsenka · Portfolio

Personal site: home, three case studies, and a CV that prints to PDF from the
same content.

- **Stack:** Next.js 16 (App Router, static export), Tailwind CSS 4, Motion,
  MDX, Geist.
- **Content:** every fact lives in `src/content/profile.ts` (roles, ventures,
  numbers) and `src/content/fleet.ts` (the agent schedule). Case studies are
  MDX in `src/content/work/`.
- **Unverified claims** are marked `[VERIFY]` in the content. They render as
  an amber badge on the site and are listed by `npm run cv:pdf`. Clear them
  before publishing.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and refresh the CV PDF

```bash
npm run build        # static site in out/
npm run cv:pdf       # prints /cv to public/Dzmitry-Kandratsenka-CV.pdf
```

The PDF is committed, so the host never needs a browser at build time. Re-run
both commands after changing `profile.ts`, and commit the new PDF.
`cv:pdf` uses the installed Google Chrome, or Playwright's Chromium
(`npx playwright install chromium`).

## Deploy

**Now:** GitHub Pages at https://dmitrykandratsenka.github.io. Publish with
`bash scripts/deploy-pages.sh`: it builds and force-pushes `out/` to the
`gh-pages` branch, which Pages serves.

**Later:** Vercel, framework preset **Next.js**, no settings to change. Set
`NEXT_PUBLIC_SITE_URL` to the final domain so canonical and Open Graph URLs
are right. Vercel Analytics is wired in: enable it in the project's
*Analytics* tab.

## Motion

- The hero pipeline is a timer plus CSS transitions. It pauses off-screen
  and in background tabs, and shows the finished run when the visitor
  prefers reduced motion.
- Section reveals use a single IntersectionObserver and CSS (opacity,
  transform, blur).
- Motion (the library) is used only where layout animates: the
  hover highlight that glides between rows, and the copy-email icon swap.
