/* ─────────────────────────────────────────────────────────────────────────────
   Textos de la página /novedades: historial de versiones de ARIA en lenguaje
   de usuario, resumido del "Historial de versiones" y del "Roadmap" del README
   de ARIA. Al publicar una versión, añadirla arriba en los dos idiomas.
   ───────────────────────────────────────────────────────────────────────────── */
import type { Lang } from './translations'

export type ChangeKind = 'new' | 'improved' | 'fixed' | 'security' | 'research'

type Release = {
  version: string
  date: string          // ISO, se formatea según el idioma
  title: string
  summary: string
  groups: { name: string; items: [ChangeKind, string][] }[]
}

const es = {
  metaTitle: 'Novedades de ARIA',
  chip: 'Novedades',
  title: 'Qué hay de nuevo en ARIA',
  subtitle: 'Cada versión, explicada sin tecnicismos: lo nuevo, lo que mejora, lo que se ha arreglado y lo que se investigó antes de activarlo.',
  latest: 'Última versión',
  kinds: { new: 'Nuevo', improved: 'Mejora', fixed: 'Arreglo', security: 'Seguridad', research: 'Medido' } as Record<ChangeKind, string>,
  updateNote: 'ARIA avisa cuando hay una versión nueva y se actualiza sola desde la app.',
  roadmapChip: 'En camino',
  roadmapTitle: 'Lo próximo',
  roadmapSub: 'Sin fechas: cada cosa se activa cuando está medida.',
  roadmap: [
    'Varias semanas de Tendencia 4h en automático sobre cuenta demo, comparadas con el backtest, antes de recomendarla en real.',
    'Medir el oro y el resto de clases en demo y sombra hasta que cumplan los criterios para pasar a real.',
    'Probar un filtro de funding y una salida por cambio de régimen en la Tendencia (backtest antes de activarlos).',
    'Señales de posicionamiento (interés abierto, funding) cuando haya histórico suficiente.',
    'Versión de la app optimizada para el móvil.',
  ],
  ctaAria: 'Cómo funciona ARIA',
  ctaDemo: 'Probar gratis en demo',
  releases: [
    {
      version: '9.0',
      date: '2026-10-29',
      title: 'Varios mercados, eventos y IA por tarea',
      summary: 'ARIA deja de ser solo cripto: oro, petróleo, índices y acciones por clase, cada una con sus reglas, y un calendario que frena las entradas antes de la Fed o de unos resultados.',
      groups: [
        { name: 'Mercados', items: [
          ['new', 'Clases de activo (metales, energía, índices y acciones), cada una con su modo (apagado, sombra o demo), estrategia y tope de posiciones. Sin entradas en fin de semana fuera de cripto.'],
          ['new', 'Página Mercados con todos tus mercados por clase, y un explorador con los ~870 perpetuos de Bitget y la opinión de ARIA sobre cada uno.'],
          ['new', 'De demo a real con criterios medidos (50 operaciones, 56 días, R medio, profit factor y confianza). Si quieres hacerlo antes, ARIA te avisa y te pide confirmarlo.'],
          ['new', 'Por clase: pausar, cortar y cerrar, corte automático si cae demasiado y avisos de Telegram propios.'],
          ['new', 'Carpeta de operaciones ordenada por cuenta, clase, mercado y año.'],
        ] },
        { name: 'Eventos y noticias', items: [
          ['new', 'Calendario de eventos (Fed, IPC, empleo, inventarios de crudo, resultados, festivos) con freno de entradas por clase y aviso si tienes una posición con un evento cerca.'],
          ['new', 'Noticias por clase y un resumen de cada mercado con IA cada 6 horas: sesgo y riesgos.'],
          ['fixed', 'Los titulares se fechan por su publicación real y se descartan los de más de 48 h.'],
        ] },
        { name: 'IA', items: [
          ['new', 'IA por tarea: un modelo para decidir, otro para la IA analista, otro para la sombra y otro para las noticias, de cualquier proveedor con clave. Varias claves a la vez.'],
          ['new', '★ Valor recomendado, con su explicación, en los ajustes que más importan.'],
        ] },
        { name: 'App', items: [
          ['new', 'Tarjeta «Hoy», Diagnóstico en un clic, copias de seguridad diarias (nunca con tus claves) y modo Sencillo / Avanzado.'],
          ['improved', 'Guía nueva dentro de la app: primeros pasos, qué mirar cada día y de demo a real.'],
          ['fixed', 'La página Mercados se podía quedar sin desplazamiento con un mercado desplegado.'],
        ] },
        { name: 'Investigación', items: [
          ['research', 'Oro con 4,4 años de datos: +0,23R por operación (+0,19R en datos no vistos), por eso se recomienda Tendencia sin filtro de régimen.'],
          ['research', 'El freno por eventos no cambia nada en cripto (ninguna entrada de la Tendencia cayó cerca de la Fed): queda apagado ahí.'],
          ['research', 'Ampliar a 25 cripto diluye la ventaja: se mantienen los 10 mercados.'],
        ] },
      ],
    },
    {
      version: '8.2',
      date: '2026-10-28',
      title: 'Centro de estrategia, IA analista y modos en sombra',
      summary: 'Todo lo que decide cómo opera ARIA, en un solo sitio, y una forma de probar modos nuevos sin arriesgar dinero.',
      groups: [
        { name: 'Control', items: [
          ['new', 'Centro de estrategia: modo, papel de la IA, cuenta, posiciones y riesgo en un sitio, con medidor de riesgo real y recomendaciones de un clic.'],
          ['new', 'Tarjeta «Estrategia activa» con el régimen de BTC y los votos de cada mercado; Iniciar, Pausar entradas y Cerrar todo con confirmación escrita.'],
          ['new', 'Ficha de cada posición con gráfico, resultado en R, distancia al stop y el próximo movimiento del trailing.'],
        ] },
        { name: 'IA y sombra', items: [
          ['new', 'IA analista en Tendencia 4h: opina sobre cada señal, nunca bloquea.'],
          ['new', 'Modos en sombra: otros modos analizan en paralelo con el simulador del backtest y apuntan qué habrían hecho.'],
          ['improved', 'Si la IA analista se queda sin cupo, pasa al modelo principal; las señales se siguen tomando.'],
        ] },
        { name: 'Medición', items: [
          ['new', 'Diario de operaciones con contexto y resultado en R; ficha completa de cada operación con PDF y nota propia.'],
          ['new', 'Estadísticas: real frente a backtest, historial filtrable y exportación CSV (también fiscal).'],
          ['new', 'Resumen semanal y alerta de desvío por Telegram.'],
        ] },
        { name: 'Cuenta y seguridad', items: [
          ['new', 'Cuenta de Riskeep dentro de ARIA: plan, renovación y suscripción detectada sin reiniciar.'],
          ['improved', 'La cuenta demo/real se recuerda entre arranques (solo vuelve a real con suscripción y claves Live).'],
          ['fixed', 'La Tendencia opera con riesgo fijo, como se validó; antes podía recortarse tras pérdidas.'],
          ['fixed', 'La peor caída del backtest se calcula por fechas, como se vive: 24 pérdidas seguidas y 48,6R (antes 9 y 36R).'],
        ] },
      ],
    },
    {
      version: '8.1',
      date: '2026-10-27',
      title: 'Tendencia 4h: medir antes de operar',
      summary: 'Llega la estrategia validada fuera de muestra y un backtest que simula cada operación con las mismas reglas que el bot en vivo.',
      groups: [
        { name: 'Estrategia', items: [
          ['new', 'Estrategia Tendencia 4h, por defecto: +0,31R por operación y profit factor 1,35 con comisiones, sin necesitar IA.'],
          ['new', 'Backtest fiel (comisiones, deslizamiento, huecos, trailing) con validación en un periodo no visto.'],
          ['research', 'La capa de patrones de 15 minutos no tenía ventaja (−0,25R por operación): queda como experimental.'],
          ['fixed', 'Los patrones se detectaban sobre la vela aún abierta y cambiaban al cerrar.'],
        ] },
        { name: 'Seguridad', items: [
          ['security', 'El bot de Telegram solo obedece a tu chat.'],
          ['security', 'Panel accesible solo desde tu equipo y claves que nunca devuelve la API.'],
        ] },
        { name: 'Broker y riesgo', items: [
          ['fixed', 'Una orden cuya respuesta se perdía se reconcilia con Bitget (nunca queda una posición sin stop ni duplicada).'],
          ['fixed', 'Un fallo de red al cerrar ya no deja una posición sin vigilar.'],
          ['improved', 'Cupo de la IA en la nube: límites por minuto y por día, respaldo y reparto del cupo diario.'],
        ] },
      ],
    },
    {
      version: '8.0',
      date: '2026-09-16',
      title: 'Modos de análisis y IA de cualquier proveedor',
      summary: 'Técnico, Fundamental y Mezclado; y la IA deja de depender de un único proveedor.',
      groups: [
        { name: 'Novedades', items: [
          ['new', 'Modos de análisis Técnico, Fundamental (noticias, sentimiento y funding) y Mezclado, con sus propios umbrales de riesgo.'],
          ['new', 'IA de Gemini, Groq, OpenAI, Claude o un proveedor compatible; el modelo local solo hace falta si no usas la nube.'],
          ['new', 'Todos los filtros editables desde la app, con ayuda en cada campo.'],
          ['security', 'Los titulares se tratan como datos, nunca como instrucciones para la IA.'],
          ['fixed', 'El cambio demo/real desde el panel y desde Telegram reconecta de verdad con Bitget.'],
        ] },
      ],
    },
  ] as Release[],
}

const en: typeof es = {
  metaTitle: 'What’s new in ARIA',
  chip: 'What’s new',
  title: 'What’s new in ARIA',
  subtitle: 'Every release, explained without jargon: what’s new, what’s better, what was fixed and what was researched before switching it on.',
  latest: 'Latest version',
  kinds: { new: 'New', improved: 'Improved', fixed: 'Fixed', security: 'Security', research: 'Measured' },
  updateNote: 'ARIA tells you when a new version is out and updates itself from the app.',
  roadmapChip: 'Coming up',
  roadmapTitle: 'What’s next',
  roadmapSub: 'No dates: each item is switched on once it’s measured.',
  roadmap: [
    'Several weeks of 4h Trend on automatic on a demo account, compared with the backtest, before recommending it for real money.',
    'Measure gold and the other classes in demo and shadow until they meet the criteria to go live.',
    'Test a funding filter and a regime-change exit for the Trend strategy (backtest first).',
    'Positioning signals (open interest, funding) once there’s enough history.',
    'A mobile-optimised version of the app.',
  ],
  ctaAria: 'How ARIA works',
  ctaDemo: 'Try it free in demo',
  releases: [
    {
      version: '9.0',
      date: '2026-10-29',
      title: 'Multiple markets, events and AI per task',
      summary: 'ARIA is no longer crypto-only: gold, oil, indices and stocks by class, each with its own rules, and a calendar that brakes entries before the Fed or earnings.',
      groups: [
        { name: 'Markets', items: [
          ['new', 'Asset classes (metals, energy, indices and stocks), each with its own mode (off, shadow or demo), strategy and position cap. No weekend entries outside crypto.'],
          ['new', 'Markets page with all your markets by class, and an explorer with Bitget’s ~870 perpetuals and ARIA’s view on each.'],
          ['new', 'Demo to real by measured criteria (50 trades, 56 days, average R, profit factor and confidence). If you want to go earlier, ARIA warns you and asks you to confirm.'],
          ['new', 'Per class: pause, cut and close, automatic cut if it drops too far, and its own Telegram alerts.'],
          ['new', 'Trades folder organised by account, class, market and year.'],
        ] },
        { name: 'Events and news', items: [
          ['new', 'Event calendar (Fed, CPI, jobs, crude inventories, earnings, holidays) with a per-class entry guard and a warning if a position has an event nearby.'],
          ['new', 'News per class and an AI summary of each market every 6 hours: bias and risks.'],
          ['fixed', 'Headlines are dated by their real publication time; those older than 48 h are dropped.'],
        ] },
        { name: 'AI', items: [
          ['new', 'AI per task: one model to decide, another for the AI analyst, another for shadow and another for news, from any provider with a key. Several keys at once.'],
          ['new', '★ Recommended value, with an explanation, on the settings that matter most.'],
        ] },
        { name: 'App', items: [
          ['new', '“Today” card, one-click Diagnostics, daily backups (never with your keys) and Simple / Advanced mode.'],
          ['improved', 'New in-app guide: first steps, what to check every day and demo to real.'],
          ['fixed', 'The Markets page could stop scrolling with a market expanded.'],
        ] },
        { name: 'Research', items: [
          ['research', 'Gold over 4.4 years: +0.23R per trade (+0.19R on unseen data), hence Trend without a regime filter is recommended.'],
          ['research', 'The event guard changes nothing on crypto (no Trend entry fell near the Fed): it stays off there.'],
          ['research', 'Expanding to 25 crypto markets dilutes the edge: the 10 markets stay.'],
        ] },
      ],
    },
    {
      version: '8.2',
      date: '2026-10-28',
      title: 'Strategy Center, AI analyst and shadow modes',
      summary: 'Everything that decides how ARIA trades, in one place, and a way to test new modes without risking money.',
      groups: [
        { name: 'Control', items: [
          ['new', 'Strategy Center: mode, AI role, account, positions and risk in one place, with a real risk gauge and one-click recommendations.'],
          ['new', '“Active strategy” card with the BTC regime and each market’s votes; Start, Pause entries and Close all with typed confirmation.'],
          ['new', 'Position sheet with chart, result in R, distance to stop and the trailing stop’s next move.'],
        ] },
        { name: 'AI and shadow', items: [
          ['new', 'AI analyst in 4h Trend: comments on each signal, never blocks.'],
          ['new', 'Shadow modes: other modes analyse in parallel with the backtest simulator and record what they would have done.'],
          ['improved', 'If the AI analyst runs out of quota it falls back to the main model; signals are still taken.'],
        ] },
        { name: 'Measurement', items: [
          ['new', 'Trade journal with context and result in R; full sheet per trade with PDF and your own note.'],
          ['new', 'Statistics: real vs backtest, filterable history and CSV export (tax too).'],
          ['new', 'Weekly summary and drift alert on Telegram.'],
        ] },
        { name: 'Account and security', items: [
          ['new', 'Riskeep account inside ARIA: plan, renewal and subscription detected without restarting.'],
          ['improved', 'The demo/real account is remembered between restarts (it only resumes real with a subscription and Live keys).'],
          ['fixed', 'Trend trades with fixed risk, as validated; before, it could be cut after losses.'],
          ['fixed', 'The backtest’s worst drawdown is computed by date, as it’s lived: 24 losses in a row and 48.6R (was 9 and 36R).'],
        ] },
      ],
    },
    {
      version: '8.1',
      date: '2026-10-27',
      title: '4h Trend: measure before trading',
      summary: 'The out-of-sample validated strategy arrives, with a backtest that simulates every trade with the same rules as the live bot.',
      groups: [
        { name: 'Strategy', items: [
          ['new', '4h Trend strategy, the default: +0.31R per trade and 1.35 profit factor after fees, no AI needed.'],
          ['new', 'Faithful backtest (fees, slippage, gaps, trailing) validated on an unseen period.'],
          ['research', 'The 15-minute pattern layer had no edge (−0.25R per trade): it stays experimental.'],
          ['fixed', 'Patterns were detected on the still-open candle and changed on close.'],
        ] },
        { name: 'Security', items: [
          ['security', 'The Telegram bot only obeys your chat.'],
          ['security', 'Dashboard reachable only from your machine, and keys the API never returns.'],
        ] },
        { name: 'Broker and risk', items: [
          ['fixed', 'An order whose response got lost is reconciled with Bitget (never a position without a stop or a duplicate).'],
          ['fixed', 'A network error while closing no longer leaves a position unwatched.'],
          ['improved', 'Cloud AI quota: per-minute and per-day limits, fallback and daily budget.'],
        ] },
      ],
    },
    {
      version: '8.0',
      date: '2026-09-16',
      title: 'Analysis modes and AI from any provider',
      summary: 'Technical, Fundamental and Mixed; and the AI no longer depends on a single provider.',
      groups: [
        { name: 'Highlights', items: [
          ['new', 'Technical, Fundamental (news, sentiment and funding) and Mixed analysis modes, each with its own risk thresholds.'],
          ['new', 'AI from Gemini, Groq, OpenAI, Claude or a compatible provider; the local model is only needed if you don’t use the cloud.'],
          ['new', 'Every filter editable from the app, with help on each field.'],
          ['security', 'Headlines are treated as data, never as instructions for the AI.'],
          ['fixed', 'Switching demo/real from the dashboard and from Telegram truly reconnects to Bitget.'],
        ] },
      ],
    },
  ],
}

export const novedades: Record<Lang, typeof es> = { es, en }
