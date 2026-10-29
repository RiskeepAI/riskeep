/* ─────────────────────────────────────────────────────────────────────────────
   Resultados REALES del backtest de la estrategia "Tendencia 4h" de ARIA (8.1, vigente en 9.0).

   Generado con el backtest del repo de ARIA (models/backtest.py ·
   run_trend_backtest, 720 días de velas de 4h de Bitget, 10 símbolos), que
   simula cada operación con las mismas reglas que el bot en vivo: comisiones
   maker/taker, deslizamiento en stops, trailing, huecos y cierre por tiempo.
   Reproducible con:  python backtest.py --strategy tendencia --days 720 --walk-forward

   No editar a mano: si cambian la estrategia o los datos, regenerar y
   sustituir. Son resultados SIMULADOS — en la web siempre van acompañados
   del aviso correspondiente (rentabilidades pasadas o simuladas no garantizan
   resultados futuros).
   ───────────────────────────────────────────────────────────────────────────── */

export const BACKTEST = {
  strategy:        'Tendencia 4h',
  generatedAt:     '2026-10-27',
  from:            '2025-03-02',
  to:              '2026-10-25',
  symbols:         10,
  trades:          253,
  winRate:         30.4,          // % de operaciones ganadoras
  expectancyR:     0.311,        // resultado medio por operación, en múltiplos del riesgo (R)
  profitFactor:    1.35,
  totalR:          78.8,
  /* Peor caída y racha en orden CRONOLÓGICO (todos los mercados a la vez, por
     fecha de cierre, como se viven): revisado en ARIA el 28-10-2026. El cálculo
     anterior iba mercado a mercado (36,3R / 9 seguidas) e infravaloraba el riesgo.
     Es la cifra que muestra la propia app (strategy_catalog.TREND_BACKTEST). */
  maxDrawdownR:    48.6,
  maxConsecLosses: 24,
  avgWinPct:       11.843,       // % medio de las ganadoras (sobre el nocional)
  avgLossPct:      -3.832,
  /* Validación fuera de muestra: 60% inicial de las operaciones vs 40% final */
  splitDate:       '2026-05-17',
  trainR:          0.143,
  testR:           0.561,
} as const

/** R acumulado tras cada operación (muestreado), [fecha de entrada, R acumulado] */
export const BACKTEST_CURVE: ReadonlyArray<readonly [string, number]> = [
  ['2025-03-02', -1.02],
  ['2025-03-06', 2.27],
  ['2025-03-16', 0.16],
  ['2025-03-19', -2.94],
  ['2025-03-25', -2.85],
  ['2025-03-27', -3.55],
  ['2025-03-28', -10.25],
  ['2025-03-31', -18.52],
  ['2025-05-29', -22.68],
  ['2025-06-08', -23.88],
  ['2025-06-14', -25.28],
  ['2025-06-15', -28.4],
  ['2025-06-17', -31.35],
  ['2025-06-24', -32.75],
  ['2025-06-30', -10.96],
  ['2025-06-30', -3.18],
  ['2025-08-27', 1.49],
  ['2025-09-16', -1.12],
  ['2025-09-22', -4.31],
  ['2025-09-24', -7.45],
  ['2025-09-25', -3.54],
  ['2025-11-25', 9.02],
  ['2025-12-10', 15.72],
  ['2025-12-11', 17.93],
  ['2025-12-12', 28.29],
  ['2025-12-17', 26.72],
  ['2025-12-25', 37.22],
  ['2026-03-10', 37.73],
  ['2026-03-12', 34.63],
  ['2026-03-13', 31.53],
  ['2026-03-14', 28.43],
  ['2026-03-18', 26.2],
  ['2026-03-19', 26.4],
  ['2026-03-22', 23.88],
  ['2026-03-24', 21.81],
  ['2026-03-27', 20.67],
  ['2026-03-27', 18.19],
  ['2026-04-03', 15.28],
  ['2026-04-08', 14.12],
  ['2026-04-08', 12.52],
  ['2026-04-13', 9.39],
  ['2026-04-15', 12.04],
  ['2026-04-16', 10.84],
  ['2026-04-20', 8.31],
  ['2026-04-27', 6.26],
  ['2026-04-29', 3.52],
  ['2026-04-30', 11.2],
  ['2026-05-01', 21.16],
  ['2026-05-07', 23.37],
  ['2026-05-08', 22.9],
  ['2026-05-17', 21.54],
  ['2026-05-18', 20.09],
  ['2026-05-19', 31.51],
  ['2026-05-23', 30.32],
  ['2026-05-25', 42.89],
  ['2026-06-20', 43.84],
  ['2026-06-22', 46.16],
  ['2026-06-30', 46.23],
  ['2026-07-06', 44.13],
  ['2026-07-08', 41.88],
  ['2026-07-12', 38.72],
  ['2026-07-14', 35.57],
  ['2026-07-17', 33.87],
  ['2026-07-18', 32.66],
  ['2026-07-21', 31.75],
  ['2026-07-27', 32.11],
  ['2026-07-30', 33.25],
  ['2026-08-03', 30.34],
  ['2026-08-08', 29.12],
  ['2026-08-11', 26.79],
  ['2026-08-18', 30.75],
  ['2026-08-20', 50.84],
  ['2026-09-01', 70.99],
  ['2026-09-11', 67.87],
  ['2026-09-12', 65.15],
  ['2026-09-14', 63.32],
  ['2026-09-18', 72.41],
  ['2026-09-18', 83.51],
  ['2026-09-19', 88.86],
  ['2026-10-07', 91.68],
  ['2026-10-08', 88.53],
  ['2026-10-09', 85.98],
  ['2026-10-13', 83.65],
  ['2026-10-21', 80.56],
  ['2026-10-25', 78.78],
]
