# Floating LujoTotal Certification Badge

## Context

The LujoTotal™ certification is a core trust signal for the Dominios de Lujo brand. Currently the certification image appears only in specific page sections. The goal is to make it permanently visible site-wide as a subtle but persistent credibility indicator, while linking users to the LujoTotal section of the about page.

## Component

**`components/ui/FloatingCertBadge.tsx`** — a new shared UI primitive, consistent with the existing `components/ui/` pattern (alongside `RevealWrapper` and `LanguageToggle`).

- Renders a fixed-position `<Link href="/nosotros#lujototal">` wrapping a `next/image` of `/images/lujo-total.webp`
- `'use client'` is not required — no client-side state needed; `<Link>` and `next/image` work in Server Components
- Alt text: `"LujoTotal™ certification"`

## Styling

**`components/ui/FloatingCertBadge.module.css`**

- `position: fixed; bottom: 32px; right: 32px; z-index: 50`
- Image width: `72px` at rest, scales to `~84px` on hover via `transform: scale(1.17)`
- Hover also adds a soft drop shadow: `filter: drop-shadow(0 4px 12px rgba(176,138,58,0.35))` (gold-tinted)
- Transition: `transform 220ms ease, filter 220ms ease`
- Mobile (`max-width: 768px`): reduce to `bottom: 20px; right: 20px`, image width `56px`

## Layout Integration

**`app/layout.tsx`** — import `FloatingCertBadge` and render it inside `<I18nProvider>`, after `<Footer>`:

```tsx
<I18nProvider>
  <Nav />
  <main style={{ paddingTop: '136px' }}>{children}</main>
  <Footer />
  <FloatingCertBadge />
</I18nProvider>
```

## What's Not In Scope

- No scroll-aware hide/show logic
- No animation on mount
- No tooltip or label text
