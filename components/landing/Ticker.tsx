'use client'

import { useT } from '@/lib/i18n/LanguageContext'

const ICONS = ['⚡', '🛡️', '📄', '🔗', '📱', '🧠', '📈', '⚡', '🔒', '🤖', '📉', '🔀']

function TickerItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-6 text-sm text-slate-400 whitespace-nowrap">
      <span className="text-base">{icon}</span>
      <span>{text}</span>
      <span className="ml-6 text-slate-700">·</span>
    </span>
  )
}

export default function Ticker() {
  const t = useT()
  const items = t.ticker.map((text, i) => ({ icon: ICONS[i] ?? '·', text }))
  const all = [...items, ...items]

  return (
    <div className="relative py-5 border-y border-white/6 bg-white/[0.012] overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020810] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020810] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-ticker">
        {all.map((item, i) => (
          <TickerItem key={i} icon={item.icon} text={item.text} />
        ))}
      </div>
    </div>
  )
}
