# kepler designs

Vite + React + TypeScript + Tailwind CSS v4, set up the shadcn/ui way
(`components.json`, `@/` alias, `src/components/ui`, `src/lib/utils.ts`).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

- `src/components/hero.tsx`: full-screen photo, the fitted wordmark, and the scroll sink-and-dim effect
- `src/components/direction-drum.tsx`: the scroll-driven 3D word drum and the three dealt cards
- `src/content/directions.ts`: the ten drum entries (edit these)
- `src/index.css`: Tailwind, shadcn theme tokens, brand colour and font

Add more shadcn components with `npx shadcn@latest add <component>`.
