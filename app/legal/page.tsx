'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  AlertTriangle, Shield, Monitor, Brain, Puzzle,
  Gamepad2, BarChart3, Wrench, MessageSquare,
  ArrowLeft, Apple, AppWindow, Terminal,
  Lock, Info, ChevronRight, FileText,
  UserCheck, Key, Globe, CreditCard,
  Database, Scale, BookOpen, Copyright,
} from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────── */
type MainTab = 'legal' | 'tos' | 'requisitos' | 'instalacion'
type OsTab   = 'mac' | 'win' | 'lin'

/* ═══════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════ */

function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${color}`}>
      {children}
    </span>
  )
}

function SectionHeader({ icon, iconBg, title, sub }: {
  icon: React.ReactNode; iconBg: string; title: string; sub: string
}) {
  return (
    <div className="flex items-start gap-4 mb-7">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h2 className="font-bold text-[1.45rem] text-white leading-tight">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  )
}

function Alert({ type, title, children }: {
  type: 'yellow' | 'red' | 'blue' | 'green' | 'purple'
  title: string
  children: React.ReactNode
}) {
  const styles = {
    yellow: 'bg-amber-500/8  border-amber-500/25  text-amber-400',
    red:    'bg-rose-500/8   border-rose-500/22   text-rose-400',
    blue:   'bg-blue-500/8   border-blue-500/22   text-blue-400',
    green:  'bg-emerald-500/7 border-emerald-500/20 text-emerald-400',
    purple: 'bg-purple-500/8  border-purple-500/22  text-purple-400',
  }
  const icons = {
    yellow: <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    red:    <Shield        className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    blue:   <Info          className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    green:  <Lock          className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    purple: <Scale         className="w-5 h-5 flex-shrink-0 mt-0.5" />,
  }
  return (
    <div className={`flex gap-3.5 rounded-xl p-4 border mb-3.5 ${styles[type]}`}>
      {icons[type]}
      <div>
        <p className="font-semibold text-sm mb-1 text-white">{title}</p>
        <div className="text-sm text-slate-400 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/7 bg-[#080f22]/60 backdrop-blur-md p-7 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}>
      {children}
    </div>
  )
}

function DocList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
          <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Numbered obligation list with stronger visual */
function ObligationList({ items }: { items: { title: string; desc: string | React.ReactNode }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[.025] border border-white/8 hover:border-white/14 transition-colors">
          <span className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center font-mono text-[11px] text-blue-400 flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Key-value definition row */
function DefRow({ term, def }: { term: string; def: string | React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-4 border-b border-white/6 last:border-0">
      <dt className="text-xs font-mono tracking-widest uppercase text-slate-500 sm:w-40 flex-shrink-0 mb-1 sm:mb-0 mt-0.5">{term}</dt>
      <dd className="text-sm text-slate-400 leading-relaxed flex-1">{def}</dd>
    </div>
  )
}

function Divider() {
  return <div className="h-px my-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
}

function DocTable({ headers, rows }: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left text-[10px] font-mono tracking-widest uppercase text-slate-500 py-2.5 px-3 border-b border-white/10">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="group hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="py-3.5 px-3 border-b border-white/6 text-slate-400 leading-relaxed align-top group-last:border-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Tag({ color = 'blue', children }: { color?: 'blue' | 'green' | 'purple' | 'yellow'; children: React.ReactNode }) {
  const s = {
    blue:   'bg-blue-500/12   text-blue-400   border-blue-500/25',
    green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    purple: 'bg-purple-500/10 text-purple-400  border-purple-500/25',
    yellow: 'bg-amber-500/10  text-amber-400   border-amber-500/25',
  }
  return <span className={`inline-block font-mono text-[10px] px-2 py-0.5 rounded border ${s[color]}`}>{children}</span>
}

function ModeCard({ emoji, label, name, desc, nameColor }: {
  emoji: string; label: string; name: string; desc: string; nameColor: string
}) {
  return (
    <Card className="hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <p className="text-[10px] font-mono tracking-widest uppercase text-slate-600 mb-2">{label}</p>
      <p className={`font-bold text-base mb-2 ${nameColor}`}>{emoji} {name}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </Card>
  )
}

function Step({ num, title, children, last = false }: {
  num: number; title: string; children: React.ReactNode; last?: boolean
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-500/12 border-2 border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm text-blue-400 z-10">
          {num}
        </div>
        {!last && <div className="w-0.5 flex-1 mt-1 bg-gradient-to-b from-blue-500/30 to-transparent min-h-[28px]" />}
      </div>
      <div className={`pb-8 ${last ? 'pb-2' : ''}`}>
        <p className="font-semibold text-white text-sm mb-1.5">{title}</p>
        <div className="text-sm text-slate-400 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[11px] bg-white/7 border border-white/12 rounded px-1.5 py-0.5 text-cyan-400">
      {children}
    </code>
  )
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      }`}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TAB 01 — AVISO LEGAL & RIESGO
   ═══════════════════════════════════════════════════════════ */
function TabLegal() {
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      {/* ── RESPONSABILIDAD DIRECTA DEL USUARIO ── */}
      <Reveal>
        <Chip color="text-rose-400 bg-rose-500/8 border-rose-500/20">⚠️ Aviso principal</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<UserCheck className="w-5 h-5 text-rose-400" />}
            iconBg="bg-rose-500/10 border border-rose-500/22"
            title="El Usuario es Responsable de sus Operaciones"
            sub="Este es el punto más importante de toda esta documentación"
          />
        </div>
      </Reveal>

      <Reveal delay={130}>
        <div className="rounded-2xl border-2 border-rose-500/35 bg-rose-500/6 p-6 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white text-base block mb-2">
              Riskeep es un software de automatización de trading. Todas las decisiones de inversión son del usuario.
            </strong>
            ARIA analiza los mercados y, según la configuración elegida por el usuario, puede proponer o ejecutar operaciones.
            Sin embargo, <strong className="text-rose-300">el usuario es el único responsable</strong> de:
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {[
              'Configurar correctamente los límites de riesgo antes de operar',
              'Elegir el modo de operación adecuado a su perfil (Observe, Manual, Auto)',
              'Decidir cuándo activar el modo REAL y con qué capital',
              'Supervisar las operaciones abiertas en cualquier momento',
              'Mantener sus claves API de Binance activas y con los permisos correctos',
              'Verificar que el trading de criptomonedas es legal en su país o región',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500 border-t border-white/8 pt-4">
            <strong className="text-slate-400">Riskeep.com y sus desarrolladores no se hacen responsables de ninguna pérdida financiera</strong> derivada
            del uso del software, ya sea en modo paper o real, independientemente de la causa.
          </p>
        </div>
      </Reveal>

      <Divider />

      {/* ── RIESGO FINANCIERO ── */}
      <Reveal>
        <Chip color="text-amber-400 bg-amber-500/10 border-amber-500/22">⚠️ Riesgo financiero</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
            iconBg="bg-amber-500/12 border border-amber-500/22"
            title="Advertencia de Riesgo"
            sub="El trading de futuros con apalancamiento puede resultar en pérdida total del capital"
          />
        </div>
      </Reveal>

      <Reveal delay={130}>
        <Alert type="yellow" title="Trading de alto riesgo — Capital en riesgo">
          El trading de futuros con apalancamiento conlleva un riesgo elevado de pérdida de capital.
          ARIA incluye múltiples capas de protección, pero{' '}
          <strong className="text-white">ningún sistema elimina el riesgo inherente a los mercados financieros</strong>.
          Opera exclusivamente con capital que puedas permitirte perder en su totalidad.
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <DocList items={[
            <span key="1">Aunque ARIA incorpora <strong className="text-white">stop-loss dinámico, trailing stops y limitación de drawdown</strong>, el riesgo de pérdidas siempre existe y puede superar los límites configurados en condiciones extremas de mercado.</span>,
            <span key="2">Los resultados en <strong className="text-white">modo PAPER (Binance Testnet)</strong> son simulaciones en condiciones ideales y no garantizan rendimiento futuro en modo REAL.</span>,
            <span key="3">ARIA <strong className="text-white">no constituye asesoramiento financiero, legal ni fiscal</strong>. Consulta siempre con un profesional regulado antes de invertir.</span>,
            'Los mercados de criptomonedas son altamente volátiles. Las estrategias de ARIA se optimizan continuamente, pero no pueden predecir eventos exógenos: anuncios regulatorios, hacks de exchanges, crisis macroeconómicas.',
            <span key="5">Recomendamos un mínimo de <strong className="text-white">30 días en modo PAPER</strong> con resultados consistentes antes de activar el modo REAL.</span>,
            'El apalancamiento amplifica tanto las ganancias como las pérdidas. Un apalancamiento elevado puede resultar en la liquidación total de la posición.',
          ]} />
        </Card>
      </Reveal>

      <Divider />

      {/* ── LIMITACIÓN DE RESPONSABILIDAD ── */}
      <Reveal>
        <Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">🛡️ Limitación de responsabilidad</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Shield className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/12 border border-blue-500/22"
            title="Descargo de Responsabilidad"
            sub="Alcance completo de la limitación de responsabilidad de Riskeep.com"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            <DefRow term="Pérdidas financieras" def={<span><strong className="text-white">Riskeep.com y sus desarrolladores no asumen ninguna responsabilidad</strong> por pérdidas financieras derivadas del uso de ARIA, en cualquier modo de operación, incluyendo pérdidas causadas por errores del software, fallos de conectividad o decisiones del sistema de IA.</span>} />
            <DefRow term="Fallos técnicos" def="No asumimos responsabilidad por interrupciones del servicio, fallos de hardware, caídas de red, errores del sistema operativo o cualquier fallo técnico que impida la ejecución correcta de órdenes o el cierre de posiciones." />
            <DefRow term="APIs de terceros" def="No asumimos responsabilidad por cambios en la API de Binance, mantenimiento programado del exchange, suspensión de cuentas por parte del exchange, o cualquier acción de terceros que afecte a la operativa de ARIA." />
            <DefRow term="Calidad de datos" def="La exactitud de los análisis de ARIA depende de la calidad de los datos de mercado en tiempo real. Datos erróneos, retrasos o interrupciones en los feeds de datos pueden afectar las decisiones del sistema." />
            <DefRow term="Ejecución de órdenes" def="Riskeep.com no garantiza la ejecución de órdenes al precio mostrado en el análisis. El slippage, la liquidez del mercado y las condiciones del exchange son factores externos fuera de nuestro control." />
            <DefRow term="Continuidad del servicio" def={<span>Riskeep.com se reserva el derecho de <strong className="text-white">modificar, suspender o discontinuar</strong> el software o cualquiera de sus funcionalidades con notificación previa razonable a los suscriptores activos.</span>} />
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── RESTRICCIONES GEOGRÁFICAS ── */}
      <Reveal>
        <Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">🌍 Restricciones geográficas</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Globe className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/12 border border-purple-500/22"
            title="Uso en Jurisdicciones Restringidas"
            sub="El usuario es responsable de verificar la legalidad del trading en su país"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="purple" title="Verifica la legalidad en tu jurisdicción antes de usar ARIA">
          El trading de criptomonedas y futuros está regulado de forma diferente en cada país.
          En algunas jurisdicciones puede estar restringido o completamente prohibido.{' '}
          <strong className="text-white">Es responsabilidad exclusiva del usuario</strong> asegurarse
          de que el uso de ARIA cumple con la legislación vigente en su país o región.
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <DocList items={[
            <span key="1"><strong className="text-white">Riskeep.com no verifica ni asume responsabilidad</strong> sobre la legalidad del uso del software en ninguna jurisdicción específica.</span>,
            'El usuario debe consultar con un asesor legal local antes de operar con futuros de criptomonedas si tiene dudas sobre la regulación aplicable.',
            'Países donde el trading de criptomonedas está restringido o prohibido incluyen, pero no se limitan a: China, Algeria, Bangladesh, Bolivia, Ecuador, Nepal, entre otros.',
            <span key="4">El incumplimiento de las leyes locales es <strong className="text-white">responsabilidad exclusiva del usuario</strong>. Riskeep.com no puede ser considerado responsable de las consecuencias legales del uso del software en jurisdicciones donde esté restringido.</span>,
          ]} />
        </Card>
      </Reveal>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TAB 02 — TÉRMINOS DE SERVICIO
   ═══════════════════════════════════════════════════════════ */
function TabTOS() {
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      {/* ── OBLIGACIONES DEL USUARIO ── */}
      <Reveal>
        <Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">📋 Obligaciones</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<UserCheck className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/12 border border-blue-500/22"
            title="Obligaciones del Usuario"
            sub="Al usar ARIA, el usuario acepta estas condiciones de uso"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <ObligationList items={[
          {
            title: 'Uso personal y no transferible',
            desc: 'La licencia de ARIA es personal e intransferible. Queda prohibido ceder, sublicenciar, vender o compartir el acceso al software con terceros. Cada suscripción cubre una instalación para uso personal.',
          },
          {
            title: 'Seguridad de credenciales — No compartir API keys',
            desc: <span>El usuario se compromete a <strong className="text-white">mantener en estricta confidencialidad</strong> sus claves API de Binance y credenciales de Riskeep. Está <strong className="text-white">expresamente prohibido</strong> compartir, publicar o transmitir claves API en foros, redes sociales, repositorios de código o cualquier medio público. El incumplimiento puede resultar en pérdida total de fondos y cancelación inmediata de la suscripción.</span>,
          },
          {
            title: 'Uso lícito exclusivamente',
            desc: 'Queda prohibido usar ARIA para actividades ilegales, manipulación de mercado, lavado de dinero, evasión de controles de capital o cualquier actividad que infrinja la legislación aplicable o las condiciones de uso de Binance.',
          },
          {
            title: 'No ingeniería inversa ni modificación no autorizada',
            desc: 'Está prohibido realizar ingeniería inversa, decompilar, desensamblar o intentar obtener el código fuente de ARIA. Tampoco está permitido modificar, parchear o alterar el software sin autorización expresa por escrito de Riskeep.com.',
          },
          {
            title: 'Configuración responsable del riesgo',
            desc: 'El usuario se compromete a configurar parámetros de riesgo adecuados a su perfil antes de operar en modo REAL. No está permitido usar el software con capital que no puedas permitirte perder o con configuraciones de riesgo extremas de forma irresponsable.',
          },
          {
            title: 'Uso de una sola cuenta de Binance por suscripción',
            desc: 'Cada suscripción cubre la conexión con una cuenta de Binance Testnet y una cuenta de Binance Live. No está permitido usar una sola suscripción para gestionar múltiples cuentas de terceros.',
          },
        ]} />
      </Reveal>

      <Divider />

      {/* ── SEGURIDAD DE API KEYS ── */}
      <Reveal>
        <Chip color="text-rose-400 bg-rose-500/8 border-rose-500/20">🔑 Seguridad crítica</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Key className="w-5 h-5 text-rose-400" />}
            iconBg="bg-rose-500/10 border border-rose-500/22"
            title="Seguridad de las API Keys"
            sub="Las claves API dan acceso directo a tus fondos — protégelas como una contraseña bancaria"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="red" title="Una API key comprometida puede resultar en pérdida total de fondos">
          Tus claves API de Binance son equivalentes a la llave de tu cuenta bancaria.
          Si un tercero obtiene acceso a ellas, puede vaciar tu cuenta de forma irreversible.
          ARIA almacena las claves únicamente en tu equipo local (<Code>~/.env</Code>).
          Riskeep.com nunca las ve ni las almacena en servidores.
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-4">Mejores prácticas obligatorias</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '✅', title: 'Permiso mínimo necesario', desc: 'Crea la API key con solo los permisos que ARIA necesita: Lectura + Futuros. Nunca habilites "Retirada de fondos".' },
              { icon: '✅', title: 'Restricción por IP', desc: 'En Binance, restringe la API key a la IP de tu equipo. Esto evita su uso desde otras ubicaciones aunque sea comprometida.' },
              { icon: '✅', title: 'Renovación periódica', desc: 'Regenera las API keys cada 3–6 meses como medida de seguridad preventiva. ARIA facilita la actualización desde el panel.' },
              { icon: '✅', title: 'Monitoriza la actividad', desc: 'Revisa regularmente el historial de órdenes en Binance para detectar cualquier actividad no autorizada.' },
              { icon: '❌', title: 'Nunca compartas las keys', desc: 'Bajo ningún concepto compartas tus API keys en foros, chats, GitHub, Discord o con ninguna persona.' },
              { icon: '❌', title: 'No las pongas en la nube', desc: 'Nunca subas el archivo .env a GitHub, Dropbox, Google Drive u otro servicio en la nube.' },
            ].map((item, i) => (
              <div key={i} className={`p-3.5 rounded-xl border text-sm ${item.icon === '✅' ? 'bg-emerald-500/5 border-emerald-500/15' : 'bg-rose-500/5 border-rose-500/15'}`}>
                <p className="font-semibold text-white mb-1">{item.icon} {item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Divider />

      {/* ── PROPIEDAD INTELECTUAL ── */}
      <Reveal>
        <Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">©️ Propiedad intelectual</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Copyright className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/12 border border-purple-500/22"
            title="Propiedad Intelectual"
            sub="ARIA, Riskeep y todos los componentes del sistema son propiedad exclusiva de Riskeep.com"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            <DefRow term="Software ARIA" def={<span>El software ARIA, incluyendo su código fuente, arquitectura, algoritmos de trading, sistema de memoria episódica y motor de riesgo, son <strong className="text-white">propiedad exclusiva de Riskeep.com</strong> y están protegidos por las leyes de propiedad intelectual aplicables.</span>} />
            <DefRow term="Marca Riskeep" def="La marca Riskeep, el logo, el nombre ARIA y cualquier identidad visual asociada son marcas registradas o en proceso de registro de Riskeep.com. Su uso no autorizado está prohibido." />
            <DefRow term="Modelos y LoRAs" def={<span>Los <strong className="text-white">LoRAs de especialización</strong> desarrollados por Riskeep (aria-btc-patterns, aria-news-sentiment, aria-risk-adaptive) son propiedad de Riskeep.com. Los modelos base (qwen2.5, phi4-mini, nomic-embed-text) pertenecen a sus respectivos creadores bajo sus licencias correspondientes.</span>} />
            <DefRow term="Datos del usuario" def="Los datos generados por el uso de ARIA (historial de trades, episodios de memoria, logs) pertenecen al usuario. Riskeep.com no recopila ni tiene acceso a estos datos, que se almacenan exclusivamente en el equipo local del usuario." />
            <DefRow term="Licencia de uso" def="Al suscribirse, el usuario obtiene una licencia de uso personal, no exclusiva, no transferible y revocable del software ARIA. Esta licencia no implica ninguna transferencia de derechos de propiedad intelectual." />
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── SUSCRIPCIÓN Y PAGOS ── */}
      <Reveal>
        <Chip color="text-emerald-400 bg-emerald-500/8 border-emerald-500/20">💳 Suscripción</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<CreditCard className="w-5 h-5 text-emerald-400" />}
            iconBg="bg-emerald-500/12 border border-emerald-500/22"
            title="Suscripción y Pagos"
            sub="Facturación gestionada por Stripe — la información de pago nunca toca los servidores de Riskeep"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="green" title="Pagos seguros procesados por Stripe">
          Toda la facturación se gestiona a través de <strong className="text-white">Stripe</strong>, un procesador de pagos certificado PCI DSS nivel 1.
          Riskeep.com nunca almacena ni tiene acceso a los datos de tu tarjeta de crédito.
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <dl>
            <DefRow term="Facturación" def="La suscripción se factura mensual o anualmente según el plan elegido. El cargo se realiza automáticamente al inicio de cada período de facturación." />
            <DefRow term="Cancelación" def={<span>Puedes cancelar la suscripción en cualquier momento desde tu panel en riskeep.com. La cancelación tiene efecto al final del período de facturación activo. <strong className="text-white">No se realizan reembolsos prorrateados</strong> por el tiempo no utilizado.</span>} />
            <DefRow term="Período de prueba" def="Si se ofrece un período de prueba gratuito, este se especificará en la página de precios. Pasado el período, la suscripción se convierte automáticamente en de pago salvo cancelación previa." />
            <DefRow term="Cambios de precio" def="Riskeep.com se reserva el derecho de modificar los precios con un preaviso mínimo de 30 días por email. Los cambios de precio no afectan a los períodos de facturación ya pagados." />
            <DefRow term="Suspensión" def="El impago reiterado o la violación de los términos de uso puede resultar en la suspensión inmediata de la suscripción y el acceso al software." />
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── PRIVACIDAD DE DATOS ── */}
      <Reveal>
        <Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">🔒 Privacidad</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Database className="w-5 h-5 text-cyan-400" />}
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
            title="Privacidad y Datos"
            sub="Qué datos se almacenan, dónde y quién tiene acceso a ellos"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <DocTable
            headers={['Dato', 'Almacenamiento', 'Acceso de Riskeep']}
            rows={[
              [<strong key="1" className="text-white">API keys de Binance</strong>,       <span key="l">Local · <Code>~/.env</Code></span>,                  <Tag key="t" color="green">Ninguno</Tag>],
              [<strong key="2" className="text-white">Historial de trades</strong>,        <span key="l">Local · <Code>~/ARIA_data/</Code></span>,             <Tag key="t" color="green">Ninguno</Tag>],
              [<strong key="3" className="text-white">Episodios de memoria</strong>,       <span key="l">Local · ChromaDB</span>,                             <Tag key="t" color="green">Ninguno</Tag>],
              [<strong key="4" className="text-white">Logs del sistema</strong>,           <span key="l">Local · <Code>~/ARIA_data/logs/</Code></span>,        <Tag key="t" color="green">Ninguno</Tag>],
              [<strong key="5" className="text-white">Email y datos de cuenta</strong>,    'Servidores de Riskeep (Supabase)',                                 <Tag key="t" color="yellow">Solo gestión</Tag>],
              [<strong key="6" className="text-white">Datos de pago</strong>,              'Stripe (nunca Riskeep)',                                           <Tag key="t" color="green">Ninguno</Tag>],
              [<strong key="7" className="text-white">Telemetría / analytics</strong>,     'Google Tag Manager (anonimizado)',                                 <Tag key="t" color="yellow">Agregado</Tag>],
            ]}
          />
        </Card>
      </Reveal>

      <Divider />

      {/* ── JURISDICCIÓN ── */}
      <Reveal>
        <Chip color="text-slate-400 bg-slate-500/8 border-slate-500/20">⚖️ Jurisdicción</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Scale className="w-5 h-5 text-slate-400" />}
            iconBg="bg-slate-500/10 border border-slate-500/20"
            title="Ley Aplicable y Resolución de Disputas"
            sub="Marco legal que rige la relación entre Riskeep.com y el usuario"
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            <DefRow term="Ley aplicable" def="Estos términos se rigen por la legislación española y la normativa de la Unión Europea aplicable, incluyendo el Reglamento General de Protección de Datos (RGPD)." />
            <DefRow term="Resolución de disputas" def="Cualquier disputa derivada del uso de ARIA o de estos términos se intentará resolver en primera instancia de forma amistosa. Si no fuera posible, las partes se someten a la jurisdicción de los tribunales competentes del domicilio social de Riskeep.com." />
            <DefRow term="Idioma" def="En caso de discrepancia entre versiones del contrato en distintos idiomas, prevalecerá la versión en español." />
            <DefRow term="Separabilidad" def="Si alguna cláusula de estos términos fuera declarada nula o inaplicable, el resto de las cláusulas permanecerán en plena vigencia." />
            <DefRow term="Última actualización" def="06 de marzo de 2026. Riskeep.com se reserva el derecho de actualizar estos términos con notificación a los usuarios con al menos 15 días de antelación." />
          </dl>
        </Card>
      </Reveal>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TAB 03 — REQUISITOS & FUNCIONALIDAD
   ═══════════════════════════════════════════════════════════ */
function TabRequisitos() {
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      <div>
        <Reveal><Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">💻 Hardware &amp; Software</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Monitor className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-500/12 border border-blue-500/22" title="Requisitos del Sistema" sub="Hardware mínimo para ejecutar ARIA con los 3 modelos LLM locales" /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={['Componente', 'Recomendado', 'Notas']}
              rows={[
                [<strong key="1" className="text-white">CPU</strong>, 'Apple M1/M2/M4 · Intel i5+ · AMD Ryzen 5+', 'Mínimo 4 núcleos físicos'],
                [<strong key="2" className="text-white">RAM</strong>, '16 GB', <span key="n">Para 3 modelos LLM locales simultáneos<br /><span className="text-slate-600 text-xs">8 GB mínimo · con intercambio a disco</span></span>],
                [<strong key="3" className="text-white">Almacenamiento</strong>, '500 GB libres (SSD)', 'SSD recomendado para logs y embeddings'],
                [<strong key="4" className="text-white">Sistema Operativo</strong>, 'macOS 13+ · Windows 11+ · Ubuntu 22+', 'La app detecta Ollama y configura modelos automáticamente'],
                [<strong key="5" className="text-white">Conectividad</strong>, 'Internet estable', 'Necesaria para Binance API y feeds de noticias en tiempo real'],
              ]}
            />
          </Card>
        </Reveal>
        <Reveal delay={190}>
          <Alert type="blue" title="Soporte multiplataforma">
            ARIA está principalmente validado en <strong className="text-white">Apple Silicon (M1/M2/M4)</strong>.
            El soporte cubre Windows y Linux. El rendimiento de inferencia puede variar según la GPU/CPU disponible.
          </Alert>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">🧠 Modelos LLM</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Brain className="w-5 h-5 text-purple-400" />} iconBg="bg-purple-500/12 border border-purple-500/22" title="Modelos de Inteligencia Artificial" sub="Todos los modelos se ejecutan localmente vía Ollama — ningún dato financiero sale del equipo" /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={['Modelo', 'RAM', 'Función', 'Descarga']}
              rows={[
                [<strong key="1" className="text-white font-mono text-xs">qwen2.5:14b</strong>, '~10 GB', 'LLM principal — análisis de mercado, razonamiento y decisiones de trading', <Tag key="t1" color="purple">Automática</Tag>],
                [<strong key="2" className="text-white font-mono text-xs">phi4-mini</strong>, '~2.5 GB', 'LLM ligero — sentimiento de noticias y análisis de episodios de memoria', <Tag key="t2" color="purple">Automática</Tag>],
                [<strong key="3" className="text-white font-mono text-xs">nomic-embed-text</strong>, '~274 MB', 'Embeddings vectoriales para ChromaDB — búsqueda semántica de episodios históricos', <Tag key="t3" color="purple">Automática</Tag>],
              ]}
            />
          </Card>
        </Reveal>
        <Reveal delay={190}>
          <Alert type="green" title="Privacidad total — inferencia 100% local">
            Todos los modelos corren localmente. Los datos de mercado, claves API, historial de trades
            y episodios de memoria <strong className="text-white">nunca se envían a servidores externos</strong>.
          </Alert>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">🧩 LoRAs opcionales</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Puzzle className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title="LoRAs de Especialización" sub="Adaptadores ligeros que mejoran la predicción en patrones técnicos específicos" /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={['LoRA', 'Tamaño', 'Especialización', 'Activación']}
              rows={[
                [<strong key="1" className="text-white font-mono text-xs">aria-btc-patterns</strong>, '~80 MB', 'Patrones de velas en BTC/USDT — divergencias RSI, soportes clave', <Tag key="t1" color="green">Automática</Tag>],
                [<strong key="2" className="text-white font-mono text-xs">aria-news-sentiment</strong>, '~60 MB', 'Análisis de sentimiento de noticias crypto en múltiples idiomas', <Tag key="t2" color="green">Automática</Tag>],
                [<strong key="3" className="text-white font-mono text-xs">aria-risk-adaptive</strong>, '~120 MB', 'Gestión de riesgo adaptativa según condiciones de mercado', <Tag key="t3" color="green">Automática</Tag>],
                [<strong key="4" className="text-white font-mono text-xs">LoRAs personalizadas</strong>, 'Variable', <span key="d">Añade las tuyas en <Code>~/ARIA_data/loras/</Code></span>, <Tag key="t4" color="yellow">Detección auto</Tag>],
              ]}
            />
          </Card>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">🎮 Modos de operación</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Gamepad2 className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title="Modos de Operación" sub="5 modos combinables para cualquier perfil de riesgo" /></div></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            { emoji:'👁️', label:'Modo análisis',   name:'Observe', desc:'Solo analiza mercados y registra episodios. No ejecuta operaciones.',           nameColor:'text-cyan-400',   delay:70  },
            { emoji:'✋', label:'Semi-automático', name:'Manual',  desc:'ARIA propone operaciones. El usuario las aprueba o rechaza en tiempo real.',     nameColor:'text-amber-400',  delay:140 },
            { emoji:'🤖', label:'Autónomo',        name:'Auto',    desc:'Opera automáticamente dentro de los límites de riesgo configurados.',            nameColor:'text-purple-400', delay:210 },
            { emoji:'📄', label:'Cuenta demo',     name:'Paper',   desc:'Simulación completa en Binance Testnet. Sin dinero real.',                       nameColor:'text-blue-400',   delay:280 },
            { emoji:'💰', label:'Cuenta real',     name:'Real',    desc:'Operativa con capital real en Binance Futures. Requiere 30 días en paper previo.',nameColor:'text-rose-400',   delay:350 },
          ].map((m) => (
            <Reveal key={m.name} delay={m.delay}>
              <ModeCard {...m} />
            </Reveal>
          ))}
        </div>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-emerald-400 bg-emerald-500/8 border-emerald-500/20">📊 Protección de capital</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<BarChart3 className="w-5 h-5 text-emerald-400" />} iconBg="bg-emerald-500/12 border border-emerald-500/22" title="Gestión de Riesgo" sub="Sistema multicapa de protección integrado en ARIA" /></div></Reveal>
        <Reveal delay={130}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {['Stop-loss dinámico por operación','Trailing stop por movimiento de precio','Drawdown máximo configurable','Límite de pérdida diaria','Máximo de posiciones simultáneas','Riesgo adaptativo por racha de pérdidas','Confianza mínima por operación','Funding rate awareness en futuros','Timeout automático de posiciones','Pausa automática al alcanzar límites'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/14 hover:bg-emerald-500/9 hover:border-emerald-500/25 transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] flex-shrink-0" />
                <span className="text-sm text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TAB 04 — INSTALACIÓN
   ═══════════════════════════════════════════════════════════ */
function TabInstalacion() {
  const [os, setOs] = useState<OsTab>('mac')

  const osTabs: { id: OsTab; icon: React.ReactNode; label: string }[] = [
    { id: 'mac', icon: <Apple     className="w-4 h-4" />, label: 'macOS (.app)' },
    { id: 'win', icon: <AppWindow className="w-4 h-4" />, label: 'Windows (.exe)' },
    { id: 'lin', icon: <Terminal  className="w-4 h-4" />, label: 'Linux' },
  ]

  const stepsData: Record<OsTab, { title: string; content: React.ReactNode }[]> = {
    mac: [
      { title: 'Descargar ARIA.app', content: <>Descarga <Code>ARIA.app</Code> desde tu panel en riskeep.com. Arrastra la app a la carpeta <Code>Aplicaciones</Code>. Si aparece alerta de Gatekeeper: <Code>Ajustes → Privacidad y Seguridad → Abrir de todas formas</Code>.</> },
      { title: 'Instalar Ollama', content: <>La app detecta si Ollama está instalado. Si no, te muestra el enlace directo a <Code>ollama.com</Code>. Ollama es la plataforma que ejecuta los modelos LLM localmente en tu Mac.</> },
      { title: 'Iniciar sesión con tu cuenta Riskeep', content: <>Al abrir ARIA por primera vez se lanza el asistente de configuración. Introduce tu email y contraseña de <strong className="text-white">riskeep.com</strong> para verificar la suscripción activa.</> },
      { title: 'Descarga automática de modelos (~13 GB)', content: <>La app descarga <Code>qwen2.5:14b</Code>, <Code>phi4-mini</Code> y <Code>nomic-embed-text</Code> vía Ollama. Progreso visible en el asistente. Tiempo estimado: 15–40 min según conexión.</> },
      { title: 'Configurar claves API de Binance Testnet', content: <>Introduce tus claves de <strong className="text-white">Binance Testnet</strong> (obligatorio para modo PAPER) y opcionalmente Binance Live y Telegram. Las claves se guardan en <Code>~/.env</Code> — nunca en la nube.</> },
      { title: 'Abrir el dashboard en http://localhost:8080', content: <>ARIA arranca el servidor web y abre el dashboard automáticamente. Desde ahí controlas trades, configuración, logs, memoria y rendimiento. <strong className="text-white">Configura los límites de riesgo antes de operar en modo REAL.</strong></> },
    ],
    win: [
      { title: 'Descargar ARIA_Setup.exe', content: <>Descarga <Code>ARIA_Setup.exe</Code> desde tu panel en riskeep.com. Si Windows SmartScreen muestra un aviso: <Code>Más información → Ejecutar de todas formas</Code>.</> },
      { title: 'Instalar Ollama para Windows', content: <>La app detecta si Ollama está instalado. Si no, te muestra el enlace de descarga. Descarga <Code>OllamaSetup.exe</Code> desde <Code>ollama.com</Code>. Se ejecuta como servicio en segundo plano.</> },
      { title: 'Iniciar sesión con tu cuenta Riskeep', content: <>Al abrir ARIA se lanza el asistente de configuración. Introduce tu email y contraseña de <strong className="text-white">riskeep.com</strong>.</> },
      { title: 'Descarga automática de modelos (~13 GB)', content: <>La app descarga los modelos automáticamente. Se almacenan en <Code>%USERPROFILE%\.ollama\models</Code>.</> },
      { title: 'Configurar claves API de Binance Testnet', content: <>Las claves se guardan en <Code>%USERPROFILE%\.env</Code>. Nunca en la nube.</> },
      { title: 'Abrir el dashboard en http://localhost:8080', content: <>ARIA abre el dashboard automáticamente. El icono del system tray permite controlar la app sin abrir ventanas adicionales.</> },
    ],
    lin: [
      { title: 'Instalar Ollama', content: <>Ejecuta: <Code>curl -fsSL https://ollama.com/install.sh | sh</Code>. Ollama se instala como servicio systemd y arranca automáticamente.</> },
      { title: 'Descargar ARIA (AppImage o .deb)', content: <>Descarga <Code>ARIA.AppImage</Code> o <Code>aria_5.0_amd64.deb</Code> desde tu panel en riskeep.com. Para AppImage: <Code>chmod +x ARIA.AppImage && ./ARIA.AppImage</Code></> },
      { title: 'Iniciar sesión y descargar modelos', content: <>El asistente gestiona automáticamente la descarga de <Code>qwen2.5:14b</Code>, <Code>phi4-mini</Code> y <Code>nomic-embed-text</Code>.</> },
      { title: 'Configurar claves y acceder al dashboard', content: <>Las claves API se guardan en <Code>~/.env</Code>. El dashboard estará disponible en <Code>http://localhost:8080</Code>.</> },
    ],
  }

  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">
      <Reveal><Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">🛠️ Guía de instalación</Chip></Reveal>
      <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Wrench className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-500/12 border border-blue-500/22" title="Instalación y Primeros Pasos" sub="Selecciona tu sistema operativo — la app guía el proceso completo automáticamente" /></div></Reveal>

      <Reveal delay={130}>
        <div className="flex gap-2.5 flex-wrap mb-6">
          {osTabs.map((tab) => (
            <button key={tab.id} onClick={() => setOs(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                os === tab.id
                  ? 'bg-blue-500/14 border-blue-500/45 text-blue-400 shadow-[0_0_18px_rgba(59,130,246,.12)]'
                  : 'bg-white/[.03] border-white/11 text-slate-400 hover:border-blue-500/35 hover:text-blue-400 hover:bg-blue-500/7'
              }`}>{tab.icon}{tab.label}</button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={190}>
        <Card>
          <div className="mb-6">
            {os === 'mac' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/8 border border-cyan-500/22 text-cyan-400"><Apple className="w-3.5 h-3.5" /> macOS 13 Ventura o superior · Apple Silicon &amp; Intel</span>}
            {os === 'win' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400"><AppWindow className="w-3.5 h-3.5" /> Windows 11 o superior · x64</span>}
            {os === 'lin' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-amber-500/9 border border-amber-500/22 text-amber-400"><Terminal className="w-3.5 h-3.5" /> Ubuntu 22.04+ · Debian 12+ · Arch</span>}
          </div>
          <div key={os} className="animate-[tabFade_.38s_cubic-bezier(.16,1,.3,1)_both]">
            {stepsData[os].map((step, i) => (
              <Step key={i} num={i + 1} title={step.title} last={i === stepsData[os].length - 1}>{step.content}</Step>
            ))}
          </div>
        </Card>
      </Reveal>

      <Divider />

      <div>
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">📝 Ayuda &amp; Soporte</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<MessageSquare className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title="Soporte y Mantenimiento" sub="Acompañamiento completo desde la instalación hasta la operativa avanzada" /></div></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            { icon:'🚀', title:'Instalación guiada',          desc:'Asistencia en macOS, Windows y Linux. La app automatiza el proceso completo.', delay:70  },
            { icon:'🔄', title:'Actualizaciones automáticas',  desc:'Modelos y LoRAs actualizables desde el panel de configuración.',               delay:140 },
            { icon:'🐛', title:'Resolución de errores',        desc:(<span>Logs en <Code>~/ARIA_data/logs/</Code>. Soporte vía chat y email.</span>),  delay:210 },
            { icon:'📖', title:'Documentación completa',       desc:'Guías, ejemplos de uso y FAQ disponibles en riskeep.com.',                      delay:280 },
          ].map((s) => (
            <Reveal key={s.title} delay={s.delay}>
              <Card className="hover:border-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-2xl mb-3">{s.icon}</div>
                <p className="font-semibold text-white text-sm mb-2">{s.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function LegalPage() {
  const [tab, setTab] = useState<MainTab>('legal')

  const tabs: { id: MainTab; emoji: string; label: string; num: string }[] = [
    { id: 'legal',       emoji: '⚠️', label: 'Aviso Legal & Riesgo',       num: '01' },
    { id: 'tos',         emoji: '📋', label: 'Términos de Servicio',        num: '02' },
    { id: 'requisitos',  emoji: '💻', label: 'Requisitos & Funcionalidad',  num: '03' },
    { id: 'instalacion', emoji: '🛠️', label: 'Instalación',                num: '04' },
  ]

  return (
    <div className="min-h-screen bg-[#020810]">

      {/* Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[100px] animate-[orbFloat_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[90px] animate-[orbFloat_12s_ease-in-out_infinite_1.5s]" />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/6 bg-[#020810]/80 backdrop-blur-md animate-[fadeIn_.5s_ease_both]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,.3)]">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Riskeep</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-36 pb-14 px-6 text-center relative">
        <div className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)_.1s_both] inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-cyan-400 bg-cyan-500/8 border border-cyan-500/22 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-[pulse_2s_infinite]" />
          Documentación oficial · v5.0
        </div>

        <h1 className="animate-[fadeUp_.75s_cubic-bezier(.16,1,.3,1)_.25s_both] font-bold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-tight text-white mb-5">
          ARIA —{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Autonomous Risk
          </span>
          <br />Intelligence Agent
        </h1>

        <p className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)_.4s_both] text-base text-slate-400 max-w-[460px] mx-auto leading-relaxed mb-8">
          Aviso legal, términos de servicio, requisitos del sistema y guía de instalación.
        </p>

        <div className="animate-[lineGrow_.8s_cubic-bezier(.16,1,.3,1)_.55s_both] w-14 h-0.5 mx-auto mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full origin-center" />

        {/* 4 TABS */}
        <nav className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)_.65s_both] flex justify-center gap-2.5 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                tab === t.id
                  ? 'bg-blue-500/15 border-blue-500/50 text-blue-400 shadow-[0_0_22px_rgba(59,130,246,.15)]'
                  : 'bg-white/[.03] border-white/11 text-slate-400 hover:border-blue-500/35 hover:text-blue-300 hover:bg-blue-500/7'
              }`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${tab === t.id ? 'bg-blue-500/25 text-blue-300' : 'bg-white/8 text-slate-600'}`}>
                {t.num}
              </span>
            </button>
          ))}
        </nav>
      </section>

      {/* ── CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 pb-28">
        {tab === 'legal'       && <TabLegal />}
        {tab === 'tos'         && <TabTOS />}
        {tab === 'requisitos'  && <TabRequisitos />}
        {tab === 'instalacion' && <TabInstalacion />}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="text-white font-bold">Riskeep</span>
          </Link>
          <nav className="flex gap-6 text-sm text-slate-500">
            <Link href="/#features" className="hover:text-slate-300 transition-colors">Funciones</Link>
            <Link href="/#pricing"  className="hover:text-slate-300 transition-colors">Precios</Link>
            <Link href="/legal"     className="text-slate-400 hover:text-slate-300 transition-colors">Legal</Link>
            <Link href="/login"     className="hover:text-slate-300 transition-colors">Mi cuenta</Link>
          </nav>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Riskeep. Todos los derechos reservados.</p>
        </div>
        <p className="mt-6 text-center text-xs text-slate-700 max-w-xl mx-auto">
          El trading de criptomonedas implica riesgo significativo. Riskeep no ofrece asesoramiento financiero.
          Las rentabilidades pasadas no garantizan resultados futuros.
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
        @keyframes tabFade  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbFloat { 0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.05)} }
      `}</style>
    </div>
  )
}
