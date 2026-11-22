# kepler designs

Vite + React + TypeScript + Tailwind CSS v4, set up the shadcn/ui way
(`components.json`, `@/` alias, `src/components/ui`, `src/lib/utils.ts`).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

Markup and behaviour live in separate files:

| What | Markup (React) | Behaviour (TypeScript) |
| --- | --- | --- |
| First-visit loading screen (3s, snow ball spinner) | `src/components/loading-screen.tsx`, `src/components/ui/snow-ball-loading-spinner.tsx` | spinner CSS in `src/index.css` |
| Smooth scrolling (Lenis) | `src/App.tsx` | `src/lib/smooth-scroll.ts` |
| Hero photo, wordmark, sink-and-dim on scroll | `src/components/hero.tsx` | `src/lib/hero-motion.ts` |
| About, words part around the cursor | `src/components/about.tsx` | `src/lib/word-spread.ts` |
| 3D word drum | `src/components/direction-drum.tsx` | `src/lib/drum.ts` |
| Practice (design and engineering) | `src/components/practice.tsx` | `src/lib/reveal.ts` |
| Services and prices (home page, and also `/services/`) | `src/components/services.tsx` (page shell: `src/pages/services.tsx`) | (none) |
| Languages, 3D icons: the nearest one turns to the mouse | `src/components/languages.tsx` | `src/lib/code-icons.ts` (three.js, loaded on demand) |
| Gallery zoom into the film, closing wordmark | `src/components/ui/zoom-parallax.tsx`, `src/components/reel-finale.tsx` | (Framer Motion) |

- `src/content/`: the words and data: drum entries, practice lists, brand logos, services and prices, languages, gallery images
- `src/index.css`: Tailwind, theme colours, fonts, and the drum's CSS

Pushing to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).

Add more shadcn components with `npx shadcn@latest add <component>`.
