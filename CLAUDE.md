# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server on localhost:3000
npm run build     # static export to out/
npm run lint      # ESLint
```

No test suite exists yet. TypeScript type-checking: `npx tsc --noEmit`.

## Architecture

**Next.js 16 static export** — `output: 'export'` in `next.config.ts` generates a fully static `out/` directory. There is no server; all data fetching that looks like `fetch('/data/…')` at runtime is pre-rendered at build time. Dynamic routes like `/dominios/[domain]` require `generateStaticParams` using `fs.readFileSync` (not the async `lib/data.ts` helpers) because the file system is available at build time but not at client runtime.

**Data layer** — All content lives in `public/data/*.json` (domains, categories, flagship, search-index). `lib/data.ts` exposes async helpers that `fetch()` those JSON files; these are used in Server Components. `lib/types.ts` has the shared TypeScript interfaces. Never fetch from `lib/data.ts` inside `generateStaticParams` — read with `fs` directly instead.

**Asset paths** — `NEXT_PUBLIC_BASE_PATH` is set to `/dominios-de-lujo` in production (GitHub Pages). Always use `lib/assetPath.ts`'s `assetPath()` helper for paths to `public/` assets, and `<Link href=…>` / `next/image` for internal navigation/images (they handle `basePath` automatically).

**i18n** — Client-side only. `lib/i18n/context.tsx` provides `I18nProvider` and `useI18n()` with a `t(key)` function. Translations are flat JSON files in `lib/i18n/es.json` and `lib/i18n/en.json`. Language preference is stored in `localStorage` under key `ddl-lang`. Default language is Spanish (`es`).

**Styling** — CSS Modules (`.module.css` co-located with each component) plus a global `app/globals.css`. Design tokens are CSS custom properties defined in `:root` in `globals.css`: colors (`--ink`, `--gold`, `--c`, etc.) and font stacks (`--fd` for display/Cormorant, `--fb` for body/Lora). Do not use inline styles or Tailwind.

**Component organization:**
- `components/layout/` — `Nav` and `Footer`, rendered in `app/layout.tsx`
- `components/home/` — one component per homepage section, assembled in `app/page.tsx`
- `components/dominios/` — domain catalogue UI (search, cards, category filter)
- `components/about/` — about page sections
- `components/ui/` — shared primitives (`RevealWrapper`, `LanguageToggle`)

**Pages:**
- `/` — homepage
- `/dominios` — domain catalogue with search/filter
- `/dominios/[domain]` — domain detail (static, server-rendered shell + `DomainDetailClient`)
- `/servicios` — services page
- `/colaborar` — partner/collaborate page
- `/nosotros` — about page

**Deployment** — GitHub Actions workflow (`.github/workflows/deploy.yml`) builds with `NEXT_PUBLIC_BASE_PATH=/dominios-de-lujo` and deploys `out/` to GitHub Pages on every push to `main`.
