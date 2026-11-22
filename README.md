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
| Smooth scrolling (Lenis) | `src/App.tsx` | `src/lib/smooth-scroll.ts` |
| Hero photo, wordmark, sink-and-dim on scroll | `src/components/hero.tsx` | `src/lib/hero-motion.ts` |
| 3D word drum and the dealt cards | `src/components/direction-drum.tsx` | `src/lib/drum.ts` |

- `src/content/directions.ts`: the drum entries (edit these)
- `src/index.css`: Tailwind, theme colours, fonts, and the drum's CSS

Pushing to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).

Add more shadcn components with `npx shadcn@latest add <component>`.
