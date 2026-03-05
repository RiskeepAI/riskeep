interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  className?: string
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const variants = {
    blue:   'bg-blue-500/15 text-blue-300 border-blue-500/30',
    green:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    red:    'bg-red-500/15 text-red-300 border-red-500/30',
    purple: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
