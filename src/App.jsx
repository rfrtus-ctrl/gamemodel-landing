import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, User, ClipboardCheck, Trophy,
  ArrowRight, Mail, ChevronRight,
} from 'lucide-react'

// ── Constants ──────────────────────────────────────────────────────────────────

const EMAIL       = 'info@gamemodel.sk'
const DEMO_SUBJ   = encodeURIComponent('Demo request — GameModel')

const FEATURES = [
  {
    icon: Users,
    color: 'text-green-400',
    bg:    'bg-green-500/10',
    glow:  'rgba(34,197,94,0.12)',
    title: 'Trénerský tím',
    desc:  'Manažujte trénerský tím, role a oprávnenia. Každý tréner vidí len to čo má vidieť.',
  },
  {
    icon: User,
    color: 'text-emerald-400',
    bg:    'bg-emerald-500/10',
    glow:  'rgba(16,185,129,0.12)',
    title: 'Hráči',
    desc:  'Kompletná evidencia hráčov, zdravotné záznamy, štatistiky a výkonnosť v jednom mieste.',
  },
  {
    icon: ClipboardCheck,
    color: 'text-teal-400',
    bg:    'bg-teal-500/10',
    glow:  'rgba(20,184,166,0.12)',
    title: 'Dochádzka',
    desc:  'Rýchle zaznamenávanie dochádzky cez mobil. Reporty pre tréning, zápasy aj dlhodobé trendy.',
  },
  {
    icon: Trophy,
    color: 'text-green-400',
    bg:    'bg-green-500/10',
    glow:  'rgba(34,197,94,0.12)',
    title: 'Zápasy',
    desc:  'Plánovanie zápasov, zostavy, výsledky. Zdieľajte rozpis s rodičmi a hráčmi automaticky.',
  },
]

const MOCK_EVENTS = [
  { label: 'Tréning U19',           time: 'Dnes, 16:30',   dot: '#22c55e', dotGlow: 'rgba(34,197,94,0.6)' },
  { label: 'Maj. zápas U15',        time: 'Sobota, 11:00', dot: '#3b82f6', dotGlow: 'rgba(59,130,246,0.6)' },
  { label: 'Tréning First Team',    time: 'Pon, 17:00',    dot: '#22c55e', dotGlow: 'rgba(34,197,94,0.6)' },
  { label: 'Stretnutie trénerov',   time: 'Ut, 14:00',     dot: '#f59e0b', dotGlow: 'rgba(245,158,11,0.6)' },
]

const MOCK_STATS = [
  { label: 'Hráčov celkom', value: '23', sub: '+2 tento mesiac',  color: '#22c55e' },
  { label: 'Dochádzka',     value: '87%', sub: 'Priemer — týždeň', color: '#3b82f6' },
  { label: 'Tréningy',      value: '12',  sub: 'Tento mesiac',     color: '#f59e0b' },
]

const MOCK_NAV = [
  { emoji: '🏠', label: 'Domov',     active: true  },
  { emoji: '👥', label: 'Hráči',     active: false },
  { emoji: '⚽', label: 'Tímy',      active: false },
  { emoji: '📋', label: 'Dochádzka', active: false },
  { emoji: '📅', label: 'Kalendár',  active: false },
  { emoji: '🏆', label: 'Zápasy',    active: false },
]

// ── Animation variants ─────────────────────────────────────────────────────────

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Logo mark ─────────────────────────────────────────────────────────────────

function GMLogo({ size = 28 }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: size * 0.3,
        background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.34, fontWeight: 900, color: '#fff',
        letterSpacing: '-0.02em', flexShrink: 0,
        boxShadow: '0 2px 12px rgba(34,197,94,0.35)',
      }}
    >
      GM
    </div>
  )
}

// ── Dashboard Mockup ───────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div
      style={{
        background: '#0d1117',
        borderRadius: 14,
        border: '1px solid #21262d',
        overflow: 'hidden',
        fontSize: 12,
        userSelect: 'none',
        lineHeight: 1.4,
        boxShadow: [
          '0 60px 120px -20px rgba(0,0,0,0.85)',
          '0 0 0 1px rgba(255,255,255,0.04)',
          '0 0 80px rgba(34,197,94,0.07)',
        ].join(', '),
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        background: '#161b22',
        borderBottom: '1px solid #21262d',
        padding: '0 16px',
        height: 46,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <GMLogo size={24} />
          <span style={{ color: '#e6edf3', fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em' }}>
            GameModel
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#484f58', fontSize: 11 }}>Sezóna 2025/26</span>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800, color: '#fff',
          }}>RF</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', minHeight: 320 }}>

        {/* Sidebar */}
        <div style={{
          width: 168, flexShrink: 0,
          background: '#0d1117',
          borderRight: '1px solid #21262d',
          paddingTop: 14, paddingBottom: 14,
        }}>
          {MOCK_NAV.map(item => (
            <div key={item.label} style={{
              padding: '7px 14px',
              display: 'flex', alignItems: 'center', gap: 9,
              background: item.active ? 'rgba(34,197,94,0.09)' : 'transparent',
              borderLeft: item.active ? '2px solid #22c55e' : '2px solid transparent',
              color: item.active ? '#22c55e' : '#7d8590',
              fontWeight: item.active ? 600 : 400,
              cursor: 'default',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 13 }}>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '18px 20px', overflowX: 'hidden' }}>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 18,
          }}>
            <div style={{ color: '#e6edf3', fontSize: 15, fontWeight: 700 }}>
              Dobrý deň 👋
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 20,
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)',
              color: '#22c55e', fontSize: 10, fontWeight: 600,
            }}>
              • Aktívny
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {MOCK_STATS.map(s => (
              <div key={s.label} style={{
                flex: 1, background: '#161b22',
                border: '1px solid #21262d',
                borderRadius: 10, padding: '11px 13px',
              }}>
                <div style={{ color: '#7d8590', fontSize: 10, marginBottom: 5, fontWeight: 500 }}>
                  {s.label}
                </div>
                <div style={{ color: s.color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: '#30363d', fontSize: 9, marginTop: 5 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div style={{
            color: '#484f58', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 9,
          }}>
            Nadchádzajúce udalosti
          </div>
          <div style={{
            background: '#161b22',
            border: '1px solid #21262d',
            borderRadius: 10, overflow: 'hidden',
          }}>
            {MOCK_EVENTS.map((ev, i) => (
              <div key={ev.label} style={{
                padding: '9px 13px',
                display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: i < MOCK_EVENTS.length - 1 ? '1px solid #21262d' : 'none',
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: ev.dot,
                  boxShadow: `0 0 7px ${ev.dotGlow}`,
                }} />
                <span style={{ flex: 1, color: '#c9d1d9', fontSize: 11 }}>{ev.label}</span>
                <span style={{ color: '#484f58', fontSize: 10 }}>{ev.time}</span>
                <ChevronRight size={11} color="#30363d" />
              </div>
            ))}
          </div>

          {/* Live score widget */}
          <div style={{
            marginTop: 14,
            background: '#161b22',
            border: '1px solid rgba(34,197,94,0.18)',
            borderRadius: 10, padding: '10px 13px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {/* Pulsing live dot */}
              <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: '#22c55e',
                  animation: 'livePing 1.5s ease-in-out infinite',
                }} />
                <span style={{
                  position: 'absolute', inset: '1px', borderRadius: '50%',
                  background: '#4ade80',
                }} />
              </span>
              <span style={{ color: '#484f58', fontSize: 9, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                Posledný zápas
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#8b949e', fontSize: 10 }}>FK Slovan U19</span>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 6, padding: '2px 7px',
                color: '#4ade80', fontWeight: 800, fontSize: 12, letterSpacing: '0.02em',
              }}>
                3 <span style={{ color: '#30363d', fontWeight: 400 }}>:</span> 2
              </span>
              <span style={{ color: '#8b949e', fontSize: 10 }}>FC Nitra U19</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Feature card ───────────────────────────────────────────────────────────────

function FeatureCard({ icon: Icon, color, bg, glow, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl p-6 border transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)'
        e.currentTarget.style.boxShadow = `0 0 30px ${glow}, inset 0 0 20px rgba(34,197,94,0.03)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-5`}>
        <Icon size={20} className={color} />
      </div>
      <h3 className="text-white font-semibold text-base mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: '#080c08', color: '#e2e8f0' }}
    >

      {/* ── Ambient background decorations ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Top glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%',
          transform: 'translateX(-50%)',
          width: 900, height: 600,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 65%)',
        }} />
        {/* Subtle grid — slightly reduced so motion lines read cleanly */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.009) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.009) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '60px 60px',
        }} />

        {/* Diagonal motion lines — hero area only, slow drift */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100vh',
          overflow: 'hidden', pointerEvents: 'none',
        }}>
          <svg
            width="100%" height="100%"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            style={{ animation: 'motionDrift 28s linear infinite', opacity: 1 }}
          >
            {[
              { x1: 180,  y1: -60,  x2: -80,  y2: 960 },
              { x1: 480,  y1: -60,  x2: 220,  y2: 960 },
              { x1: 780,  y1: -60,  x2: 520,  y2: 960 },
              { x1: 1100, y1: -60,  x2: 840,  y2: 960 },
              { x1: 1380, y1: -60,  x2: 1120, y2: 960 },
            ].map((l, i) => (
              <line
                key={i}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#22c55e"
                strokeWidth="1"
                strokeOpacity="0.055"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* ─────────────────────── NAVBAR ─────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: scrolled ? 'rgba(8,12,8,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.055)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GMLogo size={30} />
            <span className="text-white font-bold text-[15px] tracking-tight">GameModel</span>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Kontakt
          </a>
        </nav>
      </header>

      <main>

        {/* ─────────────────────── HERO ──────────────────────────────────────── */}
        <section className="relative flex items-center justify-center min-h-[92vh] pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <motion.div variants={heroStagger} initial="hidden" animate="show">

              {/* Eyebrow badge — sport live-indicator style */}
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border cursor-default"
                style={{
                  color: '#4ade80',
                  borderColor: 'rgba(74,222,128,0.18)',
                  background: 'rgba(34,197,94,0.05)',
                  letterSpacing: '0.08em',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '2.25rem',
                }}
              >
                {/* Pulsing live dot — scale + opacity like a broadcast signal */}
                <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'livePing 1.5s ease-in-out infinite',
                  }} />
                  <span style={{
                    position: 'absolute', inset: '1px', borderRadius: '50%',
                    background: '#4ade80',
                  }} />
                </span>
                Budujeme produkt
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={heroItem}
                className="font-extrabold tracking-tight leading-[1.04] mb-2"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 4.8rem)' }}
              >
                <span className="text-white">
                  Tréneri, hráči,<br className="hidden sm:block" /> dochádzka, zápasy.
                </span>
              </motion.h1>

              {/* Green gradient word */}
              <motion.div
                variants={heroItem}
                className="font-extrabold tracking-tight leading-[1.04] mb-9"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 4.8rem)' }}
              >
                <span style={{
                  background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 45%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  transform: 'skewX(-5deg)',
                }}>
                  Jednoducho.
                </span>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                variants={heroItem}
                className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-11"
                style={{ color: '#7d8590' }}
              >
                GameModel je platforma pre futbalové kluby ktorá zjednodušuje každodenný
                manažment tréningov, dochádzky a zápasov.{' '}
                <span style={{ color: '#c9d1d9' }}>Vytvorené trénermi, pre trénerov.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={heroItem}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
              >
                <a
                  href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all duration-200 hover:scale-[1.025] active:scale-[0.99]"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                    boxShadow: '0 0 30px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  Požiadať o demo
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    color: '#8b949e',
                    border: '1px solid rgba(255,255,255,0.09)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#e6edf3'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#8b949e'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                  }}
                >
                  <Mail size={15} />
                  Napíšte nám
                </a>
              </motion.div>

              {/* Live badge */}
              <motion.div variants={heroItem} className="flex items-center justify-center gap-2 text-sm">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.8)', animation: 'pulse 2s ease-in-out infinite' }}
                />
                <span style={{ color: '#484f58' }}>Aktívne používané v</span>
                <span style={{ color: '#8b949e', fontWeight: 500 }}>FK Slovan Levice</span>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ─────────────────────── MOCKUP ─────────────────────────────────────── */}
        <section className="relative py-8 pb-24 overflow-hidden">

          {/* Floating accent dots */}
          <div className="hidden lg:block absolute left-[6%] top-[25%] w-3 h-3 rounded-full animate-pulse-slow"
               style={{ background: 'rgba(34,197,94,0.4)', boxShadow: '0 0 22px rgba(34,197,94,0.5)' }} />
          <div className="hidden lg:block absolute right-[8%] top-[35%] w-2 h-2 rounded-full"
               style={{ background: 'rgba(34,197,94,0.3)', boxShadow: '0 0 16px rgba(34,197,94,0.4)', animation: 'pulse 3s ease-in-out 1s infinite' }} />
          <div className="hidden lg:block absolute right-[5%] bottom-[20%] w-4 h-4 rounded-full"
               style={{ background: 'rgba(34,197,94,0.15)', boxShadow: '0 0 28px rgba(34,197,94,0.3)', animation: 'pulse 3s ease-in-out 2s infinite' }} />

          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Perspective + float wrapper */}
              <div style={{
                transformOrigin: 'top center',
                animation: 'float 5s ease-in-out infinite',
              }}>
                <DashboardMockup />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────── FEATURES ────────────────────────────────────── */}
        <section className="relative py-24">
          {/* Section separator glow */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent)' }} />

          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{
                  color: '#4ade80',
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                Funkcionalita
              </div>
              <h2
                className="font-bold tracking-tight text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                Všetko čo futbalový klub potrebuje
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto text-base leading-relaxed">
                Jeden systém namiesto piatich Excelových tabuliek.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f, i) => (
                <FeatureCard key={f.title} {...f} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────── SOCIAL PROOF ───────────────────────────────── */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
              style={{
                background: 'rgba(34,197,94,0.04)',
                border: '1px solid rgba(34,197,94,0.11)',
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 55%)' }}
              />

              <div className="relative">
                {/* Label */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-10"
                  style={{ color: '#7d8590', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  Vytvorené v spolupráci s reálnym klubom
                </div>

                {/* Quote */}
                <blockquote
                  className="font-medium leading-relaxed italic mb-8"
                  style={{ color: '#c9d1d9', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)' }}
                >
                  „Konečne nástroj ktorý šetrí trénerom hodiny administratívy každý týždeň."
                </blockquote>

                {/* Stars + attribution */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#22c55e', fontSize: 15 }}>★</span>
                    ))}
                  </div>
                  <span style={{ color: '#484f58', fontSize: 13 }}>
                    — Trénerský tím FK Slovan Levice
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ─────────────────────── FOOTER ──────────────────────────────────────── */}
      <footer
        className="relative py-14"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Main footer row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mb-10">

            {/* Brand */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-2">
                <GMLogo size={28} />
                <span className="text-white font-bold tracking-tight">GameModel</span>
              </div>
              <p style={{ color: '#484f58', fontSize: 13 }}>
                Tréneri, hráči, dochádzka, zápasy. Jednoducho.
              </p>
            </div>

            {/* Status badge */}
            <div className="text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-1.5 cursor-default"
                style={{ color: '#7d8590', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#22c55e', animation: 'pulse 2s ease-in-out infinite' }}
                />
                Pripravujeme launch
              </div>
              <p style={{ color: '#30363d', fontSize: 12 }}>Spustenie Q3 2026</p>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-right">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                style={{ color: '#484f58' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c9d1d9' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#484f58' }}
              >
                <Mail size={13} />
                {EMAIL}
              </a>
            </div>

          </div>

          {/* Bottom row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 12, color: '#30363d' }}
          >
            <span>© 2026 GameModel</span>
            <span>Vyrobené s láskou na Slovensku 🇸🇰</span>
          </div>

        </div>
      </footer>

    </div>
  )
}
