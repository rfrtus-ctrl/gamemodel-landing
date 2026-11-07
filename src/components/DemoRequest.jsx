import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { C, SERIF, EMAIL } from '../design'
import { DiamondLogo } from './Primitives'

// "Požiadať o demo": the visitor leaves an e-mail, the GameModel app sends a
// link to the club registration form. Public endpoint, no keys in this repo;
// abuse protection (rate limit, honeypot) lives in the app backend.
const API_URL = (import.meta.env.VITE_APP_API_URL || 'https://gamemodel-app-production.up.railway.app/api').replace(/\/+$/, '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DemoContext = createContext({ openDemo: () => {} })

export function useDemo() {
  return useContext(DemoContext)
}

export function DemoProvider({ children }) {
  const [open, setOpen] = useState(false)
  // Usable directly as onClick of a link: keeps the mailto/href from firing
  const openDemo = useCallback((e) => {
    e?.preventDefault?.()
    setOpen(true)
  }, [])
  return (
    <DemoContext.Provider value={{ openDemo }}>
      {children}
      <AnimatePresence>{open && <DemoModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </DemoContext.Provider>
  )
}

function DemoModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [clubName, setClubName] = useState('')
  const [website, setWebsite] = useState('') // honeypot, hidden from people
  const [state, setState] = useState('form') // form | sending | done
  const [error, setError] = useState('')
  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [onClose])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!EMAIL_RE.test(email.trim())) { setError('Zadajte platný e-mail.'); return }
    setState('sending')
    try {
      const res = await fetch(`${API_URL}/public/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), club_name: clubName.trim(), website }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'request failed')
      }
      setState('done')
    } catch (err) {
      setState('form')
      setError(err.message && err.message !== 'request failed' && !err.message.startsWith('Failed')
        ? err.message
        : 'Žiadosť sa nepodarilo odoslať.')
    }
  }

  const input = {
    display: 'block', width: '100%', boxSizing: 'border-box',
    padding: '13px 14px', fontSize: 16, color: C.black,
    background: C.white, border: `1px solid ${C.borderSt}`, borderRadius: 2,
    outline: 'none', fontFamily: 'inherit',
  }
  const label = {
    display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: C.gray, marginBottom: 8,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(26,26,26,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <motion.div
        role="dialog" aria-modal="true" aria-labelledby="demo-title"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 440,
          maxHeight: 'calc(100vh - 32px)', overflowY: 'auto',
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4,
          padding: '36px 28px 28px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        }}
      >
        <button
          type="button" onClick={onClose} aria-label="Zavrieť"
          style={{ position: 'absolute', top: 12, right: 12, padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: C.gray }}
        >
          <X size={18} />
        </button>

        {state === 'done' ? (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: C.green, color: C.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <Check size={24} strokeWidth={2.2} />
            </div>
            <h2 id="demo-title" style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Skontrolujte si e-mail
            </h2>
            <p style={{ fontSize: 15, color: C.gray, lineHeight: 1.6, margin: '0 0 24px' }}>
              Na <strong style={{ color: C.black }}>{email.trim()}</strong> sme poslali odkaz na krátku registráciu klubu.
              Po jej vyplnení vám pripravíme demo prístup.
            </p>
            <p style={{ fontSize: 12, color: C.grayMid, lineHeight: 1.6, margin: 0 }}>
              E-mail neprišiel? Pozrite priečinok spam alebo napíšte na{' '}
              <a href={`mailto:${EMAIL}`} style={{ color: C.green }}>{EMAIL}</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <DiamondLogo size={34} />
            </div>
            <h2 id="demo-title" style={{
              fontFamily: SERIF, fontSize: 28, fontWeight: 500, textAlign: 'center',
              margin: '0 0 10px', letterSpacing: '-0.02em',
            }}>
              Požiadať o demo
            </h2>
            <p style={{ fontSize: 15, color: C.gray, lineHeight: 1.6, textAlign: 'center', margin: '0 0 28px' }}>
              Nechajte nám e-mail a hneď vám pošleme odkaz na krátku registráciu klubu.
            </p>

            <label style={{ display: 'block', marginBottom: 18 }}>
              <span style={label}>E-mail</span>
              <input
                ref={emailRef} type="email" autoComplete="email" inputMode="email" required
                value={email} onChange={e => setEmail(e.target.value)} maxLength={200}
                placeholder="vas@klub.sk" style={input}
              />
            </label>
            <label style={{ display: 'block', marginBottom: 24 }}>
              <span style={label}>Názov klubu <span style={{ fontWeight: 500, letterSpacing: '0.05em', textTransform: 'none' }}>(nepovinné)</span></span>
              <input
                type="text" autoComplete="organization"
                value={clubName} onChange={e => setClubName(e.target.value)} maxLength={120}
                placeholder="napr. TJ Slovan Dolná Ves" style={input}
              />
            </label>

            {/* Honeypot: hidden from people, bots fill it */}
            <div aria-hidden="true" style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}>
              <label>Web <input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
            </div>

            {error && (
              <p role="alert" style={{ fontSize: 13, color: '#b91c1c', lineHeight: 1.5, margin: '0 0 16px' }}>
                {error}{' '}
                {error === 'Žiadosť sa nepodarilo odoslať.' && (
                  <>Skúste to znova alebo napíšte na <a href={`mailto:${EMAIL}`} style={{ color: '#b91c1c' }}>{EMAIL}</a>.</>
                )}
              </p>
            )}

            <button
              type="submit" disabled={state === 'sending'}
              style={{
                width: '100%', minHeight: 50, border: 'none', borderRadius: 2, cursor: state === 'sending' ? 'wait' : 'pointer',
                background: C.black, color: C.cream, opacity: state === 'sending' ? 0.7 : 1,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit',
              }}
            >
              {state === 'sending' ? 'Odosielam…' : <>Poslať odkaz <ArrowRight size={14} strokeWidth={2} /></>}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
