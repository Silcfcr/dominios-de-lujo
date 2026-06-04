# Image Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce homepage image payload from ~23MB to ~1MB by converting images to WebP and lazily mounting off-screen hero slides.

**Architecture:** A one-time local script converts all `public/images/` assets to WebP using sharp (already a transitive Next.js dependency). Component `src` refs are updated to `.webp`. The Hero slideshow is patched to only mount the active slide and the next one, cutting initial image decode work from 4 images to 1.

**Tech Stack:** Node.js ESM script, sharp, Next.js `<Image>`, React `useState`

---

## Files

| Action | Path |
|---|---|
| Create | `scripts/optimize-images.mjs` |
| Modify | `components/home/Hero.tsx` |
| Modify | `components/home/CategoryTeaser.tsx` |
| Modify | `components/home/PartnerValue.tsx` |
| Modify | `components/home/LujoTotal.tsx` |
| Modify | `components/layout/Nav.tsx` |
| Modify | `components/layout/Footer.tsx` |
| Modify | `components/about/MissionVision.tsx` |

---

## Task 1: Create the image conversion script

**Files:**
- Create: `scripts/optimize-images.mjs`

- [ ] **Step 1: Create `scripts/` directory and write the script**

Create `scripts/optimize-images.mjs` with this exact content:

```js
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'public', 'images');

function formatBytes(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)}MB`;
  return `${Math.round(bytes / 1_000)}KB`;
}

async function main() {
  const files = await readdir(INPUT_DIR);
  const targets = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`\nConverting ${targets.length} images to WebP (quality 82)…\n`);
  console.log('File'.padEnd(32), 'Before'.padStart(8), 'After'.padStart(8), 'Saved'.padStart(7));
  console.log('─'.repeat(60));

  for (const file of targets) {
    const inPath  = join(INPUT_DIR, file);
    const outPath = join(INPUT_DIR, basename(file, extname(file)) + '.webp');
    const before  = (await stat(inPath)).size;

    await sharp(inPath).webp({ quality: 82 }).toFile(outPath);

    const after = (await stat(outPath)).size;
    const saved = Math.round((1 - after / before) * 100);

    console.log(
      file.padEnd(32),
      formatBytes(before).padStart(8),
      formatBytes(after).padStart(8),
      `${saved}%`.padStart(7),
    );
  }

  console.log('\nDone. Originals preserved — delete them after verifying the site.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Run the script from the project root**

```bash
node scripts/optimize-images.mjs
```

Expected output (approximate — exact sizes will vary):

```
Converting 7 images to WebP (quality 82)…

File                              Before    After   Saved
────────────────────────────────────────────────────────────
fashion.jpg                        1.0MB    ~90KB     91%
logo.png                           104KB    ~25KB     76%
lujototal-cert.png                 421KB    ~70KB     83%
partner.jpg                        5.5MB   ~200KB     96%
realEstate.jpg                     5.9MB   ~220KB     96%
travel.jpg                         7.8MB   ~280KB     96%
watches.jpg                        1.9MB   ~130KB     93%

Done. Originals preserved — delete them after verifying the site.
```

- [ ] **Step 3: Verify WebP files were created**

```bash
ls public/images/*.webp
```

Expected: 7 `.webp` files listed.

---

## Task 2: Update image refs — Hero and CategoryTeaser

**Files:**
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/CategoryTeaser.tsx`

- [ ] **Step 1: Update `Hero.tsx` IMAGES array**

In `components/home/Hero.tsx`, replace the `IMAGES` constant:

```tsx
const IMAGES = [
  { src: '/images/realEstate.webp', alt: 'Luxury real estate' },
  { src: '/images/watches.webp',    alt: 'Luxury watches' },
  { src: '/images/travel.webp',     alt: 'Luxury travel' },
  { src: '/images/fashion.webp',    alt: 'Luxury fashion' },
];
```

- [ ] **Step 2: Update `CategoryTeaser.tsx` ITEMS image fields**

In `components/home/CategoryTeaser.tsx`, replace the `image` values in the `ITEMS` array:

```tsx
const ITEMS = [
  {
    key: 'Propiedades y Bienes Raíces de Lujo',
    nameEn: 'Luxury Properties & Real Estate',
    image: '/images/realEstate.webp',
    phraseEn: 'Luxury is owning a space that defines you.',
    phraseEs: 'El lujo es poseer un espacio que te define.',
  },
  {
    key: 'Joyería, Relojería y Metales Preciosos',
    nameEn: 'Jewellery, Watches & Precious Metals',
    image: '/images/watches.webp',
    phraseEn: 'Luxury is wearing something that survives generations.',
    phraseEs: 'El lujo es llevar algo que sobrevive generaciones.',
  },
  {
    key: 'Viajes, Turismo, Destinos y Alojamientos',
    nameEn: 'Travel, Tourism & Destinations',
    image: '/images/travel.webp',
    phraseEn: 'Luxury is sleeping somewhere that changes your sense of time.',
    phraseEs: 'El lujo es dormir en un lugar que cambia tu sentido del tiempo.',
  },
  {
    key: 'Moda, Accesorios y Alta Costura',
    nameEn: 'Fashion, Accessories & Haute Couture',
    image: '/images/fashion.webp',
    phraseEn: "Luxury is dressing for who you're becoming.",
    phraseEs: 'El lujo es vestirte para quien estás llegando a ser.',
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add scripts/optimize-images.mjs public/images/*.webp components/home/Hero.tsx components/home/CategoryTeaser.tsx
git commit -m "feat: add WebP images and update Hero/CategoryTeaser refs"
```

---

## Task 3: Update image refs — remaining components

**Files:**
- Modify: `components/home/PartnerValue.tsx`
- Modify: `components/home/LujoTotal.tsx`
- Modify: `components/layout/Nav.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `components/about/MissionVision.tsx`

- [ ] **Step 1: Update `PartnerValue.tsx`**

In `components/home/PartnerValue.tsx`, change:
```tsx
src={assetPath('/images/partner.jpg')}
```
to:
```tsx
src={assetPath('/images/partner.webp')}
```

- [ ] **Step 2: Update `LujoTotal.tsx`**

In `components/home/LujoTotal.tsx`, change:
```tsx
src={assetPath('/images/lujototal-cert.png')}
```
to:
```tsx
src={assetPath('/images/lujototal-cert.webp')}
```

- [ ] **Step 3: Update `Nav.tsx`**

In `components/layout/Nav.tsx`, change both occurrences of:
```tsx
src={assetPath('/images/logo.png')}
```
to:
```tsx
src={assetPath('/images/logo.webp')}
```
(There are two — one in the desktop nav `<Link>`, one in the mobile drawer `<div className={styles.drwLogo}>`)

- [ ] **Step 4: Update `Footer.tsx`**

In `components/layout/Footer.tsx`, change:
```tsx
src={assetPath('/images/logo.png')}
```
to:
```tsx
src={assetPath('/images/logo.webp')}
```

- [ ] **Step 5: Update `MissionVision.tsx`**

In `components/about/MissionVision.tsx`, change:
```tsx
src={assetPath('/images/partner.jpg')}
```
to:
```tsx
src={assetPath('/images/partner.webp')}
```

- [ ] **Step 6: Commit**

```bash
git add components/home/PartnerValue.tsx components/home/LujoTotal.tsx components/layout/Nav.tsx components/layout/Footer.tsx components/about/MissionVision.tsx
git commit -m "feat: update remaining components to use WebP images"
```

---

## Task 4: Hero slideshow lazy mounting

**Files:**
- Modify: `components/home/Hero.tsx`

- [ ] **Step 1: Update the slide render in `Hero.tsx`**

Replace the `{IMAGES.map(…)}` block inside `<div className={styles.right}>`:

Current code (lines ~47–62):
```tsx
{IMAGES.map((img, i) => (
  <div
    key={img.src}
    className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
  >
    <Image
      src={assetPath(img.src)}
      alt={img.alt}
      fill
      sizes="50vw"
      className={styles.img}
      priority={i === 0}
    />
  </div>
))}
```

Replace with:
```tsx
{IMAGES.map((img, i) => {
  const mounted = i === active || i === (active + 1) % IMAGES.length;
  return (
    <div
      key={img.src}
      className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
    >
      {mounted && (
        <Image
          src={assetPath(img.src)}
          alt={img.alt}
          fill
          sizes="50vw"
          className={styles.img}
          priority={i === 0}
        />
      )}
    </div>
  );
})}
```

- [ ] **Step 2: Start dev server and verify the hero slideshow**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- Slide 0 renders immediately with the real estate image.
- After 4.5 seconds, slide 1 (watches) fades in with no blank flash.
- After another 4.5 seconds, slide 2 (travel) fades in cleanly.
- After another 4.5 seconds, slide 3 (fashion) fades in cleanly.
- The cycle wraps back to slide 0 without a blank flash.

- [ ] **Step 3: Check the rest of the site visually**

Still with dev server running, visit:
- `http://localhost:3000/` — confirm logo in nav and footer renders.
- `http://localhost:3000/dominios` — confirm CategoryTeaser carousel images render.
- `http://localhost:3000/nosotros` — confirm partner image renders in MissionVision.
- `http://localhost:3000/colaborar` — confirm partner image renders in PartnerValue.

- [ ] **Step 4: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "perf: lazy-mount off-screen hero slideshow images"
```

---

## Task 5: Build check and remove originals

- [ ] **Step 1: Run a production build**

```bash
npm run build
```

Expected: build completes with no errors. The `out/` directory is generated.

- [ ] **Step 2: Remove original image files**

```bash
git rm public/images/fashion.jpg public/images/logo.png public/images/lujototal-cert.png public/images/partner.jpg public/images/realEstate.jpg public/images/travel.jpg public/images/watches.jpg
```

- [ ] **Step 3: Rebuild to confirm originals are not referenced**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Final commit**

```bash
git commit -m "chore: remove original JPG/PNG files, WebP conversion complete"
```
