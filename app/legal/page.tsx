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
import { useT } from '@/lib/i18n/LanguageContext'

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

/** Parses {code} and **strong** markers in translation content strings into React nodes */
function renderContent(content: string): React.ReactNode {
  const parts = content.split(/(\{[^}]+\}|\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('{') && part.endsWith('}')) {
          return <Code key={i}>{part.slice(1, -1)}</Code>
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>
        }
        return part
      })}
    </>
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
  const t = useT()
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      {/* ── RESPONSABILIDAD DIRECTA DEL USUARIO ── */}
      <Reveal>
        <Chip color="text-rose-400 bg-rose-500/8 border-rose-500/20">{t.legal.legalMainNotice}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<UserCheck className="w-5 h-5 text-rose-400" />}
            iconBg="bg-rose-500/10 border border-rose-500/22"
            title={t.legal.legalRespTitle}
            sub={t.legal.legalRespSub}
          />
        </div>
      </Reveal>

      <Reveal delay={130}>
        <div className="rounded-2xl border-2 border-rose-500/35 bg-rose-500/6 p-6 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white text-base block mb-2">
              {t.legal.legalRespIntro}
            </strong>
            {t.legal.legalRespBody}{' '}
            <strong className="text-rose-300">{t.legal.legalRespHighlight}</strong>{' '}
            {t.legal.legalRespOf}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {t.legal.legalRespItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500 border-t border-white/8 pt-4">
            <strong className="text-slate-400">{t.legal.legalRespFooter}</strong>
          </p>
        </div>
      </Reveal>

      <Divider />

      {/* ── RIESGO FINANCIERO ── */}
      <Reveal>
        <Chip color="text-amber-400 bg-amber-500/10 border-amber-500/22">{t.legal.legalRiskChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
            iconBg="bg-amber-500/12 border border-amber-500/22"
            title={t.legal.legalRiskTitle}
            sub={t.legal.legalRiskSub}
          />
        </div>
      </Reveal>

      <Reveal delay={130}>
        <Alert type="yellow" title={t.legal.legalRiskAlert}>
          {t.legal.legalRiskAlertBody}{' '}
          <strong className="text-white">{t.legal.legalRiskAlertHighlight}</strong>.{' '}
          {t.legal.legalRiskAlertEnd}
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <DocList items={t.legal.legalRiskItems} />
        </Card>
      </Reveal>

      <Divider />

      {/* ── LIMITACIÓN DE RESPONSABILIDAD ── */}
      <Reveal>
        <Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">{t.legal.legalDisclaimerChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Shield className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/12 border border-blue-500/22"
            title={t.legal.legalDisclaimerTitle}
            sub={t.legal.legalDisclaimerSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            {t.legal.legalDisclaimerRows.map((row, i) => (
              <DefRow key={i} term={row.term} def={row.def} />
            ))}
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── RESTRICCIONES GEOGRÁFICAS ── */}
      <Reveal>
        <Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">{t.legal.legalGeoChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Globe className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/12 border border-purple-500/22"
            title={t.legal.legalGeoTitle}
            sub={t.legal.legalGeoSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="purple" title={t.legal.legalGeoAlert}>
          {t.legal.legalGeoAlertBody}{' '}
          <strong className="text-white">{t.legal.legalGeoHighlight}</strong>{' '}
          {t.legal.legalGeoEnd}
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <DocList items={t.legal.legalGeoItems} />
        </Card>
      </Reveal>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   TAB 02 — TÉRMINOS DE SERVICIO
   ═══════════════════════════════════════════════════════════ */
function TabTOS() {
  const t = useT()
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      {/* ── OBLIGACIONES DEL USUARIO ── */}
      <Reveal>
        <Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">{t.legal.tosObligationsChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<UserCheck className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/12 border border-blue-500/22"
            title={t.legal.tosObligationsTitle}
            sub={t.legal.tosObligationsSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <ObligationList items={t.legal.tosObligationsItems} />
      </Reveal>

      <Divider />

      {/* ── SEGURIDAD DE API KEYS ── */}
      <Reveal>
        <Chip color="text-rose-400 bg-rose-500/8 border-rose-500/20">{t.legal.tosApiChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Key className="w-5 h-5 text-rose-400" />}
            iconBg="bg-rose-500/10 border border-rose-500/22"
            title={t.legal.tosApiTitle}
            sub={t.legal.tosApiSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="red" title={t.legal.tosApiAlert}>
          {t.legal.tosApiAlertBody}
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-4">{t.legal.tosApiPracticesLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.legal.tosApiPractices.map((item, i) => (
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
        <Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">{t.legal.tosIpChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Copyright className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/12 border border-purple-500/22"
            title={t.legal.tosIpTitle}
            sub={t.legal.tosIpSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            {t.legal.tosIpRows.map((row, i) => (
              <DefRow key={i} term={row.term} def={row.def} />
            ))}
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── SUSCRIPCIÓN Y PAGOS ── */}
      <Reveal>
        <Chip color="text-emerald-400 bg-emerald-500/8 border-emerald-500/20">{t.legal.tosPayChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<CreditCard className="w-5 h-5 text-emerald-400" />}
            iconBg="bg-emerald-500/12 border border-emerald-500/22"
            title={t.legal.tosPayTitle}
            sub={t.legal.tosPaySub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Alert type="green" title={t.legal.tosPayAlert}>
          {t.legal.tosPayAlertBody}
        </Alert>
      </Reveal>
      <Reveal delay={190}>
        <Card>
          <dl>
            {t.legal.tosPayRows.map((row, i) => (
              <DefRow key={i} term={row.term} def={row.def} />
            ))}
          </dl>
        </Card>
      </Reveal>

      <Divider />

      {/* ── PRIVACIDAD DE DATOS ── */}
      <Reveal>
        <Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">{t.legal.tosPrivacyChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Database className="w-5 h-5 text-cyan-400" />}
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
            title={t.legal.tosPrivacyTitle}
            sub={t.legal.tosPrivacySub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <DocTable
            headers={t.legal.tosPrivacyHeaders}
            rows={t.legal.tosPrivacyRows.map((row, i) => [
              <strong key={`k${i}`} className="text-white">
                {row.dataKey}
                {row.dataAnon && <span className="text-slate-400 font-normal"> {row.dataAnon}</span>}
              </strong>,
              renderContent(row.storage),
              <Tag key={`t${i}`} color={row.tagColor}>{row.tag}</Tag>,
            ])}
          />
        </Card>
      </Reveal>

      <Divider />

      {/* ── JURISDICCIÓN ── */}
      <Reveal>
        <Chip color="text-slate-400 bg-slate-500/8 border-slate-500/20">{t.legal.tosJurChip}</Chip>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-4">
          <SectionHeader
            icon={<Scale className="w-5 h-5 text-slate-400" />}
            iconBg="bg-slate-500/10 border border-slate-500/20"
            title={t.legal.tosJurTitle}
            sub={t.legal.tosJurSub}
          />
        </div>
      </Reveal>
      <Reveal delay={130}>
        <Card>
          <dl>
            {t.legal.tosJurRows.map((row, i) => (
              <DefRow key={i} term={row.term} def={row.def} />
            ))}
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
  const t = useT()
  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">

      <div>
        <Reveal><Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">{t.legal.reqHwChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Monitor className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-500/12 border border-blue-500/22" title={t.legal.reqHwTitle} sub={t.legal.reqHwSub} /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={t.legal.reqHwHeaders}
              rows={[
                [<strong key="1" className="text-white">CPU</strong>, t.legal.reqHwRows[0].rec, t.legal.reqHwRows[0].note],
                [<strong key="2" className="text-white">RAM</strong>, t.legal.reqHwRows[1].rec, <span key="n">{t.legal.reqHwRows[1].note.split(' · ')[0]}<br /><span className="text-slate-600 text-xs">{t.legal.reqHwRows[1].note.split(' · ').slice(1).join(' · ')}</span></span>],
                [<strong key="3" className="text-white">{t.legal.reqHwRows[2].comp}</strong>, t.legal.reqHwRows[2].rec, t.legal.reqHwRows[2].note],
                [<strong key="4" className="text-white">{t.legal.reqHwRows[3].comp}</strong>, t.legal.reqHwRows[3].rec, t.legal.reqHwRows[3].note],
                [<strong key="5" className="text-white">{t.legal.reqHwRows[4].comp}</strong>, t.legal.reqHwRows[4].rec, t.legal.reqHwRows[4].note],
              ]}
            />
          </Card>
        </Reveal>
        <Reveal delay={190}>
          <Alert type="blue" title={t.legal.reqHwAlert}>
            {t.legal.reqHwAlertBody}
          </Alert>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-purple-400 bg-purple-500/10 border-purple-500/22">{t.legal.reqLlmChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Brain className="w-5 h-5 text-purple-400" />} iconBg="bg-purple-500/12 border border-purple-500/22" title={t.legal.reqLlmTitle} sub={t.legal.reqLlmSub} /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={t.legal.reqLlmHeaders}
              rows={[
                [<strong key="1" className="text-white font-mono text-xs">qwen2.5:14b</strong>, t.legal.reqLlmRows[0].ram, t.legal.reqLlmRows[0].fn, <Tag key="t1" color="purple">{t.legal.reqLlmAuto}</Tag>],
                [<strong key="2" className="text-white font-mono text-xs">phi4-mini</strong>, t.legal.reqLlmRows[1].ram, t.legal.reqLlmRows[1].fn, <Tag key="t2" color="purple">{t.legal.reqLlmAuto}</Tag>],
                [<strong key="3" className="text-white font-mono text-xs">nomic-embed-text</strong>, t.legal.reqLlmRows[2].ram, t.legal.reqLlmRows[2].fn, <Tag key="t3" color="purple">{t.legal.reqLlmAuto}</Tag>],
              ]}
            />
          </Card>
        </Reveal>
        <Reveal delay={190}>
          <Alert type="green" title={t.legal.reqLlmAlert}>
            {t.legal.reqLlmAlertBody}
          </Alert>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">{t.legal.reqLoraChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Puzzle className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title={t.legal.reqLoraTitle} sub={t.legal.reqLoraSub} /></div></Reveal>
        <Reveal delay={130}>
          <Card>
            <DocTable
              headers={t.legal.reqLoraHeaders}
              rows={[
                [<strong key="1" className="text-white font-mono text-xs">aria-btc-patterns</strong>, t.legal.reqLoraRows[0].size, t.legal.reqLoraRows[0].spec, <Tag key="t1" color="green">{t.legal.reqLoraAuto}</Tag>],
                [<strong key="2" className="text-white font-mono text-xs">aria-news-sentiment</strong>, t.legal.reqLoraRows[1].size, t.legal.reqLoraRows[1].spec, <Tag key="t2" color="green">{t.legal.reqLoraAuto}</Tag>],
                [<strong key="3" className="text-white font-mono text-xs">aria-risk-adaptive</strong>, t.legal.reqLoraRows[2].size, t.legal.reqLoraRows[2].spec, <Tag key="t3" color="green">{t.legal.reqLoraAuto}</Tag>],
                [<strong key="4" className="text-white font-mono text-xs">{t.legal.reqLoraRows[3].lora}</strong>, t.legal.reqLoraRows[3].size, <span key="d">{t.legal.reqLoraRows[3].spec.split('~/ARIA_data/loras/')[0]}<Code>~/ARIA_data/loras/</Code></span>, <Tag key="t4" color="yellow">{t.legal.reqLoraCustom}</Tag>],
              ]}
            />
          </Card>
        </Reveal>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">{t.legal.reqModesChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Gamepad2 className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title={t.legal.reqModesTitle} sub={t.legal.reqModesSub} /></div></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {t.legal.reqModes.map((m, i) => (
            <Reveal key={m.name} delay={70 + i * 70}>
              <ModeCard
                emoji={m.emoji}
                label={m.label}
                name={m.name}
                desc={m.desc}
                nameColor={['text-cyan-400', 'text-amber-400', 'text-purple-400', 'text-blue-400', 'text-rose-400'][i]}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <Divider />

      <div>
        <Reveal><Chip color="text-emerald-400 bg-emerald-500/8 border-emerald-500/20">{t.legal.reqRiskChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<BarChart3 className="w-5 h-5 text-emerald-400" />} iconBg="bg-emerald-500/12 border border-emerald-500/22" title={t.legal.reqRiskTitle} sub={t.legal.reqRiskSub} /></div></Reveal>
        <Reveal delay={130}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {t.legal.reqRiskItems.map((item) => (
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
  const t = useT()
  const [os, setOs] = useState<OsTab>('mac')

  const osTabs: { id: OsTab; icon: React.ReactNode; label: string }[] = [
    { id: 'mac', icon: <Apple     className="w-4 h-4" />, label: t.legal.instMac },
    { id: 'win', icon: <AppWindow className="w-4 h-4" />, label: t.legal.instWin },
    { id: 'lin', icon: <Terminal  className="w-4 h-4" />, label: t.legal.instLin },
  ]

  const stepsData: Record<OsTab, { title: string; content: React.ReactNode }[]> = {
    mac: t.legal.instStepsMac.map(s => ({ title: s.title, content: renderContent(s.content) })),
    win: t.legal.instStepsWin.map(s => ({ title: s.title, content: renderContent(s.content) })),
    lin: t.legal.instStepsLin.map(s => ({ title: s.title, content: renderContent(s.content) })),
  }

  return (
    <div className="animate-[tabFade_.45s_cubic-bezier(.16,1,.3,1)_both]">
      <Reveal><Chip color="text-blue-400 bg-blue-500/10 border-blue-500/22">{t.legal.instChip}</Chip></Reveal>
      <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<Wrench className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-500/12 border border-blue-500/22" title={t.legal.instTitle} sub={t.legal.instSub} /></div></Reveal>

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
            {os === 'mac' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/8 border border-cyan-500/22 text-cyan-400"><Apple className="w-3.5 h-3.5" /> {t.legal.instMacBadge}</span>}
            {os === 'win' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400"><AppWindow className="w-3.5 h-3.5" /> {t.legal.instWinBadge}</span>}
            {os === 'lin' && <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-amber-500/9 border border-amber-500/22 text-amber-400"><Terminal className="w-3.5 h-3.5" /> {t.legal.instLinBadge}</span>}
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
        <Reveal><Chip color="text-cyan-400 bg-cyan-500/8 border-cyan-500/20">{t.legal.instSupportChip}</Chip></Reveal>
        <Reveal delay={70}><div className="mt-4"><SectionHeader icon={<MessageSquare className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10 border border-cyan-500/20" title={t.legal.instSupportTitle} sub={t.legal.instSupportSub} /></div></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {t.legal.instSupportItems.map((s, i) => (
            <Reveal key={s.title} delay={70 + i * 70}>
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
  const t = useT()
  const [tab, setTab] = useState<MainTab>('legal')

  const tabs: { id: MainTab; emoji: string; label: string; num: string }[] = [
    { id: 'legal',       emoji: '⚠️', label: t.legal.tab1, num: '01' },
    { id: 'tos',         emoji: '📋', label: t.legal.tab2, num: '02' },
    { id: 'requisitos',  emoji: '💻', label: t.legal.tab3, num: '03' },
    { id: 'instalacion', emoji: '🛠️', label: t.legal.tab4, num: '04' },
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
            {t.legal.backToHome}
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-36 pb-14 px-6 text-center relative">
        <div className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)_.1s_both] inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-cyan-400 bg-cyan-500/8 border border-cyan-500/22 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-[pulse_2s_infinite]" />
          {t.legal.docBadge}
        </div>

        <h1 className="animate-[fadeUp_.75s_cubic-bezier(.16,1,.3,1)_.25s_both] font-bold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-tight text-white mb-5">
          {t.legal.heroTitle1}{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.legal.heroTitle2}
          </span>
          <br />{t.legal.heroTitle3}
        </h1>

        <p className="animate-[fadeUp_.7s_cubic-bezier(.16,1,.3,1)_.4s_both] text-base text-slate-400 max-w-[460px] mx-auto leading-relaxed mb-8">
          {t.legal.heroDesc}
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
            <Link href="/#features" className="hover:text-slate-300 transition-colors">{t.legal.legalFooterFunctions}</Link>
            <Link href="/#pricing"  className="hover:text-slate-300 transition-colors">{t.legal.legalFooterPricing}</Link>
            <Link href="/legal"     className="text-slate-400 hover:text-slate-300 transition-colors">{t.legal.legalFooterLegal}</Link>
            <Link href="/login"     className="hover:text-slate-300 transition-colors">{t.legal.legalFooterAccount}</Link>
          </nav>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Riskeep. {t.legal.legalFooterRights}</p>
        </div>
        <p className="mt-6 text-center text-xs text-slate-700 max-w-xl mx-auto">
          {t.legal.legalFooterDisclaimer}
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
