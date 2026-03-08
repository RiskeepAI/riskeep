'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, T } from './translations'

/* ── Context type ─────────────────────────────────────────────────────────── */
type LangContextType = {
  lang:    Lang
  t:       T
  setLang: (l: Lang) => void
}

const LangCtx = createContext<LangContextType>({
  lang:    'es',
  t:       translations.es,
  setLang: () => {},
})

/* ── Provider ─────────────────────────────────────────────────────────────── */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rk-lang') as Lang
      if (saved && translations[saved]) setLangState(saved)
    } catch {
      // ignore (SSR / privacy mode)
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    try { localStorage.setItem('rk-lang', l) } catch { /* ignore */ }
  }

  return (
    <LangCtx.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangCtx.Provider>
  )
}

/* ── Hooks ────────────────────────────────────────────────────────────────── */
/** Returns the full translation object for the current language */
export const useT    = (): T    => useContext(LangCtx).t
/** Returns lang + setLang for the language selector */
export const useLang = ()       => { const { lang, setLang } = useContext(LangCtx); return { lang, setLang } }
