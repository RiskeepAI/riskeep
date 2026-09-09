# Optimización de rendimiento — riskeep.com

Metodología: build de producción (`next build && next start`) medido con
Lighthouse CLI local contra Chrome headless — mobile con throttling
simulado (4x CPU / red lenta, el mismo modelo que usa PageSpeed Insights),
desktop sin throttling. **Cada número "antes/después" de esta tabla es la
mediana de 3 ejecuciones independientes**, no una sola pasada — la primera
medición que hice salió sensiblemente peor que las 3 siguientes (ver nota
de honestidad más abajo), así que una sola pasada no es fiable para este
sitio.

## 19. Métricas — antes / después

### Performance Mobile (simulado, mediana de 3 runs)

| Métrica | Antes | Después |
|---|---|---|
| **Performance score** | 86 | **89** |
| **LCP** | 4.14 s | **3.81 s** (‑330 ms, ‑8%) |
| FCP | 1.21 s | 1.21 s (sin cambio) |
| CLS | 0.008 | 0.008 (sin cambio, ya estaba bien) |
| TBT | 23 ms | 21 ms (ya estaba bajo) |
| Speed Index | 1.21 s | 1.21 s (sin cambio) |
| INP | no medible en lab (requiere campo real / CrUX) | — |
| JS transfer (payload total) | 795 KiB | **712 KiB** (‑83 KiB, ‑10%) |
| JS no utilizado | 223 KB | **171 KB** (‑52 KB, ‑23%) |
| DOM nodes | 1028 | 1028 (sin cambio — ver §13 no aplicado) |
| Total payload | 795 KiB | **712 KiB** |
| Forced reflow | no aislado como métrica propia en este Lighthouse | — |
| Long tasks (TBT como proxy) | 23 ms | 21 ms |

### Performance Desktop (sin throttling)

| Métrica | Antes | Después |
|---|---|---|
| Performance score | 99 | 99 (ya casi perfecto sin throttling — ver nota) |
| LCP | 0.9 s | 0.9 s |
| FCP | 0.3 s | 0.3 s |
| CLS | 0.012 | 0.012 |
| Total payload | 823 KiB | **795 KiB** (‑28 KiB) |
| Accessibility score | 92 | 92 (agregado sin cambio — ver nota de contraste) |

### La prueba directa de la causa raíz del LCP (nivel de traza, no agregado)

Esto es lo más importante de todo el informe: el elemento LCP real,
identificado por la propia traza de Chrome, es la palabra **"opera"**
dentro del `<h1>` del hero (`h1.font-heading > span > span > span.wr-word`).
Antes de tocar nada, ese nodo tardaba **852 ms** en volverse visible
después de que el navegador ya podía pintarlo (`elementRenderDelay`).
Después del fix, **176 ms** — una reducción del 79%. Esta es la prueba
directa de que la causa raíz identificada en la Fase 1 (texto oculto vía
`opacity:0` hasta que React hidrata + un `IntersectionObserver` +
`setTimeout` lo revela) era correcta y el fix la resuelve.

La métrica LCP *agregada* (4.14s→3.81s) mejora menos que ese 79% porque
bajo *simulación* de red/CPU móvil lenta, gran parte de esos 3.8s
restantes es tiempo estimado de descarga de CSS/JS que bloquea el primer
pintado — un cuello de botella **distinto** (ver §13 CSS render-blocking,
no aplicado) que la mejora del LCP-delay no toca.

### Nota de honestidad sobre la metodología

Mi primera medición "antes" salió con score 77 y LCP 6.4s — mucho peor
que las 3 mediciones siguientes en el mismo código sin tocar (86, 86, 86;
LCP ~4.14s las tres). Fue un outlier de arranque en frío, no el estado
real del sitio. Descarté ese primer run y usé la mediana de las 3
consistentes como el "antes" real. Lo dejo documentado en vez de callarlo
porque el propio encargo pedía explícitamente no dar por buena una mejora
sin medir de verdad — y una sola pasada de Lighthouse no es suficiente
para afirmar nada con esta variabilidad.

---

## 1-4. Archivos modificados

| Archivo | Cambio |
|---|---|
| `components/landing/Hero.tsx` | `WordReveal` reescrito a CSS puro (sin IntersectionObserver/setTimeout); `AnimateIn` en modo `immediate`; badge de confianza reparado (estaba permanentemente invisible); imagen de fondo → `.webp`; colores de contraste |
| `components/ui/AnimateIn.tsx` | Nueva prop `immediate` — aplica la clase de animación en el HTML servido por el servidor en vez de esperar a un `IntersectionObserver` tras la hidratación |
| `app/globals.css` | `.wr-word`/`.badge-reveal` (CSS puro); `border-spin` reescrito a `transform: rotate()` (antes animaba una custom property `--ba` dentro de un `conic-gradient`, no compositable); `.animate-shimmer` reescrito a un `::after` con `transform: translateX()` (antes animaba `background-position`); tokens `--text-muted`/`--text-dim` con contraste AA |
| `components/landing/Pricing.tsx` | `import { createClient } from '@/lib/supabase/client'` estático → `import()` dinámico dentro de `handleSubscribe` |
| `app/page.tsx` | `Ticker/Stats/HowItWorks/Features/Comparison/Pricing/FAQ/Footer` → `next/dynamic` (siguen con SSR, solo se separan en chunks aparte) |
| `app/layout.tsx` | Script de GTM: `strategy="afterInteractive"` → `"lazyOnload"` |
| `components/ui/ParticleCanvas.tsx` | El bucle `requestAnimationFrame` ahora se pausa con `IntersectionObserver` cuando el hero sale del viewport |
| `public/images/hero-bg-v3.webp` | Nuevo — mismo fondo del hero, JPEG→WebP (95.9 KB → 67.5 KB, ‑30%) |
| `package.json` | Campo `browserslist` explícito (evita polyfills de `Array.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.trimStart/trimEnd` para navegadores que ya los soportan nativamente) |

## 5. Problemas encontrados (resumen)

1. **LCP (prioridad máxima)** — el elemento LCP (`h1` del hero) se
   renderizaba con `opacity:0` en el HTML servido por el servidor, y solo
   se volvía visible tras: hidratación de React → `IntersectionObserver`
   dispara → `setTimeout` escalonado por palabra. 852ms de retraso medido
   en la traza.
2. **Badge de confianza del hero permanentemente invisible** — bug real
   encontrado de paso: usaba una `transition` CSS sobre un valor que nunca
   cambiaba (`opacity:0` de por vida, sin ningún código que lo tocara).
3. **204 KB de Supabase (94% sin usar) en el bundle inicial** — importado
   de forma estática en `Pricing.tsx` para una función (`handleSubscribe`)
   que ni siquiera está conectada al botón actualmente (el CTA real llama
   a un modal "Coming Soon"; el checkout de Stripe/Supabase está en pausa).
4. **Cero code-splitting** — las 8 secciones bajo el pliegue (`Stats`,
   `HowItWorks`, `Features`, `Comparison`, `Pricing`, `FAQ`, `Footer`, y el
   propio `Ticker`) se importaban de forma estática, mezclando su JS con
   el del hero en el bundle crítico inicial.
5. **GTM con `afterInteractive`** — competía con la hidratación inicial.
   El propio contenedor GTM carga además `gtag.js` (GA4) como tag interno
   — no encontré una segunda implementación de Analytics duplicada en el
   código; es el propio contenedor GTM quien inyecta ese script (ver §7).
6. **2 animaciones no compuestas** confirmadas: `border-spin` animaba una
   `@property` custom dentro de un `conic-gradient` (repinta cada frame);
   `.animate-shimmer` animaba `background-position` directamente.
7. **`ParticleCanvas`** — bucle `requestAnimationFrame` con O(n²) de
   conexiones entre partículas corriendo indefinidamente incluso con el
   hero fuera de pantalla.
8. **Contraste real fallando** en `#3d4f6e`/`#6b768b` a 10-14px (footer,
   disclaimer de riesgo) — 2.49:1 y 4.45:1 respectivamente contra el fondo
   oscuro, por debajo del 4.5:1 exigido a texto pequeño.
9. **Peso de imagen de hero** — JPEG de 95.9 KB sin conversión a
   WebP/AVIF; confirmado por traza que **no** es el elemento LCP (el h1 lo
   es), así que no se le añadió `preload`/`fetchpriority` — hacerlo habría
   competido por ancho de banda con lo que sí es crítico.

## 6. Componentes hechos lazy

`Ticker`, `Stats`, `HowItWorks`, `Features`, `Comparison`, `Pricing`,
`FAQ`, `Footer` — todos vía `next/dynamic()` con SSR activado (siguen
apareciendo en el HTML inicial para SEO y sin JS; solo se separan en
chunks que cargan fuera de la ruta crítica).

## 7. Client Components → Server Components

**Ninguno se convirtió.** Evalué cada sección (`Comparison.tsx` y
`Footer.tsx` solo usan `useT()`, sin ningún otro hook — en teoría
candidatos "limpios") pero **no lo hice**: el selector de idioma actual es
100% cliente (React Context), y convertir esas secciones a Server
Components con el locale por defecto resuelto en servidor **rompería el
cambio de idioma instantáneo** en esas secciones — exactamente el tipo de
regresión funcional que se pidió evitar. Lo documento como oportunidad
real pero de mayor alcance (§13).

## 8. JS eliminado o retrasado

- **Supabase (~204 KB, 94% sin usar)**: eliminado del bundle inicial vía
  `import()` dinámico — solo se descarga si el usuario llega a pulsar el
  CTA de pago (y ahora mismo ni siquiera entonces, porque el botón real
  abre un modal).
- **GTM**: de `afterInteractive` a `lazyOnload` (carga en tiempo de
  inactividad del navegador, no compite con la hidratación).
- **~52 KB de JS no utilizado adicional** eliminado como efecto del
  code-splitting (223 KB → 171 KB de "unused JavaScript" total).

## 9. Cambios en GTM/Analytics

- Estrategia de carga: `afterInteractive` → `lazyOnload`.
- **No encontré una segunda implementación de Analytics duplicada** en el
  código fuente — solo existe el snippet de GTM (`GTM-M92N2PQ9`) en
  `app/layout.tsx`. El `gtag.js` (GA4, `G-8J9PLRFS5B`) que aparece en el
  informe de PageSpeed lo carga el **propio contenedor GTM** como uno de
  sus tags internos — eso vive en la consola de Google Tag Manager, no en
  este repo, así que no puedo auditar ahí si hay tags duplicados o sin
  usar. Recomendación: revisar el contenedor en tagmanager.google.com por
  si hay tags redundantes.

## 10. Cambios en CSS

- `border-spin`: de animar una `@property` (`--ba`) dentro de un
  `conic-gradient` (no compositable, repinta cada frame) a animar
  `transform: rotate()` sobre un pseudo-elemento sobredimensionado (2x)
  recortado por el `overflow-hidden` de la card — mismo efecto visual,
  ahora en el compositor.
- `.animate-shimmer`: de animar `background-position` directamente sobre
  el fondo del elemento, a un `::after` independiente animado con
  `transform: translateX()` — el fondo original del elemento (p.ej. el
  degradado ámbar de la barra de confianza del hero) ya no compite por la
  propiedad `background`.
- **No toqué** la extracción de critical CSS / CSS render-blocking (ver
  §13 — identificado pero no aplicado).

## 11. Cambios en imágenes

- `hero-bg-v3.jpg` (95.9 KB) → `hero-bg-v3.webp` (67.5 KB, ‑30%),
  confirmado por traza que **no es el LCP** por lo que no se le dio
  prioridad de carga.
- El archivo `.jpg` original se dejó en `public/images/` sin referenciar
  (fácil de borrar una vez confirmado en producción, lo dejo como red de
  seguridad para revertir con un solo cambio).

## 12. Cambios en animaciones

Ver §10 (`border-spin`, `shimmer`) + `ParticleCanvas` ahora se pausa vía
`IntersectionObserver` cuando el hero no está en viewport (antes corría
el bucle `requestAnimationFrame` con conexiones O(n²) entre partículas
indefinidamente). `prefers-reduced-motion` ampliado para cubrir las dos
animaciones nuevas (`.wr-word`, `.badge-reveal`).

## 13. Cambios en DOM

**Ninguno.** DOM nodes se mantiene en 1028 antes y después — no toqué la
estructura del ticker/dashboard mockup. Ver "Qué NO apliqué" abajo.

## 14. Cambios en fuentes

- `Public Sans`: quité el peso `300` (light) — confirmado por grep que no
  se usa en ningún sitio (`font-light`, ni `fontWeight: 300` inline).
- No toqué IBM Plex Mono ni Space Grotesk — verificar su uso real de cada
  peso requeriría más tiempo del que tenía sentido invertir para el ahorro
  esperado.

## Polyfills / JS antiguo

Añadido `browserslist` explícito en `package.json`
(`"> 0.3%", "not dead", "not op_mini all", "not ie 11"`) — sin esto,
Next.js/SWC no tenía forma de saber que podía omitir los polyfills de
`Array.at/flat/flatMap`, `Object.fromEntries/hasOwn`,
`String.trimStart/trimEnd` que el informe original detectó (~13.9 KB).

## Accesibilidad — nota importante, no completamente resuelto

Arreglé los dos colores que el encargo nombró explícitamente
(`#3d4f6e`→`#6b7ba6`, `#6b768b`→`#7d87a3`, ambos ahora ≥4.5:1). El
`color-contrast` de Lighthouse bajó de **44 → 25** elementos fallando. Los
25 restantes son **todos** las etiquetas microscópicas (5-7px) dentro de
la réplica del dashboard del hero (`text-slate-500`/`text-slate-600` de
Tailwind, no los tokens que arreglé) — es contenido decorativo pensado
para leerse como "textura de captura de pantalla", no como texto
funcional, y subir el contraste de cada una individualmente sin
enturbiar visualmente esa réplica es un trabajo de diseño aparte que no
entra en lo que se pidió. Lo dejo señalado, no lo he tocado.

## 13 (bis). Qué NO apliqué y por qué

1. **CSS render-blocking (~410ms estimados de ahorro, confirmado por
   traza real como el mayor cuello de botella que queda)** — Next.js App
   Router no tiene extracción de critical-CSS integrada (la antigua opción
   `experimental.optimizeCss` con Critters está desaconsejada/rota).
   Hacerlo bien a mano (separar CSS crítico del hero e inyectarlo inline,
   diferir el resto) es factible pero es un cambio de arquitectura del
   pipeline de CSS con riesgo real de FOUC si se hace deprisa — preferí no
   improvisarlo en esta pasada.
2. **Convertir `Comparison`/`Footer` a Server Components** — técnicamente
   posible (solo usan `useT()`), pero el selector de idioma es 100%
   cliente hoy; hacerlo sin rediseñar el i18n rompería el cambio de idioma
   instantáneo en esas secciones. Detallado en §7.
3. **Reducción de nodos DOM (1028, profundidad 17)** — no toqué la
   duplicación del ticker (`[...items, ...items]`, técnica estándar para
   marquee infinito, coste real pequeño) ni la réplica del dashboard del
   hero (la sección más densa). Reestructurarla para usar menos nodos es
   viable pero es un rediseño visual, no until ajuste de rendimiento
   puntual, y no quería arriesgar el diseño sin confirmarlo contigo antes.
4. **Contraste de las 25 etiquetas microscópicas del mockup del hero** —
   ver nota de accesibilidad arriba.
5. **Auditoría de tags dentro del contenedor GTM** — vive en la consola de
   Google Tag Manager, fuera del repo; no puedo verificar duplicados desde
   aquí.

## Validación

`npm run build` pasa limpio (TypeScript sin errores). Verificado
visualmente en Chrome tras cada cambio — hero, sección de comparación,
FAQ, footer — sin regresiones visuales. Todas las cifras de esta tabla
vienen de Lighthouse real contra un build de producción, mediana de 3
ejecuciones por configuración.
