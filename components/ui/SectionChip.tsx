interface Props {
  children: React.ReactNode
  color?: 'amber' | 'violet' | 'cyan'
}

const styles = {
  amber:  'border-amber-500/25 bg-amber-500/8  text-amber-400',
  violet: 'border-violet-500/25 bg-violet-500/8 text-violet-400',
  cyan:   'border-cyan-500/25  bg-cyan-500/8   text-cyan-400',
}

export default function SectionChip({ children, color = 'amber' }: Props) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${styles[color]} text-[11px] font-mono uppercase tracking-[0.18em]`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
        color === 'amber'  ? 'bg-amber-400'  :
        color === 'violet' ? 'bg-violet-400' : 'bg-cyan-400'
      }`} />
      {children}
    </div>
  )
}
