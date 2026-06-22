# Brands Page Copy Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the /brands page with the client's new copy — updating the hero, stats bar, and "Why Us" section, adding five new sections (Capacidades, Cómo Funciona, Para Quién Es, Brands CTA, FAQ), and removing the PartnerValue accordion.

**Architecture:** Inline sections in `app/brands/page.tsx` are updated in place; five new sections are extracted as proper components in `components/brands/` to keep the page file manageable. All new copy goes through i18n keys (no hardcoded strings in JSX).

**Tech Stack:** Next.js 16 static export, CSS Modules, `useI18n()` from `lib/i18n/context.tsx`, `RevealWrapper` for scroll animations.

## Global Constraints

- Every key added to `es.json` must have a matching key in `en.json` — no exceptions
- No hardcoded copy in JSX — all visible strings go through `t()`
- All CSS uses design tokens (`var(--ink)`, `var(--gold)`, `var(--fb)`, etc.) — no hardcoded hex/rgb
- All new Client Components start with `'use client'`
- Use global utility classes: `sec` (section padding), `s-eye` (eyebrow), `s-title` (heading), `btn-dark`/`btn-gold`/`btn-outline` (buttons), `s-hd` (centered heading block), `RevealWrapper` (scroll animation)
- Run `npx tsc --noEmit` after every task
- Validate JSON after every task: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/es.json','utf8'))" && node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8'))"`

---

## Current vs. Target Brands Page Sections

| Order | Current | After Refresh |
|---|---|---|
| 1 | Hero | Hero (copy + structure updated) |
| 2 | Stats Bar (3 stats, hardcoded numbers) | Stats Bar (4 stats, keys-driven numbers) |
| 3 | Value Proposition | Value Proposition (UNCHANGED) |
| 4 | Editorial Authority (dark) | Editorial Authority (UNCHANGED) |
| 5 | Why Us grid (4 cards) | "Lo que ofrecemos" (5 cards, all new copy) |
| 6 | PartnerValue accordion | BrandsCapacidades **(NEW)** |
| 7 | — | BrandsComoFunciona **(NEW)** |
| 8 | — | BrandsParaQuienEs **(NEW)** |
| 9 | — | BrandsCta **(NEW)** |
| 10 | — | BrandsFaq **(NEW)** |

---

## Task 1: All i18n updates for Brands page

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

**What to change:**

### servicios namespace — hero keys

| Key | New ES | New EN |
|---|---|---|
| `servicios.affiliateHeroTitle` | "Su marca, en el lugar donde vive el lujo en español." | "Your brand, placed where luxury lives online." |
| `servicios.affiliateHeroSub1` *(rename from affiliateHeroSub)* | "Dominios de Lujo es el mayor portafolio de dominios exactos de lujo en español — más de 4.000 propiedades premium que alcanzan a 650 millones de hispanohablantes en 18+ mercados. El canal que el lujo en español no tenía. Invitamos a marcas de lujo a unirse a nuestra red de afiliados en los mercados de habla hispana." | "Dominios de Lujo is the largest portfolio of exact-match luxury domains in Spanish — over 4,000 premium properties reaching 650 million Spanish speakers across 18+ markets. We connect world-class brands with high-net-worth audiences through a curated editorial affiliate platform built exclusively for the luxury segment." |
| `servicios.affiliateHeroSub2` *(new)* | "Conectamos marcas de clase mundial con audiencias de alto poder adquisitivo a través de una red editorial de afiliados diseñada exclusivamente para el segmento de lujo." | *(not needed — EN uses single paragraph)* — set to `""` |
| `servicios.affiliateHeroClosing` *(new)* | "Si tu marca pertenece a la conversación del lujo, aquí es donde debe estar." | "If your brand belongs in the luxury conversation, this is where it should be." |

> Note: `servicios.affiliateHeroSub` (the old single-paragraph key) is renamed to `servicios.affiliateHeroSub1`. Remove the old `affiliateHeroSub` key.

### servicios namespace — stats bar keys

Add stat number keys (currently hardcoded in JSX) and update labels:

| Key | New ES | New EN |
|---|---|---|
| `servicios.stat1Num` *(new)* | "4.000+" | "4,000+" |
| `servicios.stat1Label` | "dominios exactos de lujo en español" | "exact luxury domains in Spanish" |
| `servicios.stat2Num` *(new)* | "650M" | "650M" |
| `servicios.stat2Label` | "consumidores hispanohablantes" | "Spanish-speaking consumers" |
| `servicios.stat3Num` *(new)* | "18+" | "18+" |
| `servicios.stat3Label` | "mercados en España y Latinoamérica" | "markets across Spain & Latin America" |
| `servicios.stat4Num` *(new)* | "15+" | "15+" |
| `servicios.stat4Label` *(new)* | "verticales de lujo cubiertos" | "luxury verticals covered" |

### servicios namespace — "Lo que ofrecemos" (was "Why Us")

| Key | New ES | New EN |
|---|---|---|
| `servicios.whyEyebrow` | "Lo que ofrecemos" | "What we offer" |
| `servicios.whyTitle` | "Por qué las marcas de lujo eligen nuestra plataforma" | "Why leading luxury brands choose our platform" |
| `servicios.why1Title` | "Autoridad de dominio premium" | "Premium domain authority" |
| `servicios.why1Desc` | "Su marca aparece en dominios premium exactos que ya posicionan para las búsquedas más valiosas del lujo en español." | "Your brand featured on exact-match premium domains that rank for the searches your customers are already making." |
| `servicios.why2Title` | "Audiencia cualificada" | "Qualified audience" |
| `servicios.why2Desc` | "Nuestros lectores llegan con intención real de compra — no son visitantes ocasionales." | "Readers who arrive at our websites are actively seeking luxury products and experiences — not casual browsers." |
| `servicios.why3Title` | "Modelo basado en resultados" | "Performance-based model" |
| `servicios.why3Desc` | "Su inversión se vincula directamente al rendimiento: seguimiento transparente y reportes claros." | "Our affiliate structure means your investment is tied directly to results. Transparent tracking, clear reporting." |
| `servicios.why4Title` | "El espacio que el lujo en español no tenía" | "The Spanish-language gap" |
| `servicios.why4Desc` | "Somos la plataforma editorial de referencia en un mercado donde la mayoría de los canales operan en inglés." | "Most luxury digital platforms operate in English. We are the definitive luxury editorial destination in Spanish." |
| `servicios.why5Title` *(new)* | "Certificación LujoTotal™" | "LujoTotal™ Certification & Trust Framework" |
| `servicios.why5Desc` *(new)* | "Las marcas elegibles pueden optar a la Certificación LujoTotal™, nuestro marco curado de confianza y calidad diseñado para garantizar autenticidad, transparencia y coherencia de marca en todo el ecosistema Dominios de Lujo." | "Eligible brands may qualify for LujoTotal™ Certification — our curated framework of quality and trust designed to uphold authenticity, transparency, and consistent brand presentation across the Dominios de Lujo ecosystem." |

### New namespace: brandsCapacidades

**ES:**
```json
"brandsCapacidades": {
  "eyebrow": "Lo que recibe su marca",
  "title": "Las capacidades de la plataforma a su servicio",
  "card1Title": "Inteligencia y analítica de rendimiento",
  "card1Desc": "Acceso completo a métricas de tráfico, clics, conversiones y rendimiento para optimizar resultados en tiempo real.",
  "card2Title": "Visibilidad Multicanal",
  "card2Desc": "Conecta con consumidores de alto valor a través de un ecosistema de contenido premium y dominios especializados. Aumente la visibilidad de su marca, fortalezca los puntos de contacto con el cliente y acompañe su proceso de decisión de compra dentro del mundo del lujo.",
  "card3Title": "Contenido editorial y posicionamiento",
  "card3Desc": "Creamos contenido editorial de lujo que respalda nuevos verticales o dominios y construye visibilidad sostenida.",
  "card4Title": "Promoción en redes sociales",
  "card4Desc": "Extendemos su presencia con promoción activa en redes sociales para maximizar el alcance de cada campaña."
}
```

**EN:**
```json
"brandsCapacidades": {
  "eyebrow": "What your brand receives",
  "title": "Platform capabilities at your service",
  "card1Title": "Performance Intelligence & Analytics",
  "card1Desc": "Full access to traffic, clicks, conversions, affiliate performance, and campaign insights. Complete visibility to measure, compare, and optimise results in real time.",
  "card2Title": "Multichannel Visibility",
  "card2Desc": "Amplify your brand presence across our luxury ecosystem through strategically connected content, recommendations, and placements that help you reach high-intent audiences at multiple stages of the customer journey.",
  "card3Title": "Editorial Content & Strategic Positioning",
  "card3Desc": "For new verticals or domains, we collaborate with your brand to create luxury editorial content that supports the launch and builds long-term visibility.",
  "card4Title": "Social Media Promotion",
  "card4Desc": "We extend your presence beyond the editorial ecosystem with active social media promotion across multiple channels to maximise the reach of every campaign."
}
```

### New namespace: brandsComoFunciona

**ES:**
```json
"brandsComoFunciona": {
  "eyebrow": "Cómo funciona",
  "title": "Unirse a la plataforma es sencillo",
  "step1Title": "Póngase en contacto",
  "step1Desc": "Póngase en contacto con nuestro equipo para conversar sobre su marca. Evaluamos posibles colaboraciones para garantizar la alineación con nuestros estándares editoriales y las expectativas de nuestra audiencia.",
  "step2Title": "Encontramos el encaje ideal",
  "step2Desc": "Nuestro equipo identifica los dominios y verticales donde su marca tendrá mejor desempeño — viajes, moda, bienes raíces, wellness y más.",
  "step3Title": "Lanzamiento con contenido editorial de lujo",
  "step3Desc": "Integramos su marca en nuestro ecosistema editorial con contenido que cumple los estándares del lujo: refinado, creíble y orientado a la conversión. Cuando corresponde, desarrollamos experiencias editoriales y digitales a medida diseñadas para potenciar iniciativas estratégicas de marca y fortalecer su posicionamiento a largo plazo.",
  "step4Title": "Escalamos juntos",
  "step4Desc": "A medida que se acumulan datos de desempeño, ampliamos su presencia en los dominios relevantes de la plataforma editorial premium."
}
```

**EN:**
```json
"brandsComoFunciona": {
  "eyebrow": "How it works",
  "title": "Joining the platform is straightforward",
  "step1Title": "Get in touch",
  "step1Desc": "Contact our team to discuss your brand. We assess potential collaborations to ensure alignment with our editorial standards and audience expectations.",
  "step2Title": "We find the right fit",
  "step2Desc": "Our team identifies the domains and verticals where your brand will perform best — travel, fashion, real estate, wellness, and more.",
  "step3Title": "Go live with luxury editorial content",
  "step3Desc": "Your brand is integrated into our editorial ecosystem with content that meets luxury standards — refined, credible, and conversion-focused. Where appropriate, our team can develop bespoke editorial content and tailored digital experiences that elevate strategic brand initiatives and strengthen long-term positioning.",
  "step4Title": "Scale",
  "step4Desc": "As performance data builds, we expand your presence across relevant domains within the premium editorial platform."
}
```

### New namespace: brandsParaQuienEs

**ES:**
```json
"brandsParaQuienEs": {
  "eyebrow": "Para quién es",
  "title": "Diseñado para marcas que toman en serio el mercado hispanohablante",
  "body1": "Ya sea que su marca sea una casa de lujo global que busca fortalecer su presencia en España y América Latina, o una marca premium preparada para ingresar al mercado por primera vez, Dominios de Lujo ofrece una combinación única de autoridad editorial, alianzas estratégicas, visibilidad premium y acceso a audiencias hispanohablantes de alto valor.",
  "body2": "Trabajamos con marcas de viajes, hospitalidad, joyería, moda, automotriz, bienes raíces, y otros sectores afines al lujo."
}
```

**EN:**
```json
"brandsParaQuienEs": {
  "eyebrow": "Who this is for",
  "title": "Built for brands that take the Spanish-speaking market seriously",
  "body1": "Whether your brand is a global luxury house seeking to strengthen its presence in Spain and Latin America, or a premium brand ready to enter the market for the first time, Dominios de Lujo offers a unique combination of editorial authority, strategic partnerships, premium visibility, and access to high-value Spanish-speaking audiences.",
  "body2": "We work with brands across travel, hospitality, jewellery, fashion, automotive, real estate, and other sectors that align with the luxury market."
}
```

### New namespace: brandsCta

**ES:**
```json
"brandsCta": {
  "eyebrow": "Alianzas y Visibilidad de Marca",
  "title": "¿Listo para fortalecer la presencia de su marca dentro del mercado de lujo hispanohablante?",
  "subtitle": "Revisamos cada consulta para identificar las oportunidades más estratégicas y alineadas con los objetivos de su marca.",
  "body": "Explore alianzas de afiliación cuidadosamente seleccionadas, espacios publicitarios premium, contenido patrocinado, colaboraciones editoriales y experiencias de marca a medida dentro del ecosistema Dominios de Lujo, diseñadas para conectar su marca con consumidores hispanohablantes de alto valor en España y América Latina.",
  "cta": "Contáctenos",
  "note": "Nuestro equipo responde a todas las consultas en un plazo máximo de 14 días hábiles."
}
```

**EN:**
```json
"brandsCta": {
  "eyebrow": "Partnerships & Brand Visibility",
  "title": "Ready to increase your brand's presence in the Spanish-speaking luxury market?",
  "subtitle": "We evaluate every inquiry to identify the most strategic opportunities for your brand.",
  "body": "Explore curated affiliate partnerships, premium advertising placements, sponsored content, and editorial collaborations across the Dominios de Lujo ecosystem — designed to connect your brand with high-value Spanish-speaking consumers.",
  "cta": "Contact Us",
  "note": "Our team responds to all inquiries within 14 business days."
}
```

### New namespace: brandsFaq

**ES:**
```json
"brandsFaq": {
  "heading": "Lo que las marcas suelen preguntar.",
  "q1": "¿Qué tipo de marcas pueden unirse a la plataforma?",
  "a1": "Trabajamos con marcas establecidas en el segmento premium y de lujo en cualquier vertical — viajes, moda, joyería, hospitalidad, automotriz, bienes raíces, wellness y más. El requisito principal es alineación con los estándares editoriales y de audiencia de la plataforma.",
  "q2": "¿Cómo funciona el modelo de afiliados?",
  "a2": "Su marca se integra editorialmente en los dominios relevantes de nuestra red. Cada conversión generada desde nuestras propiedades se atribuye con precisión. Solo paga por resultados reales.",
  "q3": "¿Operan solo en España o también en Latinoamérica?",
  "a3": "Nuestra red cubre más de 18 mercados hispanohablantes, incluyendo España, México, Colombia, Argentina, Chile y más. Podemos activar su marca de forma global o focalizada por mercado según su estrategia.",
  "q4": "¿Cuánto tiempo tarda en estar activa mi marca?",
  "a4": "El proceso de integración toma entre 2 y 4 semanas desde la aprobación de la solicitud, dependiendo del alcance y los dominios asignados."
}
```

**EN:**
```json
"brandsFaq": {
  "heading": "What brands usually ask.",
  "q1": "What types of brands can join the platform?",
  "a1": "We work with established brands in the premium and luxury segment across any vertical — travel, fashion, jewellery, hospitality, automotive, real estate, wellness, and more. The primary requirement is alignment with the platform's editorial and audience standards.",
  "q2": "How does the affiliate model work?",
  "a2": "Your brand is editorially integrated into the relevant domains in our network. Every conversion generated from our properties is attributed with precision. You only pay for real results.",
  "q3": "Do you only operate in Spain or also in Latin America?",
  "a3": "Our network covers more than 18 Spanish-speaking markets, including Spain, Mexico, Colombia, Argentina, Chile, and more. We can activate your brand globally or focused by market according to your strategy.",
  "q4": "How long does it take for my brand to go live?",
  "a4": "The integration process takes between 2 and 4 weeks from approval, depending on the scope and domains assigned."
}
```

**Verification steps:**
- [ ] Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/es.json','utf8')); console.log('ES valid')"`
- [ ] Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); console.log('EN valid')"`
- [ ] Confirm both outputs say "valid" (no thrown errors)
- [ ] Commit: `i18n: brands page copy refresh — servicios updates + new namespaces`

---

## Task 2: Hero + Stats Bar update in brands/page.tsx

**Files:**
- Modify: `app/brands/page.tsx`
- Modify: `app/brands/page.module.css` (add `.heroSub2`, `.heroClosing` if needed)

**Read the file first** to understand exact line numbers. Then apply:

### Hero JSX changes

The current hero has `<p className={styles.heroSub}>{t('servicios.affiliateHeroSub')}</p>`.

Replace with (keep same CSS classnames, just add more paragraphs):
```tsx
<p className={styles.heroSub}>{t('servicios.affiliateHeroSub1')}</p>
{t('servicios.affiliateHeroSub2') && (
  <p className={styles.heroSub}>{t('servicios.affiliateHeroSub2')}</p>
)}
<p className={styles.heroClosing}>{t('servicios.affiliateHeroClosing')}</p>
```

Add `.heroClosing` to `page.module.css`:
```css
.heroClosing {
  font-family: var(--fd);
  font-size: clamp(16px, 1.4vw, 20px);
  font-style: italic;
  color: var(--ink2);
  margin-top: 20px;
  line-height: 1.5;
}
```

### Stats Bar JSX changes

Current structure has 3 stat blocks with hardcoded numbers. Replace with 4 stats driven by i18n:

```tsx
<div className={styles.statsBar}>
  {[
    { num: 'servicios.stat1Num', label: 'servicios.stat1Label' },
    { num: 'servicios.stat2Num', label: 'servicios.stat2Label' },
    { num: 'servicios.stat3Num', label: 'servicios.stat3Label' },
    { num: 'servicios.stat4Num', label: 'servicios.stat4Label' },
  ].map((stat, i, arr) => (
    <Fragment key={stat.num}>
      <div className={styles.stat}>
        <span className={styles.statNum}>{t(stat.num)}</span>
        <span className={styles.statLabel}>{t(stat.label)}</span>
      </div>
      {i < arr.length - 1 && <div className={styles.statDivider} aria-hidden />}
    </Fragment>
  ))}
</div>
```

Import `Fragment` from React at the top: `import { Fragment } from 'react';`

**Steps:**
- [ ] Read `app/brands/page.tsx` fully
- [ ] Update hero title key: `t('servicios.affiliateHeroTitle')` (key already exists, just update i18n value in Task 1)
- [ ] Replace single `heroSub` paragraph with sub1 + conditional sub2 + closing
- [ ] Add `.heroClosing` CSS rule to `page.module.css`
- [ ] Replace stats bar with the 4-stat mapped version using Fragment
- [ ] Add `Fragment` import if not present
- [ ] Run `npx tsc --noEmit`
- [ ] Commit: `feat: brands hero — restructure paragraphs, closing line; stats bar — 4 stats + i18n numbers`

---

## Task 3: "Lo que ofrecemos" section — 5 cards (was Why Us)

**Files:**
- Modify: `app/brands/page.tsx` (whySection block)
- Modify: `app/brands/page.module.css` (update grid for 5 cards)

**Current state:** 4-card 2×2 grid using `servicios.why1-4Title/Desc` with hardcoded numbers `0{i+1}`. All keys updated in Task 1.

**Changes needed:**
1. Add a 5th card to the CARDS array (or inline map)
2. Update the grid layout to accommodate 5 cards

Replace the current `CARDS` data (or inline map) with:
```tsx
const WHY_CARDS = [
  { num: '01', titleKey: 'servicios.why1Title', descKey: 'servicios.why1Desc' },
  { num: '02', titleKey: 'servicios.why2Title', descKey: 'servicios.why2Desc' },
  { num: '03', titleKey: 'servicios.why3Title', descKey: 'servicios.why3Desc' },
  { num: '04', titleKey: 'servicios.why4Title', descKey: 'servicios.why4Desc' },
  { num: '05', titleKey: 'servicios.why5Title', descKey: 'servicios.why5Desc' },
];
```

And render them:
```tsx
<RevealWrapper className={styles.whyGrid}>
  {WHY_CARDS.map((card) => (
    <div key={card.num} className={styles.whyCard}>
      <span className={styles.whyNum}>{card.num}</span>
      <h3 className={styles.whyCardTitle}>{t(card.titleKey)}</h3>
      <p className={styles.whyCardDesc}>{t(card.descKey)}</p>
    </div>
  ))}
</RevealWrapper>
```

Update `.whyGrid` in `page.module.css` to handle 5 cards gracefully:
```css
.whyGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .whyGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .whyGrid {
    grid-template-columns: 1fr;
  }
}
```

**Steps:**
- [ ] Read the current whySection block in `app/brands/page.tsx`
- [ ] Define `WHY_CARDS` array with 5 items (hardcoded num strings "01"–"05")
- [ ] Update `.whyGrid` CSS from 2-column to 3-column (with 2-col at 900px, 1-col at 600px)
- [ ] Run `npx tsc --noEmit`
- [ ] Commit: `feat: brands — 5-card "Lo que ofrecemos" section, 3-col grid`

---

## Task 4: New BrandsCapacidades component

**Files:**
- Create: `components/brands/BrandsCapacidades.tsx`
- Create: `components/brands/BrandsCapacidades.module.css`

Do NOT modify `app/brands/page.tsx` — wiring happens in Task 7.
Do NOT modify i18n files — all keys already exist from Task 1.

**`BrandsCapacidades.tsx`:**
```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCapacidades.module.css';

const CARDS = [
  { titleKey: 'brandsCapacidades.card1Title', descKey: 'brandsCapacidades.card1Desc' },
  { titleKey: 'brandsCapacidades.card2Title', descKey: 'brandsCapacidades.card2Desc' },
  { titleKey: 'brandsCapacidades.card3Title', descKey: 'brandsCapacidades.card3Desc' },
  { titleKey: 'brandsCapacidades.card4Title', descKey: 'brandsCapacidades.card4Desc' },
];

export default function BrandsCapacidades() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsCapacidades.eyebrow')}</p>
        <h2 className="s-title">{t('brandsCapacidades.title')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.grid}>
        {CARDS.map((c) => (
          <div key={c.titleKey} className={styles.card}>
            <h3 className={styles.cardTitle}>{t(c.titleKey)}</h3>
            <p className={styles.cardDesc}>{t(c.descKey)}</p>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
```

**`BrandsCapacidades.module.css`:**
```css
.section {
  background: var(--c2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 48px auto 0;
}

.card {
  padding: 32px 28px;
  border: 1px solid var(--rule);
  background: var(--w);
}

.cardTitle {
  font-family: var(--fb);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}

.cardDesc {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.75;
  color: var(--ink2);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Steps:**
- [ ] Create `components/brands/BrandsCapacidades.tsx` with above code
- [ ] Create `components/brands/BrandsCapacidades.module.css` with above styles
- [ ] Run `npx tsc --noEmit`
- [ ] Commit: `feat: add BrandsCapacidades component`

---

## Task 5: New BrandsComoFunciona component

**Files:**
- Create: `components/brands/BrandsComoFunciona.tsx`
- Create: `components/brands/BrandsComoFunciona.module.css`

**`BrandsComoFunciona.tsx`:**
```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsComoFunciona.module.css';

const STEPS = [
  { num: '01', titleKey: 'brandsComoFunciona.step1Title', descKey: 'brandsComoFunciona.step1Desc' },
  { num: '02', titleKey: 'brandsComoFunciona.step2Title', descKey: 'brandsComoFunciona.step2Desc' },
  { num: '03', titleKey: 'brandsComoFunciona.step3Title', descKey: 'brandsComoFunciona.step3Desc' },
  { num: '04', titleKey: 'brandsComoFunciona.step4Title', descKey: 'brandsComoFunciona.step4Desc' },
];

export default function BrandsComoFunciona() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsComoFunciona.eyebrow')}</p>
        <h2 className="s-title">{t('brandsComoFunciona.title')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.steps}>
        {STEPS.map((s) => (
          <div key={s.num} className={styles.step}>
            <span className={styles.stepNum}>{s.num}</span>
            <div className={styles.stepContent}>
              <strong className={styles.stepTitle}>{t(s.titleKey)}</strong>
              <p className={styles.stepDesc}>{t(s.descKey)}</p>
            </div>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
```

**`BrandsComoFunciona.module.css`:**
```css
.section {
  background: var(--c);
  border-top: 1px solid var(--rule);
}

.steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 64px;
  max-width: 1100px;
  margin: 48px auto 0;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.stepNum {
  font-family: var(--fd);
  font-size: 36px;
  font-weight: 300;
  color: var(--gold);
  line-height: 1;
  min-width: 44px;
  flex-shrink: 0;
}

.stepContent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stepTitle {
  font-family: var(--fb);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.02em;
}

.stepDesc {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.75;
  color: var(--ink2);
}

@media (max-width: 768px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

**Steps:**
- [ ] Create `components/brands/BrandsComoFunciona.tsx` with above code
- [ ] Create `components/brands/BrandsComoFunciona.module.css` with above styles
- [ ] Run `npx tsc --noEmit`
- [ ] Commit: `feat: add BrandsComoFunciona component`

---

## Task 6: New BrandsParaQuienEs, BrandsCta, and BrandsFaq components

**Files:**
- Create: `components/brands/BrandsParaQuienEs.tsx`
- Create: `components/brands/BrandsParaQuienEs.module.css`
- Create: `components/brands/BrandsCta.tsx`
- Create: `components/brands/BrandsCta.module.css`
- Create: `components/brands/BrandsFaq.tsx`
- Create: `components/brands/BrandsFaq.module.css`

### BrandsParaQuienEs.tsx

```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsParaQuienEs.module.css';

export default function BrandsParaQuienEs() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye lft">{t('brandsParaQuienEs.eyebrow')}</p>
        <h2 className={`s-title ${styles.heading}`}>{t('brandsParaQuienEs.title')}</h2>
        <p className={styles.body}>{t('brandsParaQuienEs.body1')}</p>
        <p className={styles.body}>{t('brandsParaQuienEs.body2')}</p>
      </RevealWrapper>
    </section>
  );
}
```

### BrandsParaQuienEs.module.css

```css
.section {
  background: var(--c2);
}

.inner {
  max-width: 800px;
  margin: 0 auto;
}

.heading {
  margin-bottom: 28px;
}

.body {
  font-family: var(--fb);
  font-size: 17px;
  line-height: 1.9;
  color: var(--ink2);
  margin-bottom: 16px;
}

.body:last-child {
  margin-bottom: 0;
}
```

### BrandsCta.tsx

```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCta.module.css';

const CONTACT = 'mailto:info@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

export default function BrandsCta() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye">{t('brandsCta.eyebrow')}</p>
        <h2 className={`s-title ${styles.title}`}>{t('brandsCta.title')}</h2>
        <p className={styles.subtitle}>{t('brandsCta.subtitle')}</p>
        <p className={styles.body}>{t('brandsCta.body')}</p>
        <div className={styles.cta}>
          <a href={CONTACT} className="btn-dark">{t('brandsCta.cta')}</a>
          <p className={styles.note}>{t('brandsCta.note')}</p>
        </div>
      </RevealWrapper>
    </section>
  );
}
```

### BrandsCta.module.css

```css
.section {
  background: var(--ink);
}

.inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.title {
  color: var(--w);
  margin: 16px 0 20px;
}

.subtitle {
  font-family: var(--fb);
  font-size: 17px;
  line-height: 1.8;
  color: rgba(250, 250, 248, 0.72);
  margin-bottom: 20px;
}

.body {
  font-family: var(--fb);
  font-size: 16px;
  line-height: 1.85;
  color: rgba(250, 250, 248, 0.6);
  margin-bottom: 36px;
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.note {
  font-family: var(--fb);
  font-size: 13px;
  color: rgba(250, 250, 248, 0.4);
  font-style: italic;
}
```

### BrandsFaq.tsx

FAQ uses an always-visible static layout (4 Q&A pairs).

```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsFaq.module.css';

const FAQ_ITEMS = [
  { q: 'brandsFaq.q1', a: 'brandsFaq.a1' },
  { q: 'brandsFaq.q2', a: 'brandsFaq.a2' },
  { q: 'brandsFaq.q3', a: 'brandsFaq.a3' },
  { q: 'brandsFaq.q4', a: 'brandsFaq.a4' },
];

export default function BrandsFaq() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <h2 className="s-title">{t('brandsFaq.heading')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.list}>
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className={styles.item}>
            <h3 className={styles.question}>{t(item.q)}</h3>
            <p className={styles.answer}>{t(item.a)}</p>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
```

### BrandsFaq.module.css

```css
.section {
  background: var(--c);
  border-top: 1px solid var(--rule);
}

.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1100px;
  margin: 48px auto 0;
}

.item {
  padding: 32px 28px;
  border: 1px solid var(--rule);
  background: var(--c2);
}

.question {
  font-family: var(--fb);
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 14px;
  line-height: 1.4;
}

.answer {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.75;
  color: var(--ink2);
}

@media (max-width: 768px) {
  .list {
    grid-template-columns: 1fr;
  }
}
```

**Steps:**
- [ ] Create all 6 files (3 `.tsx` + 3 `.module.css`) with exact code above
- [ ] Run `npx tsc --noEmit`
- [ ] Commit: `feat: add BrandsParaQuienEs, BrandsCta, BrandsFaq components`

---

## Task 7: Wire new sections into brands/page.tsx + remove PartnerValue

**Files:**
- Modify: `app/brands/page.tsx`

**Read the file first** to understand current imports and structure.

**Imports to add:**
```tsx
import BrandsCapacidades from '@/components/brands/BrandsCapacidades';
import BrandsComoFunciona from '@/components/brands/BrandsComoFunciona';
import BrandsParaQuienEs from '@/components/brands/BrandsParaQuienEs';
import BrandsCta from '@/components/brands/BrandsCta';
import BrandsFaq from '@/components/brands/BrandsFaq';
```

**Import to remove:**
```tsx
import PartnerValue from '@/components/home/PartnerValue';
```

**Render order after change:**
```tsx
{/* 1. Hero */}
{/* 2. Stats Bar */}
{/* 3. Value Proposition (UNCHANGED) */}
{/* 4. Editorial Authority (UNCHANGED) */}
{/* 5. Why Us / Lo que ofrecemos (5 cards) */}
<BrandsCapacidades />
<BrandsComoFunciona />
<BrandsParaQuienEs />
<BrandsCta />
<BrandsFaq />
{/* REMOVED: <PartnerValue /> */}
```

**Steps:**
- [ ] Read `app/brands/page.tsx`
- [ ] Add the 5 new imports
- [ ] Remove the `PartnerValue` import
- [ ] Remove `<PartnerValue />` from JSX
- [ ] Add the 5 new components in order after the whySection
- [ ] Run `npx tsc --noEmit`
- [ ] Verify no TypeScript errors
- [ ] Commit: `feat: wire brands page — add 5 new sections, remove PartnerValue accordion`

---

## Verification

After all tasks:
1. `npm run dev` — Browse to `localhost:3000/brands`, walk through all sections top to bottom
2. Toggle language to EN — all sections switch correctly
3. Check stats bar shows 4 stats with correct numbers (4.000+, 650M, 18+, 15+)
4. Verify "Lo que ofrecemos" shows 5 cards in a 3-column grid
5. Verify PartnerValue accordion is gone
6. `npx tsc --noEmit` — no errors
7. `npm run lint` — no new errors (pre-existing lint errors in context.tsx are known)
8. `npm run build` — static export succeeds
