---
name: developer-readme
description: Replace the boilerplate README.md with a human-facing developer reference covering setup, architecture, and styling conventions
metadata:
  type: project
---

# Developer README Design

## Goal

Replace the default Next.js boilerplate `README.md` with a concise, onboarding-focused reference for a new developer joining the project. The README must be self-contained and let a new dev get running quickly before diving into the code.

## Audience

A developer who is new to this codebase but familiar with Next.js and TypeScript.

## Approach

Option A (quick-start first): dev commands appear before any prose explanation. Architecture and styling follow as lightweight bullet-point sections. The new dev is running `npm run dev` before they finish reading.

## Structure and Content

### Header

```
# Dominios de Lujo
```

One-sentence project description: premium Spanish-language domain marketplace for luxury brands, built as a Next.js 16 static site deployed on GitHub Pages.

### Getting Started

List prerequisites (Node 20+), then the four commands:

- `npm install`
- `npm run dev` — localhost:3000
- `npm run build` — static export to `out/`
- `npm run lint` — ESLint
- `node scripts/optimize-images.mjs` — convert PNG/JPG to WebP

### Project Structure

Annotated directory tree:

- `app/` — Pages and layouts (Next.js App Router)
- `components/` — UI components grouped by section (`home/`, `brands/`, `dominios/`, etc.)
- `lib/` — Shared utilities: data fetching, types, i18n, asset path helper
- `public/data/` — Content as JSON (domains, categories, search index)
- `public/images/` — WebP assets (run optimize-images.mjs after adding new rasters)
- `scripts/` — Build-time utilities

### Architecture

Four bullets, each covering one non-obvious constraint:

1. **Static export** — `output: 'export'` in next.config.ts. No server; everything pre-rendered at build time, served as flat files from `out/`.
2. **Data layer** — all content in `public/data/*.json`. `lib/data.ts` exposes async helpers for Server Components. Inside `generateStaticParams`, use `fs.readFileSync` directly (not `lib/data.ts`).
3. **i18n** — client-side only via `lib/i18n/context.tsx`. Two flat JSON files (`es.json` / `en.json`). Every visible string needs a key in both files. Default language is Spanish. Components calling `useI18n()` must be Client Components (`'use client'`).
4. **Asset paths** — use `assetPath()` from `lib/assetPath.ts` for all `public/` assets. `<Link>` and `next/image` handle `basePath` automatically.

### Styling

Three bullets:

1. **CSS Modules** — each component has a co-located `.module.css` file. No inline styles, no Tailwind.
2. **Design tokens** — CSS custom properties in `app/globals.css`. Key tokens: `--gold` (#B08A3A), `--ink` (#1A1714), `--c` (#FAFAF8), `--fd` (Cormorant serif, headings), `--fb` (Lora serif, body).
3. **Global utility classes** — in `globals.css`, used directly via `className` (not CSS Modules): `sec` / `sec-sm` (section padding), `s-eye` (eyebrow label), `s-title` (display heading), `btn-dark` / `btn-outline` / `btn-gold` (CTAs), `reveal` / `reveal2` / `reveal3` (scroll animations via RevealWrapper).

## Out of Scope

- Deployment guide (not requested)
- Inline JSDoc comments
- Storybook or component-level docs
- CLAUDE.md changes (already thorough for AI assistants)
