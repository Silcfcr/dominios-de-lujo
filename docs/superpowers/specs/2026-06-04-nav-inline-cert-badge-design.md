---
name: nav-inline-cert-badge
description: Add LujoTotal™ certification image inline next to the DOMINIOS DE LUJO wordmark in the nav bar Row 1
metadata:
  type: project
---

# Nav Inline Cert Badge

Add the `lujo-total.webp` certification image directly to the right of the "DOMINIOS DE LUJO" wordmark in the nav bar's Row 1, as a clickable link to `/nosotros#lujototal`. The existing floating bottom-right badge remains unchanged.

## Scope

- `components/layout/Nav.tsx` — structural change
- `components/layout/Nav.module.css` — two new CSS rules

No other files are affected.

## Component Change (`Nav.tsx`)

The center column of Row 1 currently holds a single `<Link className={styles.wordmark}>`. Wrap it in a `<div className={styles.wordmarkGroup}>` alongside a new cert image link:

```tsx
<div className={styles.wordmarkGroup}>
  <Link href="/" className={styles.wordmark}>
    DOMINIOS DE LUJO
  </Link>
  <Link href="/nosotros#lujototal" className={styles.certBadge} aria-label="LujoTotal™ certified">
    <Image
      src={assetPath('/images/lujo-total.webp')}
      alt="LujoTotal™"
      width={28}
      height={28}
      style={{ objectFit: 'contain' }}
    />
  </Link>
</div>
```

The `assetPath` helper is already imported in `Nav.tsx`. The `Image` component from `next/image` is also already imported.

## CSS Change (`Nav.module.css`)

Two new rules appended to the existing stylesheet:

```css
.wordmarkGroup {
  display: flex;
  align-items: center;
  gap: 10px;
}

.certBadge {
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: transform 0.2s, opacity 0.2s;
}

.certBadge:hover {
  transform: scale(1.1);
  opacity: 1;
}

@media (max-width: 768px) {
  .certBadge img {
    width: 22px !important;
    height: 22px !important;
  }
}
```

The existing `.wordmark` rule is unchanged.

## Sizing

| Viewport | Cert image size |
|---|---|
| Desktop | 28 × 28 px |
| Mobile (≤ 768 px) | 22 × 22 px |

Row height is 60 px (desktop) / 64 px (mobile), so both sizes fit comfortably with visual breathing room.

## Behavior

- Cert image links to `/nosotros#lujototal` (same destination as the floating badge).
- Hover: scale 1.1×, full opacity — consistent with the floating badge's hover cue.
- The floating `FloatingCertBadge` in the bottom-right corner is **not** removed.

## Out of Scope

- Changes to the floating `FloatingCertBadge` component or its CSS.
- Changes to any page outside the Nav component.
- Tooltip or popover on the cert image.
