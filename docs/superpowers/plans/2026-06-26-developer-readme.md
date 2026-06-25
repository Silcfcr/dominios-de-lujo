# Developer README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the boilerplate `README.md` with a concise, onboarding-focused developer reference covering setup, architecture, and styling conventions.

**Architecture:** Single markdown file at the repo root. No code changes, no new dependencies. Content is derived from the verified project state (package.json, directory structure, CLAUDE.md, and existing source files).

**Tech Stack:** Markdown

## Global Constraints

- No em dashes anywhere in the content
- No deployment section (out of scope)
- No inline JSDoc or Storybook references
- CLAUDE.md must not be modified

---

### Task 1: Write README.md

**Files:**
- Modify: `README.md` (full replacement of boilerplate content)

**Interfaces:**
- Consumes: nothing
- Produces: `README.md` readable by any new developer

- [ ] **Step 1: Verify the commands listed are accurate**

Run each command and confirm it exists:

```bash
cat package.json | grep '"scripts"' -A 10
ls scripts/
```

Expected: `dev`, `build`, `lint` scripts present; `scripts/optimize-images.mjs` exists.

- [ ] **Step 2: Write the new README.md**

Replace the entire file with:

```markdown
# Dominios de Lujo

Premium Spanish-language domain marketplace for luxury brands, built as a Next.js 16 static site deployed on GitHub Pages.

## Getting Started

**Prerequisites:** Node 20+

\`\`\`bash
npm install
npm run dev        # localhost:3000
npm run build      # static export to out/
npm run lint       # ESLint
node scripts/optimize-images.mjs  # convert PNG/JPG to WebP
\`\`\`

## Project Structure

\`\`\`
app/              Pages and layouts (Next.js App Router)
components/       UI components grouped by section (home/, brands/, dominios/, etc.)
lib/              Shared utilities: data fetching, types, i18n, asset path helper
public/data/      Content as JSON (domains, categories, search index)
public/images/    WebP assets (run optimize-images.mjs after adding new rasters)
scripts/          Build-time utilities
\`\`\`

## Architecture

- **Static export** — `output: 'export'` in `next.config.ts`. No server; everything pre-rendered at build time and served as flat files from `out/`.
- **Data layer** — all content lives in `public/data/*.json`. `lib/data.ts` exposes async helpers for Server Components. Inside `generateStaticParams`, use `fs.readFileSync` directly instead of `lib/data.ts`.
- **i18n** — client-side only via `lib/i18n/context.tsx`. Two flat JSON files (`es.json` / `en.json`). Every visible string needs a key in both files. Default language is Spanish. Components that call `useI18n()` must be Client Components (`'use client'`).
- **Asset paths** — use `assetPath()` from `lib/assetPath.ts` for all `public/` assets. `<Link>` and `next/image` handle `basePath` automatically.

## Styling

- **CSS Modules** — each component has a co-located `.module.css` file. No inline styles, no Tailwind.
- **Design tokens** — CSS custom properties in `app/globals.css`. Key tokens: `--gold` (#B08A3A), `--ink` (#1A1714), `--c` (#FAFAF8), `--fd` (Cormorant serif, headings), `--fb` (Lora serif, body).
- **Global utility classes** — defined in `globals.css`, used directly via `className` (not through CSS Modules): `sec` / `sec-sm` (section padding), `s-eye` (eyebrow label), `s-title` (display heading), `btn-dark` / `btn-outline` / `btn-gold` (CTAs), `reveal` / `reveal2` / `reveal3` (scroll animations via `RevealWrapper`).
```

- [ ] **Step 3: Confirm no em dashes were introduced**

```bash
grep -- '--' README.md
```

Expected: no output (zero matches).

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: replace boilerplate README with developer reference"
```
