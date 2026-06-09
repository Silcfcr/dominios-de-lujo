# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Workflow

Always prefer sub-agent driven development (invoke the `superpowers:subagent-driven-development` skill) when implementing features or fixes.

## Commands

```bash
npm run dev                        # start dev server on localhost:3000
npm run build                      # static export to out/
npm run lint                       # ESLint
node scripts/optimize-images.mjs  # convert PNG/JPG → WebP (quality 82) in public/images/
```

No test suite exists yet. TypeScript type-checking: `npx tsc --noEmit`. Run the image script after adding new raster images; `next/image` is `unoptimized: true` (required by static export — no built-in optimization).

## Architecture

**Next.js 16 static export** — `output: 'export'` in `next.config.ts` generates a fully static `out/` directory. There is no server; all data fetching that looks like `fetch('/data/…')` at runtime is pre-rendered at build time. Dynamic routes like `/dominios/[domain]` require `generateStaticParams` using `fs.readFileSync` (not the async `lib/data.ts` helpers) because the file system is available at build time but not at client runtime.

**Data layer** — All content lives in `public/data/*.json` (domains, categories, flagship, search-index). `lib/data.ts` exposes async helpers that `fetch()` those JSON files; these are used in Server Components. `lib/types.ts` has the shared TypeScript interfaces. Never fetch from `lib/data.ts` inside `generateStaticParams` — read with `fs` directly instead. `lib/data.ts` also exports `slugify(name)` and `unslugify(slug)` helpers for constructing/parsing URL slugs. The internal `fetchJSON` builds absolute URLs using `NEXT_PUBLIC_SITE_URL` (falls back to `http://localhost:3000`) — only relevant if building from a non-localhost origin.

**Asset paths** — `NEXT_PUBLIC_BASE_PATH` is set to `/dominios-de-lujo` in production (GitHub Pages). Always use `lib/assetPath.ts`'s `assetPath()` helper for paths to `public/` assets, and `<Link href=…>` / `next/image` for internal navigation/images (they handle `basePath` automatically).

**i18n** — Client-side only. `lib/i18n/context.tsx` provides `I18nProvider` and `useI18n()` with a `t(key)` function. Translations are flat JSON files in `lib/i18n/es.json` and `lib/i18n/en.json`. Language preference is stored in `localStorage` under key `ddl-lang`. Default language is Spanish (`es`). Because `useI18n()` is a React context hook, any component or page that calls `t()` directly must be a Client Component — add `'use client'` at the top.

**Translation rule** — Every visible string in every component MUST be translated. No hardcoded Spanish (or any language) strings in JSX. Always add the new key to BOTH `lib/i18n/es.json` and `lib/i18n/en.json` before using it in a component. Group new keys under a logical namespace matching the component (e.g. `writersGrid`, `colaborar`). Never ship a feature without its English counterpart in `en.json`.

**Styling** — CSS Modules (`.module.css` co-located with each component) plus a global `app/globals.css`. Do not use inline styles or Tailwind. `globals.css` also defines shared utility classes that components reference directly via `className` (not via CSS Modules): `sec` / `sec-sm` (section padding), `s-eye` (gold eyebrow label), `s-title` (display heading; `.inv` inverts to white, `em` renders in gold), `btn-dark` / `btn-outline` / `btn-gold` (CTA buttons), and `reveal` / `reveal2` / `reveal3` (staggered scroll-in animations — applied by `RevealWrapper`). Design tokens (CSS custom properties in `:root`):

| Token | Value | Role |
|---|---|---|
| `--w` | `#FFFFFF` | pure white |
| `--c` | `#FAFAF8` | page background cream |
| `--c2` | `#F5F0EA` | subtle background tint |
| `--ink` | `#1A1714` | primary text |
| `--ink2` | `#3A3530` | secondary text |
| `--ink3` | `#6E6864` | muted / captions |
| `--gold` | `#B08A3A` | brand accent |
| `--glt` | `#C9A55C` | lighter gold |
| `--gdim` | `#E2CFA0` | very light gold |
| `--rule` | `#E2DDD8` | divider lines |
| `--fd` | Cormorant + serif | display / headings |
| `--fb` | Lora + serif | body copy |

**Component organization:**
- `components/layout/` — `Nav` and `Footer`, rendered in `app/layout.tsx`
- `components/home/` — one component per homepage section, assembled in `app/page.tsx`
- `components/dominios/` — domain catalogue UI (search, cards, category filter)
- `components/about/` — about page sections
- `components/ui/` — shared primitives: `RevealWrapper` (wraps children in a scroll-triggered reveal animation), `LanguageToggle`, `FloatingCertBadge` (fixed-position badge, rendered globally in `app/layout.tsx`), `ScrollReset` (resets scroll on route change, also in root layout)

**Pages:**
- `/` — homepage
- `/dominios` — domain catalogue with search/filter
- `/dominios/[domain]` — domain detail (static, server-rendered shell + `DomainDetailClient`)
- `/servicios` — services page
- `/servicios/afiliados` — affiliate programme detail page
- `/colaborar` — partner/collaborate page
- `/nosotros` — about page
- `/lujototal` — LujoTotal™ editorial standard page

**Deployment** — GitHub Actions workflow (`.github/workflows/deploy.yml`) builds with `NEXT_PUBLIC_BASE_PATH=/dominios-de-lujo` and deploys `out/` to GitHub Pages on every push to `main` or `client-feedback/v1`.
