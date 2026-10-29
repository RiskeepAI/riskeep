/* ─────────────────────────────────────────────────────────────────────────────
   Textos de la página /aria ("Cómo funciona ARIA"). Aparte de translations.ts
   porque es contenido largo de una sola página. Cifras y valores por defecto
   sacados de ARIA 9.0 (config/settings.toml, README) y del backtest de
   lib/data/backtest.ts — si cambian allí, cambiarlos aquí.
   ───────────────────────────────────────────────────────────────────────────── */
import type { Lang } from './translations'

const es = {
  metaTitle: 'Cómo funciona ARIA',
  chip: 'Cómo funciona ARIA',
  title: 'Todo lo que hace ARIA,',
  titleAccent: 'sin letra pequeña',
  subtitle:
    'Qué mira, cuándo entra, cómo protege tu cuenta, qué papel tiene la IA y qué no hace nunca. Con capturas reales de ARIA 9.0 y las cifras medidas, también las malas.',
  ctaPrimary: 'Probar gratis en demo',
  ctaNews: 'Novedades de la 9.0',
  ctaGuide: 'Guía de instalación (PDF)',
  toc: [
    ['ciclo', 'El ciclo'],
    ['estrategias', 'Estrategias'],
    ['mercados', 'Mercados'],
    ['riesgo', 'Riesgo'],
    ['ia', 'IA'],
    ['sombra', 'Sombra'],
    ['app', 'La app'],
    ['no-hace', 'Lo que no hace'],
  ] as ReadonlyArray<readonly [string, string]>,
  heroCaption: 'Panel de ARIA 9.0 en cuenta demo: estrategia activa, régimen de BTC, votos por mercado, tarjeta «Hoy» y posiciones abiertas.',
  demoNote: 'Capturas de una instalación de prueba con precios reales de Bitget; capital y operaciones de ejemplo.',

  tocLabel: 'En esta página',
  floats: ['Stop puesto en Bitget', 'SOL/USDT · +1,68R', 'Freno por eventos activo'],

  /* ── R, ejemplo y calculadora ── */
  rTitle: '¿Qué es una R?',
  rBody:
    'Es lo que arriesgas en una operación: la distancia entre la entrada y el stop. Si salta el stop pierdes 1R; si el precio recorre cuatro veces esa distancia a tu favor, ganas 4R. Medir en R permite comparar operaciones sin importar el tamaño de la cuenta.',
  rExample: 'Con 1.000 € y un 0,30 % de riesgo, 1R = {r}. +{exp}R por operación equivale a unos {avg} de media por operación en el backtest.',
  exTitle: 'Una operación, paso a paso',
  exSub: 'Ejemplo ilustrativo con la ganadora media y la pérdida media del backtest. No es una operación real.',
  exLabels: { price: 'Precio', entry: 'Entrada', stop: 'Stop inicial', trail: 'Stop que sigue al precio', exit: 'Salida' },
  exSteps: [
    ['Entra', 'La tendencia gira al alza y el régimen de BTC acompaña: compra a 100.'],
    ['Pone el stop', 'A 2 × ATR, en 96,2 (−3,8 %). Esa distancia es 1R.'],
    ['Lo sube con el precio', 'Cuando el precio avanza, el stop lo sigue a 4 × ATR y nunca baja.'],
    ['Sale', 'El precio se gira y toca el stop en 111,8: +11,8 %, es decir +3,1R.'],
  ] as ReadonlyArray<readonly [string, string]>,
  exNote: 'Así son las ganadoras. Pero la mayoría de operaciones terminan en −1R: la Tendencia acierta en torno a un {win} % de las veces y gana porque las ganadoras son mucho más grandes.',
  calcTitle: 'Calcula tu riesgo',
  calcSub: 'Mueve los valores y mira qué habrían supuesto las cifras del backtest en tu cuenta.',
  calcCapital: 'Capital',
  calcRisk: 'Riesgo por operación',
  calcOneR: '1R: lo que arriesgas por operación',
  calcAvg: 'Media por operación en el backtest (+{exp}R)',
  calcStreak: 'Peor racha: {n} pérdidas seguidas',
  calcDD: 'Peor caída del backtest ({dd}R)',
  calcNote: 'Cálculo simple, sin interés compuesto y con resultados simulados: no es una previsión.',
  caminoCaption: 'Camino a dinero real: cada clase con los cinco criterios y lo que le falta.',
  sombraCaption: 'Comparativa en R del modo real frente a los modos en sombra, y las posiciones que habrían abierto.',

  /* ── Ciclo ── */
  cycleChip: 'Cada 15 minutos',
  cycleTitle: 'Un ciclo, de principio a fin',
  cycleSub: 'ARIA repite este recorrido día y noche en tu ordenador. Cada paso queda registrado y lo puedes ver en la app.',
  cycle: [
    { t: 'Lee el mercado', d: 'Descarga velas, precio, funding y noticias de cada mercado que tengas activo en Bitget.' },
    { t: 'Mira el contexto', d: 'Régimen de BTC (media de 200 velas de 4 h), tendencia de cada mercado y eventos próximos: Fed, IPC, empleo, inventarios de crudo o resultados.' },
    { t: 'Decide si entra', d: 'Solo cuando la tendencia gira a favor y el régimen acompaña. Los frenos (eventos, tope por clase, pausas) pueden decir que no.' },
    { t: 'Calcula el tamaño', d: 'Arriesga un porcentaje fijo de tu capital (0,30 % por defecto) según la distancia al stop. Nunca más.' },
    { t: 'Abre y protege', d: 'Orden en Bitget con el stop puesto en el propio exchange: si tu ordenador se apaga, el stop sigue ahí.' },
    { t: 'Gestiona y aprende', d: 'Un stop que sigue al precio (4 × ATR) deja correr las ganadoras. Al cerrar, guarda la operación en el diario con su resultado en R.' },
  ],

  /* ── Estrategias ── */
  stratChip: 'Estrategias',
  stratTitle: 'Una estrategia validada. El resto, a prueba',
  stratSub: 'ARIA trae cuatro modos de análisis. Solo uno ganó en un periodo que no se usó para ajustarlo; es el que viene por defecto.',
  trendName: 'Tendencia 4h',
  trendTag: 'Validada · por defecto',
  trendDesc:
    'Sigue la dirección de fondo de cada mercado en velas de 4 horas. Entra solo cuando la tendencia cambia y el régimen de BTC acompaña; stop inicial a 2 × ATR y salida con un stop que sigue al precio, sin objetivo fijo. Pocas operaciones, ganadoras largas, muchas pérdidas pequeñas. No necesita IA para decidir.',
  trendStats: {
    exp: 'por operación',
    pf: 'profit factor',
    trades: 'operaciones',
    dd: 'peor caída',
    streak: 'pérdidas seguidas',
    win: 'aciertos',
    split: 'Ajuste (60 %): {train} · Periodo no visto (40 %): {test}',
  },
  trendNote: 'Backtest con comisiones, deslizamiento y huecos, {from} – {to}, {symbols} mercados cripto. Resultados simulados: no garantizan resultados futuros.',
  expModes: [
    { n: 'Técnico 15m', b: '−0,25R / op.', d: 'Indicadores de corto plazo y patrones de velas; la IA decide cada entrada. Medido: sin ventaja.' },
    { n: 'Fundamental', b: 'No medible', d: 'Noticias, sentimiento y funding; la IA interpreta el contexto. Las noticias pasadas no se pueden reproducir con fidelidad.' },
    { n: 'Mezclado', b: 'Hereda el técnico', d: 'Técnico + fundamental en el mismo análisis. Es el que se mide en sombra para petróleo, índices y acciones.' },
  ],
  expTag: 'Experimental',
  expNote: 'Los modos experimentales solo se permiten en demo o en sombra. Para pasarlos a dinero real ARIA te avisa y te pide confirmarlo.',

  /* ── Mercados ── */
  mkChip: 'Varios mercados',
  mkTitle: 'Cripto, oro, petróleo, índices y acciones',
  mkSub:
    'Bitget ofrece futuros perpetuos en USDT sobre mucho más que cripto. ARIA los agrupa por clase y cada clase tiene su modo (apagado, sombra o demo), su estrategia y su tope de posiciones.',
  mkCols: ['Clase', 'Estado', 'Qué hay medido', 'Recomendada'],
  mkRows: [
    ['Cripto', 'Validada', 'Tendencia 4h validada fuera de muestra: +0,31R/op en 253 operaciones.', 'Tendencia 4h'],
    ['Oro y metales', 'En medición', 'Oro: +0,23R/op en 4,4 años (+0,19R en datos no vistos). La plata, negativa.', 'Tendencia 4h'],
    ['Petróleo y energía', 'Sombra', 'Tendencia −0,24R en solo 28 operaciones. Lo mueven las noticias (OPEP, inventarios).', 'Mezclado (IA)'],
    ['Índices', 'Sombra', 'Tendencia −0,59R: en 4 h tienden a volver a la media. Los mueven la Fed y el IPC.', 'Mezclado (IA)'],
    ['Acciones', 'Sombra', 'Tendencia ≈ 0R en 133 operaciones. Las mueven los resultados y los lanzamientos.', 'Mezclado (IA)'],
  ] as ReadonlyArray<readonly [string, string, string, string]>,
  mkTableNote: 'Fuera de cripto todo viene apagado: tú eliges qué clases activar y en qué modo. Ninguna está validada todavía.',
  mkPoints: [
    'Explorador con todos los perpetuos USDT de Bitget (unos 870): precio, volumen, apalancamiento máximo y la opinión de ARIA según sus backtests.',
    'Sin entradas nuevas en fin de semana fuera de cripto: el mercado de origen está cerrado y el precio puede abrir con hueco.',
    'Noticias por clase (Google News, OilPrice, CNBC, Yahoo) y un resumen de cada mercado con IA cada 6 horas.',
    'Una carpeta de operaciones ordenada por cuenta, clase, mercado y año, con un índice en CSV.',
  ],
  gradTitle: 'De demo a dinero real: con criterios, no con intuición',
  gradSub: 'Una clase nueva solo pasa a real cuando cumple los cinco (operaciones de demo y sombra sumadas):',
  gradCriteria: [
    ['50', 'operaciones cerradas'],
    ['56', 'días midiendo'],
    ['≥ +0,10R', 'resultado medio'],
    ['≥ 1,20', 'profit factor'],
    ['> 0', 'R medio con un 80 % de confianza'],
  ] as ReadonlyArray<readonly [string, string]>,
  gradNote: 'Si quieres hacerlo antes, puedes: ARIA te enseña qué falta, te pide confirmarlo y lo deja registrado.',
  explShotCaption: 'Explorador: todos los perpetuos de Bitget con la opinión de ARIA sacada de sus backtests.',

  /* ── Riesgo ── */
  riskChip: 'Riesgo',
  riskTitle: 'Capa a capa, antes de cada orden',
  riskSub: 'La rentabilidad no se controla; el riesgo, sí. Estos son los límites que ARIA aplica por defecto (todos se pueden ajustar).',
  riskLayers: [
    { t: 'Riesgo fijo por operación', d: '0,30 % del capital por defecto, calculado con la distancia real al stop.' },
    { t: 'Stop en el exchange', d: 'Cada posición abre con su stop nativo en Bitget, no solo en tu ordenador.' },
    { t: 'Máximo de posiciones', d: '10 en total por defecto, y un tope propio para cada clase.' },
    { t: 'Freno por eventos', d: 'Sin entradas 60 min antes y después de la Fed, IPC, empleo o PIB; alrededor de los inventarios de crudo; 18 h antes de resultados.' },
    { t: 'Pausas automáticas', d: 'Se detienen las entradas con un 5 % de pérdida en el día o un 20 % de caída desde el máximo.' },
    { t: 'Corte por clase', d: 'Si una clase en prueba cae más de lo previsto (10R en metales), se pausa sola. Y puedes cortarla y cerrarla con un clic.' },
    { t: 'Sin retiradas', d: 'Las claves de Bitget se crean sin permiso de retirada y se guardan solo en tu equipo.' },
    { t: 'Botón de parar', d: '«Pausar entradas» o «Cerrar todo» (con confirmación escrita). Las posiciones abiertas siguen con su stop.' },
  ],
  riskHonest:
    'Aun así se pierde: en el backtest hubo rachas de {streak} pérdidas seguidas y una caída de {dd}R (≈ 15 % de la cuenta con el riesgo por defecto). Empieza en demo.',

  /* ── IA ── */
  aiChip: 'Inteligencia artificial',
  aiTitle: 'La IA ayuda. No apuesta por ti',
  aiSub:
    'La estrategia validada no necesita IA para decidir. La IA trabaja donde aporta: opinar, leer noticias, resumir y simular modos nuevos. Tú eliges qué modelo hace cada tarea.',
  aiTasks: [
    { t: 'Decisiones', d: 'En los modos con IA decide las entradas. Aquí va el mejor modelo que tengas.' },
    { t: 'IA analista', d: 'En Tendencia 4h da una opinión corta de cada señal. Opina, nunca bloquea.' },
    { t: 'Sombra', d: 'Simula los modos con IA con un cupo propio (100 llamadas al día) para no gastar el del análisis real.' },
    { t: 'Noticias', d: 'Clasifica 20 titulares por llamada y resume cada mercado cada 6 horas. Con un modelo pequeño basta.' },
  ],
  aiProviders: 'Gemini, OpenAI, Claude, Groq o un proveedor compatible; varias claves a la vez. O todo en local con Ollama, sin depender de nadie.',
  aiPoints: [
    'ARIA marca con ★ el modelo recomendado para cada tarea según las claves que tengas, y vigila el límite diario de cada uno.',
    'Si un modelo se queda sin cupo, pasa al siguiente; si no queda ninguno, la Tendencia sigue operando igual.',
    'Los titulares se pasan a la IA como datos, nunca como instrucciones.',
  ],
  aiShotCaption: 'Centro de estrategia › IA por tarea: un modelo para cada trabajo, con el recomendado marcado.',

  /* ── Sombra ── */
  shadowChip: 'Modos en sombra',
  shadowTitle: 'Probar sin arriesgar nada',
  shadowSub:
    'Mientras ARIA opera con su estrategia, otros modos analizan los mismos mercados en paralelo y apuntan lo que habrían hecho, sin enviar órdenes. Así se miden con datos reales antes de tocar tu dinero.',
  shadowPoints: [
    'Comparativa en R: el modo real frente a cada modo en sombra.',
    'Mercado a mercado: qué miró, qué descartó la IA y por qué.',
    'Usa el mismo simulador que el backtest: entrada en la vela siguiente, stops y comisiones.',
    'Solo se enciende con «Iniciar», si tú quieres. No gasta el cupo de IA del análisis real.',
  ],
  shadowShotCaption: 'Página Sombra: modos en paralelo, su resultado y las posiciones que habrían abierto.',

  /* ── App ── */
  appChip: 'La app',
  appTitle: 'Un recorrido por ARIA 9.0',
  appSub: 'Es una app nativa para Mac y Windows: se abre en su propia ventana y todo se queda en tu equipo. Si esa ventana no pudiera abrirse, ARIA abre el mismo panel en tu navegador. Modo Sencillo para el día a día; Avanzado si quieres verlo todo.',
  shots: [
    { k: 'panel', t: 'Panel', d: 'La estrategia activa, el régimen de BTC, los votos de cada mercado, «Hoy» y tus posiciones.' },
    { k: 'mercados', t: 'Mercados', d: 'Todas las clases, su modo y el camino a dinero real; el calendario de eventos con el freno activo.' },
    { k: 'mercados-clases', t: 'Mercados por clase', d: 'Cada mercado con su estrategia, precio, última lectura y posición. Resumen de IA por clase.' },
    { k: 'sombra', t: 'Sombra', d: 'Los modos en prueba frente al real, con su último análisis y sus posiciones simuladas.' },
    { k: 'centro-mercados', t: 'Centro de estrategia', d: 'Modo de análisis y, por clase: apagado, sombra o demo, estrategia y tope de posiciones.' },
    { k: 'centro-ia', t: 'IA por tarea', d: 'Proveedor, modelo principal y un modelo para cada tarea, con el ★ recomendado.' },
    { k: 'explorador', t: 'Explorador', d: 'Los ~870 perpetuos USDT de Bitget filtrables por clase, con la opinión de ARIA.' },
    { k: 'diagnostico', t: 'Diagnóstico', d: 'Comprueba en un clic que todo funciona: Bitget, datos, IA, cupo, noticias, eventos y copias.' },
  ],
  toolsTitle: 'Y además',
  tools: [
    ['Tarjeta «Hoy»', 'resultado del día, posiciones cerca del stop, eventos y lo que ve la IA'],
    ['Diario y estadísticas en R', 'cada operación con su ficha, gráfico, nota propia, PDF y CSV (también fiscal)'],
    ['Telegram', 'avisos de entradas, cierres y alertas; se pueden activar por clase'],
    ['Copias de seguridad', 'una al día, se guardan 14; nunca incluyen tus claves'],
    ['Guía dentro de la app', 'primeros pasos, qué mirar cada día y de demo a real'],
    ['Actualizaciones automáticas', 'la app avisa y se actualiza sola'],
  ] as ReadonlyArray<readonly [string, string]>,

  /* ── No hace ── */
  notChip: 'Honestidad',
  notTitle: 'Lo que ARIA no hace',
  nots: [
    'No promete rentabilidad. Publicamos el backtest completo, con su peor racha.',
    'No toca tus fondos: sin permiso de retirada, y tus claves nunca salen de tu equipo.',
    'No pone modos sin validar con dinero real sin avisarte y sin que lo confirmes.',
    'No opera fuera de Bitget Futures ni en mercados que no hayas activado.',
    'No entra antes de la Fed o de unos resultados (fuera de cripto), ni en fin de semana en mercados tradicionales.',
    'No es asesoramiento financiero: es una herramienta que sigue las reglas que tú configuras.',
  ],

  /* ── CTA ── */
  ctaTitle: 'Pruébalo con dinero de mentira',
  ctaSub: 'El modo demo usa la cuenta simulada oficial de Bitget: gratis, sin tarjeta y con todas las funciones.',
  disclaimer:
    'El trading de futuros implica un riesgo significativo de pérdida. Los resultados de backtest y sombra son simulados y no garantizan resultados futuros. Riskeep no ofrece asesoramiento financiero.',
  open: 'Ampliar',
}

const en: typeof es = {
  metaTitle: 'How ARIA works',
  chip: 'How ARIA works',
  title: 'Everything ARIA does,',
  titleAccent: 'no small print',
  subtitle:
    'What it watches, when it enters, how it protects your account, what the AI does and what it never does. With real ARIA 9.0 screenshots and the measured numbers, bad ones included.',
  ctaPrimary: 'Try it free in demo',
  ctaNews: 'What’s new in 9.0',
  ctaGuide: 'Installation guide (PDF)',
  toc: [
    ['ciclo', 'The cycle'],
    ['estrategias', 'Strategies'],
    ['mercados', 'Markets'],
    ['riesgo', 'Risk'],
    ['ia', 'AI'],
    ['sombra', 'Shadow'],
    ['app', 'The app'],
    ['no-hace', 'What it doesn’t do'],
  ],
  heroCaption: 'ARIA 9.0 Home on a demo account: active strategy, BTC regime, per-market votes, the “Today” card and open positions.',
  demoNote: 'Screenshots from a test install with live Bitget prices; sample capital and trades.',

  tocLabel: 'On this page',
  floats: ['Stop placed on Bitget', 'SOL/USDT · +1.68R', 'Event guard on'],

  rTitle: 'What is an R?',
  rBody:
    'It’s what you risk on a trade: the distance from entry to stop. If the stop is hit you lose 1R; if price travels four times that distance in your favour, you make 4R. Measuring in R lets you compare trades regardless of account size.',
  rExample: 'With €1,000 and 0.30% risk, 1R = {r}. +{exp}R per trade is about {avg} per trade on average in the backtest.',
  exTitle: 'One trade, step by step',
  exSub: 'Illustrative example using the backtest’s average winner and average loss. Not a real trade.',
  exLabels: { price: 'Price', entry: 'Entry', stop: 'Initial stop', trail: 'Trailing stop', exit: 'Exit' },
  exSteps: [
    ['Enters', 'The trend turns up and the BTC regime agrees: it buys at 100.'],
    ['Sets the stop', 'At 2 × ATR, at 96.2 (−3.8%). That distance is 1R.'],
    ['Raises it with price', 'As price moves on, the stop follows at 4 × ATR and never goes down.'],
    ['Exits', 'Price turns and hits the stop at 111.8: +11.8%, i.e. +3.1R.'],
  ],
  exNote: 'That’s what winners look like. But most trades end at −1R: Trend wins around {win}% of the time and makes money because winners are much bigger.',
  calcTitle: 'Work out your risk',
  calcSub: 'Move the values and see what the backtest figures would have meant for your account.',
  calcCapital: 'Capital',
  calcRisk: 'Risk per trade',
  calcOneR: '1R: what you risk per trade',
  calcAvg: 'Average per trade in the backtest (+{exp}R)',
  calcStreak: 'Worst streak: {n} losses in a row',
  calcDD: 'Backtest worst drawdown ({dd}R)',
  calcNote: 'Simple maths, no compounding, simulated results: not a forecast.',
  caminoCaption: 'Road to real money: each class with the five criteria and what it still lacks.',
  sombraCaption: 'Comparison in R of the real mode against the shadow modes, and the positions they would have opened.',

  cycleChip: 'Every 15 minutes',
  cycleTitle: 'One cycle, start to finish',
  cycleSub: 'ARIA repeats this loop day and night on your computer. Every step is logged and visible in the app.',
  cycle: [
    { t: 'Reads the market', d: 'Downloads candles, price, funding and news for every market you have enabled on Bitget.' },
    { t: 'Checks the context', d: 'BTC regime (200-candle 4h average), each market’s trend and upcoming events: Fed, CPI, jobs, crude inventories or earnings.' },
    { t: 'Decides whether to enter', d: 'Only when the trend turns in its favour and the regime agrees. The brakes (events, per-class cap, pauses) can say no.' },
    { t: 'Sizes the trade', d: 'Risks a fixed share of your capital (0.30% by default) based on the distance to the stop. Never more.' },
    { t: 'Opens and protects', d: 'Order on Bitget with the stop placed on the exchange itself: if your computer shuts down, the stop stays.' },
    { t: 'Manages and learns', d: 'A stop that trails the price (4 × ATR) lets winners run. On close, the trade goes into the journal with its result in R.' },
  ],

  stratChip: 'Strategies',
  stratTitle: 'One validated strategy. The rest, on trial',
  stratSub: 'ARIA ships four analysis modes. Only one won over a period that wasn’t used to tune it; it’s the default.',
  trendName: '4h Trend',
  trendTag: 'Validated · default',
  trendDesc:
    'Follows each market’s underlying direction on 4-hour candles. Enters only when the trend flips and the BTC regime agrees; initial stop at 2 × ATR and exit via a trailing stop, no fixed target. Few trades, long winners, many small losses. It needs no AI to decide.',
  trendStats: {
    exp: 'per trade',
    pf: 'profit factor',
    trades: 'trades',
    dd: 'worst drawdown',
    streak: 'losses in a row',
    win: 'win rate',
    split: 'Fitting (60%): {train} · Unseen period (40%): {test}',
  },
  trendNote: 'Backtest with fees, slippage and gaps, {from} – {to}, {symbols} crypto markets. Simulated results: they do not guarantee future results.',
  expModes: [
    { n: 'Technical 15m', b: '−0.25R / trade', d: 'Short-term indicators and candle patterns; the AI decides each entry. Measured: no edge.' },
    { n: 'Fundamental', b: 'Not measurable', d: 'News, sentiment and funding; the AI reads the context. Past news can’t be replayed faithfully.' },
    { n: 'Mixed', b: 'Inherits technical', d: 'Technical + fundamental in one analysis. It’s the one measured in shadow for oil, indices and stocks.' },
  ],
  expTag: 'Experimental',
  expNote: 'Experimental modes are only allowed in demo or shadow. To use them with real money ARIA warns you and asks you to confirm.',

  mkChip: 'Multiple markets',
  mkTitle: 'Crypto, gold, oil, indices and stocks',
  mkSub:
    'Bitget offers USDT perpetual futures on much more than crypto. ARIA groups them by class, and each class has its own mode (off, shadow or demo), strategy and position cap.',
  mkCols: ['Class', 'Status', 'What’s measured', 'Recommended'],
  mkRows: [
    ['Crypto', 'Validated', '4h Trend validated out of sample: +0.31R/trade over 253 trades.', '4h Trend'],
    ['Gold & metals', 'Measuring', 'Gold: +0.23R/trade over 4.4 years (+0.19R on unseen data). Silver, negative.', '4h Trend'],
    ['Oil & energy', 'Shadow', 'Trend −0.24R on just 28 trades. Driven by news (OPEC, inventories).', 'Mixed (AI)'],
    ['Indices', 'Shadow', 'Trend −0.59R: on 4h they tend to revert to the mean. Driven by the Fed and CPI.', 'Mixed (AI)'],
    ['Stocks', 'Shadow', 'Trend ≈ 0R over 133 trades. Driven by earnings and launches.', 'Mixed (AI)'],
  ],
  mkTableNote: 'Outside crypto everything ships switched off: you choose which classes to enable and in which mode. None is validated yet.',
  mkPoints: [
    'Explorer with every Bitget USDT perpetual (around 870): price, volume, max leverage and ARIA’s view from its backtests.',
    'No new entries at weekends outside crypto: the underlying market is closed and price can gap at the open.',
    'News per class (Google News, OilPrice, CNBC, Yahoo) and an AI summary of each market every 6 hours.',
    'A trades folder organised by account, class, market and year, with a CSV index.',
  ],
  gradTitle: 'From demo to real money: by criteria, not by gut',
  gradSub: 'A new class only goes live when it meets all five (demo and shadow trades combined):',
  gradCriteria: [
    ['50', 'closed trades'],
    ['56', 'days measured'],
    ['≥ +0.10R', 'average result'],
    ['≥ 1.20', 'profit factor'],
    ['> 0', 'average R at 80% confidence'],
  ],
  gradNote: 'If you want to go earlier, you can: ARIA shows what’s missing, asks you to confirm and logs it.',
  explShotCaption: 'Explorer: every Bitget perpetual with ARIA’s view taken from its backtests.',

  riskChip: 'Risk',
  riskTitle: 'Layer by layer, before every order',
  riskSub: 'You can’t control returns; you can control risk. These are the limits ARIA applies by default (all adjustable).',
  riskLayers: [
    { t: 'Fixed risk per trade', d: '0.30% of capital by default, sized from the real distance to the stop.' },
    { t: 'Stop on the exchange', d: 'Every position opens with its native stop on Bitget, not just on your computer.' },
    { t: 'Max positions', d: '10 in total by default, plus a cap for each class.' },
    { t: 'Event guard', d: 'No entries 60 min before and after the Fed, CPI, jobs or GDP; around crude inventories; 18 h before earnings.' },
    { t: 'Automatic pauses', d: 'Entries stop at a 5% daily loss or a 20% drawdown from the peak.' },
    { t: 'Per-class cut', d: 'If a class on trial drops more than expected (10R for metals), it pauses itself. And you can cut and close it in one click.' },
    { t: 'No withdrawals', d: 'Bitget keys are created without withdrawal permission and stored only on your machine.' },
    { t: 'Stop button', d: '“Pause entries” or “Close all” (typed confirmation). Open positions keep their stop.' },
  ],
  riskHonest:
    'You still lose: the backtest had streaks of {streak} losses in a row and a {dd}R drawdown (≈ 15% of the account at default risk). Start in demo.',

  aiChip: 'Artificial intelligence',
  aiTitle: 'The AI helps. It doesn’t gamble for you',
  aiSub:
    'The validated strategy needs no AI to decide. The AI works where it adds value: giving an opinion, reading news, summarising and simulating new modes. You choose which model does each task.',
  aiTasks: [
    { t: 'Decisions', d: 'In AI modes it decides the entries. Put your best model here.' },
    { t: 'AI analyst', d: 'In 4h Trend it gives a short opinion on each signal. It comments, never blocks.' },
    { t: 'Shadow', d: 'Simulates the AI modes with its own quota (100 calls a day) so the real analysis keeps its own.' },
    { t: 'News', d: 'Classifies 20 headlines per call and summarises each market every 6 hours. A small model is enough.' },
  ],
  aiProviders: 'Gemini, OpenAI, Claude, Groq or a compatible provider; several keys at once. Or everything local with Ollama, depending on nobody.',
  aiPoints: [
    'ARIA marks the recommended model for each task with ★ based on the keys you have, and tracks each one’s daily limit.',
    'If a model runs out of quota it moves to the next; if none is left, the Trend strategy keeps trading as usual.',
    'Headlines are passed to the AI as data, never as instructions.',
  ],
  aiShotCaption: 'Strategy Center › AI per task: one model for each job, with the recommended one marked.',

  shadowChip: 'Shadow modes',
  shadowTitle: 'Test without risking a thing',
  shadowSub:
    'While ARIA trades its strategy, other modes analyse the same markets in parallel and record what they would have done, without sending orders. They get measured on live data before touching your money.',
  shadowPoints: [
    'Comparison in R: the real mode against each shadow mode.',
    'Market by market: what it looked at, what the AI discarded and why.',
    'Same simulator as the backtest: next-candle entry, stops and fees.',
    'Only starts with “Start”, if you want it to. It doesn’t spend the real analysis’ AI quota.',
  ],
  shadowShotCaption: 'Shadow page: parallel modes, their results and the positions they would have opened.',

  appChip: 'The app',
  appTitle: 'A tour of ARIA 9.0',
  appSub: 'It’s a native app for Mac and Windows: it opens in its own window and everything stays on your machine. If that window can’t open, ARIA opens the same dashboard in your browser. Simple mode for everyday use; Advanced if you want to see everything.',
  shots: [
    { k: 'panel', t: 'Home', d: 'Active strategy, BTC regime, each market’s votes, “Today” and your positions.' },
    { k: 'mercados', t: 'Markets', d: 'Every class, its mode and path to real money; the event calendar with the guard on.' },
    { k: 'mercados-clases', t: 'Markets by class', d: 'Each market with its strategy, price, last reading and position. AI summary per class.' },
    { k: 'sombra', t: 'Shadow', d: 'Modes on trial against the real one, with their last analysis and simulated positions.' },
    { k: 'centro-mercados', t: 'Strategy Center', d: 'Analysis mode and, per class: off, shadow or demo, strategy and position cap.' },
    { k: 'centro-ia', t: 'AI per task', d: 'Provider, main model and one model per task, with the ★ recommended one.' },
    { k: 'explorador', t: 'Explorer', d: 'Bitget’s ~870 USDT perpetuals, filterable by class, with ARIA’s view.' },
    { k: 'diagnostico', t: 'Diagnostics', d: 'One-click check that everything works: Bitget, data, AI, quota, news, events and backups.' },
  ],
  toolsTitle: 'And also',
  tools: [
    ['“Today” card', 'the day’s result, positions near their stop, events and what the AI sees'],
    ['Journal and stats in R', 'every trade with its sheet, chart, your own note, PDF and CSV (tax export too)'],
    ['Telegram', 'alerts for entries, exits and warnings; can be set per class'],
    ['Backups', 'one a day, 14 kept; they never include your keys'],
    ['In-app guide', 'first steps, what to check every day and demo to real'],
    ['Automatic updates', 'the app tells you and updates itself'],
  ],

  notChip: 'Honesty',
  notTitle: 'What ARIA doesn’t do',
  nots: [
    'It doesn’t promise returns. We publish the full backtest, worst streak included.',
    'It doesn’t touch your funds: no withdrawal permission, and your keys never leave your machine.',
    'It doesn’t put unvalidated modes on real money without warning you and getting your confirmation.',
    'It doesn’t trade outside Bitget Futures or on markets you haven’t enabled.',
    'It doesn’t enter before the Fed or earnings (outside crypto), nor at weekends on traditional markets.',
    'It isn’t financial advice: it’s a tool that follows the rules you configure.',
  ],

  ctaTitle: 'Try it with play money',
  ctaSub: 'Demo mode uses Bitget’s official simulated account: free, no card, every feature included.',
  disclaimer:
    'Trading futures involves a significant risk of loss. Backtest and shadow results are simulated and do not guarantee future results. Riskeep does not provide financial advice.',
  open: 'Enlarge',
}

export const ariaPage: Record<Lang, typeof es> = { es, en }
