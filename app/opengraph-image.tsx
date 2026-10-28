import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { BACKTEST_CURVE } from '@/lib/data/backtest'

// Imagen para compartir en redes (WhatsApp, X, LinkedIn, Telegram…). Antes
// solo existía el logo cuadrado de 512 px, que se ve diminuto en las tarjetas.
export const alt = 'Riskeep — ARIA, agente de trading autónomo para Bitget'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo-r.png'))
  // Ojo: logo-r.png es en realidad un JPEG (por eso el tipo del data URI)
  const logoSrc = `data:image/jpeg;base64,${logo.toString('base64')}`

  // Curva real del backtest como elemento visual de fondo
  const vals = BACKTEST_CURVE.map(([, r]) => r)
  const min = Math.min(0, ...vals), max = Math.max(...vals), n = vals.length
  const pts = vals.map((r, i) => `${(i / (n - 1)) * 1200},${615 - ((r - min) / (max - min)) * 120}`).join(' ')

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '64px 72px',
        background: 'linear-gradient(135deg, #040e1f 0%, #0a0f1e 55%, #120a24 100%)',
        color: '#dbe6fe', position: 'relative',
      }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
          <polyline points={pts} fill="none" stroke="#22C55E" strokeOpacity="0.45" strokeWidth="4" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} style={{ borderRadius: 14 }} alt="" />
          <span style={{ fontSize: 40, fontWeight: 700, color: '#ffffff' }}>Riskeep</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>
            ARIA opera las 24 horas
          </div>
          <div style={{ fontSize: 34, color: '#9aa6c4', maxWidth: 900, lineHeight: 1.3 }}>
            Agente de trading autónomo para Bitget Futures, con una estrategia medida antes de operar.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {['Modo demo gratis', 'Stop nativo en Bitget', 'Windows · macOS'].map(tag => (
            <div key={tag} style={{
              display: 'flex', padding: '10px 20px', borderRadius: 999, fontSize: 24,
              border: '1px solid rgba(245,158,11,0.45)', color: '#FBBF24', background: 'rgba(245,158,11,0.08)',
            }}>{tag}</div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
