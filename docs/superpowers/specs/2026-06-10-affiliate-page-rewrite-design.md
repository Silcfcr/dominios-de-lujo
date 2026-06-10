---
name: affiliate-page-rewrite
description: Reescritura narrativa de /servicios/afiliados para posicionar DdL ante brand managers de marcas de lujo que evalúan aprobar links de afiliados
metadata:
  type: project
---

# Diseño: Reescritura narrativa de /servicios/afiliados

## Contexto y problema

La página `/servicios/afiliados` está escrita en tono de performance marketing — habla de "tráfico cualificado listo para convertir", usa el eyebrow "Servicio principal" (clasificación interna sin valor de posicionamiento) y muestra stats que no coinciden con los del home (`4.000+ / 20 / 146` vs `+4.000 / 650M / 24`).

El objetivo real de la página es convencer a **brand managers de marcas de lujo** de que:
1. Inicien contacto directo (A)
2. Aprueben la solicitud de afiliados cuando llegue desde una red como Awin/Rakuten (B)

Ese perfil no compra con métricas de performance. Compra con reputación, autoridad editorial y confianza de marca. La plataforma debe hablar desde identidad y certeza, nunca desde comparación o defensa.

## Alcance

**Solo copy e i18n** — no cambian la estructura de componentes, el CSS, ni el layout visual. El único cambio de datos es la alineación de stats.

**No se toca:** `PartnerValue` (estructura sólida, copy ya funciona bien), CSS de cualquier sección, JSX estructural de `page.tsx`.

## Principios de tono

- Hablar desde autoridad, no desde necesidad
- Segunda persona dirigida al brand manager: *tu marca, tu audiencia, tu equipo*
- Declarativo, no comparativo — DdL no se compara con nadie ni se justifica
- Luxury with Purpose: calidad como filosofía, no como garantía de seguridad
- Sin lenguaje de performance marketing: nada de "conversiones", "CTR", "tráfico cualificado"

## Arco narrativo

Las secciones siguen el orden: **Audiencia → Autoridad → Escala**

Cada pilar responde a una pregunta implícita del brand manager:
1. *¿Llegan mis clientes aquí?* → Audiencia
2. *¿Mi marca está en buenas manos?* → Autoridad (LujoTotal™ como estándar de calidad)
3. *¿Vale la pena la asociación?* → Escala (4.000+ dominios, 50+ verticales)

---

## Cambios sección por sección

### 1. Hero

**Keys afectadas:** `servicios.affiliateEyebrow`, `servicios.affiliateHeroTitle`, `servicios.affiliateHeroSub`

| Campo | Actual | Propuesto |
|---|---|---|
| Eyebrow | "Servicio principal" | "Para marcas de lujo" |
| Title | "La plataforma editorial de lujo en español — conectando marcas con audiencias de alta intención a través de 4.000+ dominios exactos premium unificados bajo LujoTotal™" (25 palabras) | ~12 palabras, declarativo, perspectiva de la marca. Ejemplo: *"El ecosistema editorial donde tu marca accede al consumidor hispanohablante de lujo."* |
| Sub | "Conectamos marcas premium con compradores de lujo en todo el mundo hispanohablante. Tráfico orgánico cualificado, audiencias con intención de compra real." | Abrir con el gap de audiencia: 650 millones de hispanohablantes de alto poder adquisitivo en un ecosistema editorial construido exclusivamente para ellos. Sin mencionar "tráfico" ni "conversiones". |

---

### 2. Stats bar

**Cambio en JSX de `page.tsx`** (números hardcodeados) + **keys `servicios.stat1Label`, `servicios.stat2Label`, `servicios.stat3Label`** en ambos JSON

| Stat | Actual | Propuesto |
|---|---|---|
| 1 | `4.000+` / dominios premium | `+4.000` / dominios premium en español |
| 2 | `20` / categorías de lujo | `650M` / hispanohablantes |
| 3 | `146` / dominios insignia | `50+` / verticales de lujo |

Alineación con home: misma escala de mercado, sin contradicción. El dato de países queda implícito en los 650M — no se añade un cuarto stat.

---

### 3. Propuesta de valor — Pilar Audiencia

**Keys afectadas:** `servicios.affiliateValueEyebrow`, `servicios.affiliateValueTitle`, `servicios.affiliateBody1`, `servicios.affiliateBody2`

| Campo | Propuesto |
|---|---|
| Eyebrow | "La audiencia que define el lujo en español" |
| Title | Declarativo, sin comparación. Ej: *"650 millones de hispanohablantes. Un solo ecosistema editorial pensado para ellos."* |
| Body 1 | Describir quién es esta audiencia con convicción: consumidores que buscan el lujo en su idioma, en entornos que entienden su estilo de vida. |
| Body 2 | Cómo DdL es el único espacio editorial construido para este perfil — sin comparar, declarando. |

Tono: certeza, no argumento de venta.

---

### 4. Autoridad editorial — Pilar Autoridad

**Keys afectadas:** `servicios.editorialEyebrow`, `servicios.editorialBody`

| Campo | Actual | Propuesto |
|---|---|---|
| Eyebrow | "Autoridad editorial" | "El estándar LujoTotal™" |
| Body | Autoelogio ("escribimos como verdaderas autoridades del lujo...") | LujoTotal™ como filosofía y estándar de calidad que define toda la plataforma. Tono de manifiesto. Cada dominio, cada pieza editorial, cada asociación existe bajo un único estándar de calidad. No es una garantía — es lo que DdL es. |

---

### 5. Por qué nosotros — Pilar Escala

**Keys afectadas:** `servicios.whyEyebrow`, `servicios.whyTitle`, `servicios.why1Title`–`why4Title`, `servicios.why1Desc`–`why4Desc`

| Campo | Propuesto |
|---|---|
| Eyebrow | "Una escala sin equivalente" |
| Title | "El mayor portafolio de dominios exactos de lujo en español del mundo." |
| Cards | Mantener los 4 conceptos (escala, multisectorial, ventaja pionera, intención de compra) pero con titulares más afilados y declarativos. Menos descripción, más certeza. |

---

### 6. PartnerValue

**Keys afectadas:** `partnerValue.eyebrow`, `partnerValue.cta`

| Campo | Actual | Propuesto |
|---|---|---|
| Eyebrow | "Para marcas asociadas" | "Lo que tu marca obtiene" |
| CTA | "Conviértete en afiliado" | "Iniciar la conversación" |

El resto de la sección (5 items) se mantiene — el copy ya es sólido y el argumento de integración sin fricción reduce la barrera de aprobación.

---

## i18n

Todos los cambios van a **ambos archivos**: `lib/i18n/es.json` y `lib/i18n/en.json`. El inglés sigue la misma dirección de tono y narrativa, adaptado (no traducido literalmente).

No se crean nuevas keys — solo se actualizan los valores de las existentes.

## Lo que no cambia

- Estructura JSX de `page.tsx` (salvo los 3 números hardcodeados del stats bar)
- `page.module.css`
- `PartnerValue` componente y su CSS
- Resto de secciones del home
- Keys de i18n fuera del namespace `servicios` y `partnerValue.eyebrow` / `partnerValue.cta`
