# Riskeep — Contexto de la web (para marketing / contenido / estrategia)

> Este documento resume el estado actual de la landing page de Riskeep
> (riskeep.com), el copy real ya publicado, precios y look&feel. Pensado
> para subir como "conocimiento" a un Project de Claude dedicado a
> marketing, contenido de redes sociales y estrategia de comercialización.
> Ver `ARIA_CONTEXT.md` (repo de ARIA) para el producto en sí.

## Qué es esta web

Landing page de **Riskeep**, la marca/empresa detrás de **ARIA** (el
agente de trading autónomo). Next.js + Tailwind, en español e inglés
(selector de idioma). Meta-descripción actual: *"ARIA analiza el mercado,
gestiona el riesgo y ejecuta operaciones automáticamente. Trading con
inteligencia artificial para Bitget."*

## Estructura de la página (orden real, de arriba a abajo)

1. **Navbar** — logo Riskeep, enlaces (Funciones, Resultados, Precios, FAQ,
   Legal), selector de idioma, "Entrar" / "Empezar gratis" (→ registro demo).
2. **Hero** — badge "ARIA 9.0 · Cripto, oro, petróleo y acciones",
   titular animado ("ARIA opera" + "Mientras Duermes" / "Las 24 Horas" /
   "Sin Emociones" / "Con Reglas Medidas"), subtítulo ("vigila los mercados
   de Bitget día y noche —cripto y, si quieres, oro, petróleo, índices y
   acciones—, entra solo cuando la tendencia gira a su favor, se frena antes
   de la Fed o de unos resultados y protege cada operación con un stop…"), dos CTAs ("Probar gratis en demo"
   → registro / "Ver cómo funciona"), sellos de confianza (sin tarjeta, cancela cuando quieras,
   modo paper incluido), y a la derecha una **réplica visual fiel del
   dashboard real de ARIA** (mismo layout, mismos colores, mismos textos
   que la app de verdad — panel de control con botones "Detener Sistema" /
   "Ciclo Manual", ticker con 10 criptos en marquee, posiciones abiertas
   de ejemplo). Esta réplica se ha ido puliendo para que sea creíble y no
   un mockup genérico.
3. **Ticker** — tira de texto en scroll continuo con frases clave:
   Análisis en tiempo real, Stop loss automático, Modo paper gratuito,
   Compatible con Bitget, Alertas por Telegram, IA de última generación,
   Win rate 64%+, Ejecución < 0.5s, Claves locales sin servidor, ARIA
   opera 24/7, Stop loss por ATR dinámico, Multi-par simultáneo.
4. **Resultados / Transparencia** ("Medimos antes de prometer") — sección
   nueva (oct-2026) con la curva REAL del backtest de la estrategia
   Tendencia 4h (lib/data/backtest.ts, generada con el backtest de ARIA):
   253 operaciones simuladas en 10 mercados, mar 2025 – oct 2026, +0,31R
   por operación con comisiones, profit factor 1,35, peor caída −48,6R con
   24 pérdidas seguidas (medida por fechas, corregida en oct-2026: antes se
   publicaba −36R, calculada mercado a mercado, que infravaloraba el riesgo);
   periodo de ajuste (60 %) +0,14R vs periodo no visto (40 %) +0,56R.
   Siempre acompañada del aviso de resultados simulados. Es el ángulo de
   marketing más fuerte y verificable.
4b. **Stats** — 4 cifras animadas: **15.000+** operaciones analizadas,
   **64%** win rate promedio, **< 0.5s** tiempo de ejecución, **24/7**
   disponibilidad. *(Nota: son las cifras que muestra la landing como
   copy de marketing — para contenido que cite rendimiento real y
   verificable, contrastar con los datos reales de trading antes de
   publicar, no asumir que coinciden.)*
5. **Features** — bento grid, 6 tarjetas:
   - *Varios mercados a la vez* — cripto + oro, petróleo, índices y acciones por clase,
     con el estado real de cada una (solo cripto validada).
   - *Riesgo bajo control* — % fijo por operación, stop nativo, límites.
   - *Deja correr las ganadoras* — sin TP fijo, trailing 4×ATR (barras reales
     ganadora media +11,8 % vs perdedora media −3,8 % del backtest).
   - *Una estrategia medida antes de operar* — mini curva real del backtest.
   - *IA por tarea* — un modelo bueno para decidir y uno pequeño para
     noticias y sombra (Gemini, OpenAI, Claude, Groq o local).
   - *Tus claves, tu equipo* — claves solo en local.
6. **HowItWorks** — 3 pasos: Crea tu cuenta gratis (sin tarjeta) →
   Conecta Bitget (API sin retiradas) → ARIA vigila y opera (observar /
   manual / automático).
7. **Comparison** — tabla "ARIA vs Trading Manual" ("No es competencia
   justa — pero tú decides"): disponibilidad 24/7 vs 8-10h/día, decisiones
   sin sesgos vs FOMO/miedo/avaricia, ejecución <0.5s vs 2-10s, stop/take
   automático vs manual y tardío, multi-par vs 1 par a la vez, memoria de
   episodios vs experiencia limitada, solo configuración inicial vs horas
   diarias de análisis.
8. **Pricing** — **un único plan**, todo incluido (precio de lanzamiento
   actual: 19 €/mes o 149 €/año, sube a 29 € / 249 € al salir de beta;
   suscripciones abren en noviembre de 2026):
   - Mensual: **29€/mes**.
   - Anual: **249€/año** (ahorras 99€, -28%, "más popular").
   - Modo demo/paper **gratis**, sin tarjeta, para probar antes de pagar.
   - Incluye: ARIA (agente autónomo), análisis técnico con IA en tiempo
     real, gestión automática de riesgo (ATR), soporte Bitget (paper +
     real), múltiples pares simultáneos, alertas Telegram,
     actualizaciones automáticas, soporte por email. El plan anual añade:
     soporte prioritario, acceso anticipado a nuevas funciones, historial
     de rendimiento extendido.
   - Pago con Stripe, cancelable en cualquier momento.
9. **FAQ** — preguntas reales ya respondidas en el copy (útiles como base
   para contenido educativo):
   - No hace falta experiencia previa en trading (empieza en paper).
   - Conectar Bitget es seguro: API key solo con permisos de trading, sin
     retirada; las claves se guardan localmente, nunca en servidores de
     Riskeep.
   - El modo paper usa Bitget Simulated Trading (oficial de Bitget),
     gratis, sin tarjeta.
   - El modelo de IA lo elige el usuario (Gemini/Groq/OpenAI/Claude o
     local vía Ollama sin depender de ningún servicio externo).
   - Launcher disponible en Windows 10/11 y macOS 12+ (Linux en
     desarrollo).
   - Cancelación en cualquier momento desde el área de cliente.
10. **Footer** — enlaces legales, marca.

## Identidad visual

- **Tipografías**: Space Grotesk (títulos/heading), Public Sans (texto de
  cuerpo), IBM Plex Mono (cifras, datos, ticker — look "terminal/trading").
- **Paleta**: fondo azul-negro muy oscuro (`#0A0F1E` / `#040e1f`), acento
  principal ámbar/dorado (CTAs, precios, badges "más popular" — asociado a
  la marca Riskeep), violeta como acento secundario (glows ambientales,
  panel de razonamiento de IA), y **verde `#22C55E`** específicamente como
  color de marca de ARIA dentro del mockup del dashboard (para diferenciar
  visualmente "la app" del resto de la web, que es más ámbar/violeta).
- **Estética general**: oscura, "fintech/trading terminal", con
  animaciones sutiles (reveal al hacer scroll, ticker en marquee, tilt 3D
  en el mockup del hero, shimmer en barras de progreso) — transmite
  seriedad y precisión, no un tono "cripto meme" ni agresivo tipo "hazte
  rico".

## Páginas nuevas (29-oct-2026)

- **/aria — «Cómo funciona ARIA»** (components/aria/AriaPageContent.tsx, textos en
  lib/i18n/ariaPage.ts): ciclo de 15 min, estrategias (Tendencia 4h con todas sus
  cifras, incluidas −48,6R y 24 pérdidas seguidas; modos experimentales con su
  backtest), mercados por clase con lo medido en cada una y los 5 criterios de
  demo → real, riesgo capa a capa, IA por tarea, sombra, recorrido por la app con
  8 capturas reales y «Lo que ARIA no hace». Enlazada desde el menú («Cómo
  funciona»), el botón «Ver cómo funciona» del Hero y el pie.
- **/novedades** (components/novedades/NovedadesContent.tsx, textos en
  lib/i18n/novedades.ts): 9.0, 8.2, 8.1 y 8.0 en lenguaje de usuario + «Lo
  próximo» (roadmap sin fechas). El distintivo «ARIA 9.0» del Hero lleva aquí. Al
  publicar una versión, añadirla arriba en los dos idiomas.
- **Capturas** en public/images/aria/*-{es,en}.webp (2880×1720): instalación de
  prueba con precios reales públicos de Bitget, capital y operaciones de ejemplo,
  sin datos personales. Se rehacen con los scripts web_shots_harness.py + shots.py.
- Menú y pie: las anclas (#features…) llevan a la portada desde otras páginas.
- /aria, segunda pasada: titular con la animación por palabras de la portada,
  captura del Panel que se endereza al hacer scroll (+ efecto 3D al pasar el ratón
  y tarjetas flotantes), índice fijo bajo el menú que marca la sección visible,
  ciclo como línea de tiempo que se llena al bajar, recuadro «¿Qué es una R?»,
  operación de ejemplo dibujada (ilustrativa: ganadora media +11,8 % y pérdida
  media −3,8 % del backtest → +3,1R) y calculadora de riesgo (capital y % →
  1R, media, peor racha y peor caída). En las secciones, recortes ampliados
  (public/images/aria/recorte-*.webp); las capturas completas solo en «La app».
- Portada: enlace «Ver capturas reales de la app» bajo el dashboard y tarjeta
  «Cómo funciona por dentro» al final de «Cómo funciona», ambos a /aria.

## Revisión 29-oct-2026 (ARIA 9.0)

- Hero: badge "ARIA 9.0 · Cripto, oro, petróleo y acciones" y subtítulo con
  varios mercados y freno ante eventos. Mockup con la barra lateral real de
  la 9.0 en modo Sencillo (Panel, Memoria, Stats, Mercados, Sombra, Noticias).
- Funciones: la tarjeta grande pasa a "Varios mercados a la vez" con el
  estado REAL de cada clase (Cripto validada, Oro en medición, resto en
  sombra) — se quitó un "64.2 % win rate · 312 ops" inventado que había en
  esa tarjeta. "Riesgo bajo control" añade el freno por eventos y el corte
  por clase; "Alertas por Telegram" pasa a "IA por tarea".
- Resultados: peor caída corregida a −48,6R y 24 pérdidas seguidas (la que
  muestra la propia app). Rentabilidad sin cambios (+0,31R, 253 ops). Una
  ejecución nueva del backtest oficial (29-oct, 720 días) da +0,40R/op y
  −37,3R: cada ventana de datos da cifras algo distintas, por eso la web se
  queda con la rentabilidad más baja y la caída más alta.
- Ticker, comparativa (fila de eventos), precios (lista de 10 elementos),
  FAQ (mercados, nueva pregunta de noticias y eventos, IA con varias
  claves), avisos de riesgo (futuros sobre cripto, materias primas, índices
  o acciones) y Legal (riesgo de hueco en mercados tradicionales, legalidad
  de derivados sobre acciones/materias primas, freno por eventos).
- Meta-descripción, JSON-LD (softwareVersion) y versión por defecto 9.0.0
  (la real sale de NEXT_PUBLIC_ARIA_VERSION).
- Guía PDF (public/aria-blueprint.html): portada (5 clases), "Qué es ARIA"
  (varios mercados, eventos), IA (varias a la vez), tabla de pantallas de la
  9.0 y checklist con Diagnóstico y ★ recomendados. Sigue en 15 páginas.
- Se mantienen por decisión del propietario "64 % win rate" (ticker y franja
  de cifras) y "< 0.5s": NO coinciden con los datos medidos (≈ 30 % de
  aciertos en Tendencia) — no usarlas en contenido nuevo.

## Revisión oct-2026 (ARIA 8.1)

- Contenido actualizado a ARIA 8.1 (estrategia Tendencia 4h por defecto,
  IA opcional, 10 mercados, rutas de claves ~/.aria, macOS 12+ / Windows
  10/11, Linux "en desarrollo").
- Eliminadas de Legal afirmaciones sin respaldo en el producto (LoRAs con
  nombre que no existen, "30 días de paper obligatorios").
- SEO: robots.txt, sitemap.xml, imagen Open Graph 1200×630, JSON-LD.
- "15K+" sustituido por cifras verificables: "960 análisis al día" (10
  mercados × ciclos de 15 min, configuración por defecto) y "0 € prueba
  demo". Se mantienen por decisión del propietario "64 % win rate" y
  "< 0.5s", que NO coinciden con los datos medidos — no usarlas en
  contenido nuevo.

## Estado del trabajo de diseño (anterior)

El Hero ha sido la sección más trabajada recientemente: el mockup del
dashboard se rehizo varias veces para que fuera una réplica fiel de la app
real (no un dashboard genérico de stock), se le hizo más alto y con más
aire, se amplió a mostrar 2 posiciones abiertas simultáneas, se añadieron
los botones de control reales ("Detener Sistema", "Ciclo Manual",
PAPER/AUTO) y el ticker pasó de 4 a 10 criptos en scroll continuo. Otras
secciones (Pricing, Features, Comparison, FAQ) recibieron pases de pulido
de color/espaciado en sesiones anteriores.

## Ángulo de marketing recomendado (basado en lo anterior)

- El mensaje más fuerte y diferenciador es la **progresión de seguridad**
  (paper → manual → auto → real) y la **transparencia** (claves propias,
  IA a elección, código no dependiente de un único proveedor) — no la
  promesa de rentabilidad.
- La tabla ARIA vs Manual ya da 7 ángulos de contenido listos para
  convertir en piezas individuales (disponibilidad 24/7, sin sesgos
  emocionales, velocidad, gestión de riesgo automática, multi-par,
  aprendizaje continuo, ahorro de tiempo).
- El modo paper gratuito es el "gancho" de conversión de menor fricción
  (sin tarjeta) — cualquier campaña de adquisición debería apuntar ahí
  antes que directamente a la suscripción de pago.
