import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, User, ClipboardCheck, Trophy,
  ArrowRight, Mail, ChevronRight,
} from 'lucide-react'

// ── Design tokens ──────────────────────────────────────────────────────────────

const C = {
  bg:        '#f5f3ed',   // warm cream — page background
  card:      '#fafaf7',   // off-white card surfaces
  white:     '#ffffff',   // pure white — floating elements, mockup
  black:     '#1a1a1a',   // deep black — primary text, CTAs
  gray:      '#525252',   // warm gray — secondary text
  grayMid:   '#8a8a8a',   // muted gray — labels, eyebrows
  grayLight: '#b8b8b8',   // lighter gray — tertiary, decorative
  green:     '#1a5d3a',   // Rolex green — brand accent ONLY
  cream:     '#f5f3ed',   // text on dark surfaces
  border:    'rgba(26,26,26,0.08)',
  borderSt:  'rgba(26,26,26,0.15)',
}

const SERIF = "'Lora', Georgia, serif"

// ── Constants ──────────────────────────────────────────────────────────────────

const EMAIL     = 'info@gamemodel.sk'
const DEMO_SUBJ = encodeURIComponent('Demo request — GameModel')

const FEATURES = [
  {
    icon: Users,
    title: 'Trénerský tím',
    desc:  'Manažujte trénerský tím, role a oprávnenia. Každý tréner vidí len to čo má vidieť.',
  },
  {
    icon: User,
    title: 'Hráči',
    desc:  'Kompletná evidencia hráčov, zdravotné záznamy, štatistiky a výkonnosť v jednom mieste.',
  },
  {
    icon: ClipboardCheck,
    title: 'Dochádzka',
    desc:  'Rýchle zaznamenávanie dochádzky cez mobil. Reporty pre tréning, zápasy aj dlhodobé trendy.',
  },
  {
    icon: Trophy,
    title: 'Zápasy',
    desc:  'Plánovanie zápasov, zostavy, výsledky. Zdieľajte rozpis s rodičmi a hráčmi automaticky.',
  },
]

const MOCK_EVENTS = [
  { label: 'Tréning U19',        time: 'Dnes, 16:30',   green: true  },
  { label: 'Maj. zápas U15',     time: 'Sobota, 11:00', green: false },
  { label: 'Tréning First Team', time: 'Pon, 17:00',    green: true  },
]

const MOCK_STATS = [
  { label: 'Hráčov celkom', value: '23',  sub: '+2 tento mesiac'  },
  { label: 'Dochádzka',     value: '87%', sub: 'Priemer — týždeň' },
  { label: 'Tréningy',      value: '12',  sub: 'Tento mesiac'     },
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
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

// ── Shared primitives ──────────────────────────────────────────────────────────

function GMLogo({ size = 28 }) {
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: Math.round(size * 0.15),
        background: C.black,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.34), fontWeight: 900,
        color: C.cream, letterSpacing: '-0.03em', flexShrink: 0,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      GM
    </div>
  )
}

// Eyebrow — 10px uppercase, very wide letter-spacing
function Eyebrow({ children, style: s = {} }) {
  return (
    <div
      style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '0.38em',
        textTransform: 'uppercase', color: C.grayMid,
        ...s,
      }}
    >
      {children}
    </div>
  )
}

// Live dot — slow dignified pulse
function LiveDot({ size = 7 }) {
  return (
    <span
      style={{
        position: 'relative',
        width: size, height: size,
        flexShrink: 0, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: C.green,
          animation: 'dignifiedPulse 2.5s ease-in-out infinite',
        }}
      />
      <span
        style={{
          position: 'absolute', inset: '1px', borderRadius: '50%',
          background: C.green, opacity: 0.65,
        }}
      />
    </span>
  )
}

// ── Dashboard Mockup ───────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.09)',
        overflow: 'hidden',
        fontSize: 12,
        userSelect: 'none',
        lineHeight: 1.4,
        boxShadow: [
          '0 1px 3px rgba(0,0,0,0.03)',
          '0 8px 24px rgba(0,0,0,0.05)',
          '0 24px 64px rgba(0,0,0,0.07)',
        ].join(', '),
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 16px', height: 46,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <GMLogo size={24} />
          <span
            style={{
              color: C.black, fontWeight: 600, fontSize: 13,
              letterSpacing: '-0.01em', fontFamily: SERIF,
            }}
          >
            GameModel
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              color: C.grayLight, fontSize: 11,
              fontFamily: SERIF, fontStyle: 'italic',
            }}
          >
            Sezóna 2025/26
          </span>
          <div
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: C.black,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: C.cream,
            }}
          >
            RF
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', minHeight: 310 }}>

        {/* Sidebar */}
        <div
          style={{
            width: 160, flexShrink: 0,
            background: C.card,
            borderRight: `1px solid ${C.border}`,
            paddingTop: 12, paddingBottom: 12,
          }}
        >
          {MOCK_NAV.map(item => (
            <div
              key={item.label}
              style={{
                padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: 8,
                background: item.active ? 'rgba(26,93,58,0.07)' : 'transparent',
                borderLeft: item.active ? `2px solid ${C.green}` : '2px solid transparent',
                color: item.active ? C.green : C.grayMid,
                fontWeight: item.active ? 600 : 400,
                cursor: 'default', fontSize: 11,
              }}
            >
              <span style={{ fontSize: 12 }}>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '16px 18px', background: C.white }}>

          {/* Dashboard header */}
          <div
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: C.grayLight, marginBottom: 4,
                }}
              >
                — Prehľad
              </div>
              <div
                style={{
                  color: C.black, fontSize: 18, fontWeight: 400,
                  fontFamily: SERIF, fontStyle: 'italic',
                }}
              >
                Dobrý deň, Rado.
              </div>
            </div>
            <div
              style={{
                padding: '3px 9px',
                border: `1px solid ${C.green}`,
                color: C.green, fontSize: 9, fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                borderRadius: 2,
              }}
            >
              Aktívny
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {MOCK_STATS.map(s => (
              <div
                key={s.label}
                style={{
                  flex: 1, background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: '10px 12px',
                }}
              >
                <div
                  style={{
                    color: C.grayLight, fontSize: 9, marginBottom: 5,
                    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    color: C.black, fontSize: 26, fontWeight: 400,
                    lineHeight: 1, fontFamily: SERIF,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ color: C.grayLight, fontSize: 9, marginTop: 4 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div
            style={{
              fontSize: 9, fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.grayLight, marginBottom: 8,
            }}
          >
            — Nadchádzajúce udalosti
          </div>
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8, overflow: 'hidden',
            }}
          >
            {MOCK_EVENTS.map((ev, i) => (
              <div
                key={ev.label}
                style={{
                  padding: '8px 12px',
                  display: 'flex', alignItems: 'center', gap: 9,
                  borderBottom: i < MOCK_EVENTS.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: ev.green ? C.green : C.grayMid,
                    opacity: ev.green ? 0.85 : 0.35,
                  }}
                />
                <span style={{ flex: 1, color: C.black, fontSize: 11 }}>{ev.label}</span>
                <span
                  style={{
                    color: C.grayMid, fontSize: 10,
                    fontFamily: SERIF, fontStyle: 'italic',
                  }}
                >
                  {ev.time}
                </span>
                <ChevronRight size={10} color={C.grayLight} strokeWidth={1.5} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Feature card ───────────────────────────────────────────────────────────────

function FeatureCard({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12, padding: 32,
        cursor: 'default',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform   = 'translateY(-2px)'
        e.currentTarget.style.borderColor = C.borderSt
        e.currentTarget.style.boxShadow   = '0 4px 20px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform   = 'translateY(0)'
        e.currentTarget.style.borderColor = C.border
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Icon in thin green circle */}
      <div
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: `1px solid ${C.green}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22, opacity: 0.72,
        }}
      >
        <Icon size={15} color={C.green} strokeWidth={1.5} />
      </div>

      {/* Title — small caps */}
      <h3
        style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: C.black, margin: '0 0 10px',
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p style={{ fontSize: 13, lineHeight: 1.75, color: C.gray, margin: '0 0 20px' }}>
        {desc}
      </p>

      {/* Viac link */}
      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 11, fontWeight: 600, color: C.green, letterSpacing: '0.04em',
        }}
      >
        Viac <ArrowRight size={11} strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: C.bg, color: C.black, minHeight: '100vh' }}>

      {/* ═══════════════════════ NAVBAR ═════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: scrolled ? 'rgba(245,243,237,0.93)' : 'transparent',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          height: 64,
        }}
      >
        <nav
          className="max-w-6xl mx-auto px-6 lg:px-9 h-full flex items-center justify-between"
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GMLogo size={26} />
            <span
              style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontFamily: SERIF, color: C.black,
              }}
            >
              Gamemodel
            </span>
          </div>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center" style={{ gap: 28 }}>
            {['Filozofia', 'Funkcie'].map(label => (
              <span
                key={label}
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: C.grayMid, cursor: 'pointer',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.black)}
                onMouseLeave={e => (e.currentTarget.style.color = C.grayMid)}
              >
                {label}
              </span>
            ))}

            {/* Kontakt — green underline */}
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: C.green,
                borderBottom: `1px solid ${C.green}`, paddingBottom: 1,
                textDecoration: 'none', transition: 'opacity 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Kontakt
            </a>

            {/* Demo button */}
            <a
              href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
              style={{
                background: C.black, color: C.cream,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '8px 16px', borderRadius: 2, textDecoration: 'none',
                display: 'inline-block', transition: 'opacity 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity   = '0.85'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity   = '1'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Demo
            </a>
          </div>

          {/* Mobile: demo only */}
          <a
            href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
            className="md:hidden"
            style={{
              background: C.black, color: C.cream,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '7px 14px', borderRadius: 2, textDecoration: 'none',
            }}
          >
            Demo
          </a>
        </nav>
      </header>

      <main>

        {/* ═══════════════════════ HERO ═══════════════════════════════════════════ */}
        <section
          style={{
            minHeight: '90vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(80px, 12vh, 120px) 24px clamp(60px, 8vh, 80px)',
          }}
        >
          <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
            <motion.div variants={heroStagger} initial="hidden" animate="show">

              {/* Eyebrow */}
              <motion.div variants={heroItem} style={{ marginBottom: 36 }}>
                <Eyebrow>— Pre futbalové kluby —</Eyebrow>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={heroItem}
                style={{
                  fontSize: 'clamp(2.75rem, 8.5vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.96,
                  letterSpacing: '-0.04em',
                  color: C.black,
                  margin: 0,
                }}
              >
                <span style={{ display: 'block' }}>Tréneri, hráči,</span>
                <span style={{ display: 'block' }}>dochádzka, zápasy.</span>
                {/* "Jednoducho." — Rolex green + forward lean */}
                <span
                  style={{
                    display: 'inline-block',
                    color: C.green,
                    transform: 'skewX(-5deg)',
                    marginTop: '0.05em',
                  }}
                >
                  Jednoducho.
                </span>
              </motion.h1>

              {/* Thin ruled line */}
              <motion.div
                variants={heroItem}
                style={{
                  width: 60, height: 1,
                  background: C.black, opacity: 0.18,
                  margin: '28px auto',
                }}
              />

              {/* Rolex tagline — Georgia/Lora italic, mixed roman/italic rhythm */}
              <motion.div
                variants={heroItem}
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontFamily: SERIF,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: C.black,
                  marginBottom: 20,
                  letterSpacing: '-0.01em',
                }}
              >
                <em>Disciplína.</em>
                {' '}
                <span style={{ fontStyle: 'normal' }}>Detail.</span>
                {' '}
                <em>Víťazstvo</em>
                <span style={{ color: C.green, fontStyle: 'normal' }}>.</span>
              </motion.div>

              {/* Subtagline — Georgia italic, muted */}
              <motion.p
                variants={heroItem}
                style={{
                  fontSize: 16, lineHeight: 1.78, color: C.gray,
                  maxWidth: 500, margin: '0 auto 44px',
                  fontFamily: SERIF, fontStyle: 'italic',
                }}
              >
                Platforma pre kluby ktoré rozumejú, že každý detail rozhoduje
                o úspechu. Od dochádzky cez zostavu až po posledný pohyb na ihrisku.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={heroItem}
                style={{
                  display: 'flex', flexWrap: 'wrap',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 28, marginBottom: 52,
                }}
              >
                {/* Primary — black slab */}
                <a
                  href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
                  style={{
                    background: C.black, color: C.cream,
                    padding: '15px 30px', borderRadius: 2,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.opacity   = '0.87'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.opacity   = '1'
                  }}
                >
                  Požiadať o demo
                  <ArrowRight size={14} strokeWidth={2} />
                </a>

                {/* Secondary — text + underline */}
                <a
                  href={`mailto:${EMAIL}`}
                  style={{
                    color: C.black,
                    fontSize: 13, fontWeight: 500, letterSpacing: '0.02em',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${C.black}`, paddingBottom: 1,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    transition: 'gap 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.gap = '11px')}
                  onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
                >
                  Objavte platformu
                  <ArrowRight size={13} strokeWidth={1.5} />
                </a>
              </motion.div>

              {/* Live attribution */}
              <motion.div
                variants={heroItem}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <LiveDot size={7} />
                <span style={{ fontSize: 12, color: C.grayMid }}>Aktívne používané v</span>
                <span
                  style={{
                    fontSize: 12, color: C.black, fontWeight: 600,
                    fontFamily: SERIF,
                  }}
                >
                  FK Slovan Levice
                </span>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ MOCKUP ══════════════════════════════════════════ */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px' }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', marginBottom: 28 }}
            >
              <Eyebrow>— Skutočná aplikácia —</Eyebrow>
            </motion.div>

            {/* Float wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  transformOrigin: 'top center',
                  animation: 'floatMockup 5s ease-in-out infinite',
                }}
              >
                <DashboardMockup />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════ FEATURES ═════════════════════════════════════════ */}
        <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', marginBottom: 52 }}
            >
              <Eyebrow style={{ marginBottom: 20 }}>— Funkcionalita —</Eyebrow>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
                  fontWeight: 900, letterSpacing: '-0.035em',
                  color: C.black, margin: '0 0 14px', lineHeight: 1.05,
                }}
              >
                Všetko čo futbalový klub potrebuje
              </h2>
              <p
                style={{
                  fontSize: 17, color: C.gray, lineHeight: 1.6,
                  fontFamily: SERIF, fontStyle: 'italic',
                  maxWidth: 440, margin: '0 auto',
                }}
              >
                Jeden systém namiesto piatich Excelových tabuliek.
              </p>
            </motion.div>

            {/* Cards — 1 col mobile / 2 col tablet / 4 col desktop */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {FEATURES.map((f, i) => (
                <FeatureCard key={f.title} {...f} index={i} />
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════ FILOZOFIA + SLEDOVANIE ═══════════════════════════ */}
        <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="phil-grid"
            >

              {/* Left — quote */}
              <div style={{ flex: 1, paddingRight: 0 }} className="phil-col-left">
                <Eyebrow style={{ marginBottom: 20 }}>— Filozofia</Eyebrow>
                <blockquote
                  style={{
                    fontSize: 15, lineHeight: 1.78, color: C.gray,
                    fontFamily: SERIF, fontStyle: 'italic',
                    margin: '0 0 16px',
                  }}
                >
                  „Konečne nástroj, ktorý šetrí trénerom hodiny administratívy každý týždeň."
                </blockquote>
                <Eyebrow>— FK Slovan Levice</Eyebrow>
              </div>

              {/* Divider */}
              <div className="phil-divider" />

              {/* Right — stat */}
              <div style={{ flex: 1 }} className="phil-col-right">
                <Eyebrow style={{ marginBottom: 20 }}>— Sledovanie</Eyebrow>
                <div
                  style={{
                    display: 'flex', alignItems: 'baseline', gap: 0,
                    marginBottom: 10, lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(48px, 7vw, 68px)',
                      fontWeight: 400, fontFamily: SERIF,
                      color: C.black, letterSpacing: '-0.04em',
                    }}
                  >
                    87
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(24px, 3.5vw, 32px)',
                      fontWeight: 400, fontFamily: SERIF,
                      color: C.green,
                    }}
                  >
                    %
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11, color: C.grayMid,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    fontWeight: 500, margin: 0,
                  }}
                >
                  Priemerná dochádzka na tréningoch
                </p>
              </div>

            </motion.div>
          </div>
        </section>

      </main>

      {/* ═══════════════════════ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${C.border}` }}>

        {/* Main footer row */}
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 36px' }}>
          <div className="footer-main">

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <GMLogo size={24} />
                <span
                  style={{
                    fontSize: 13, fontWeight: 600, letterSpacing: '0.2em',
                    textTransform: 'uppercase', fontFamily: SERIF, color: C.black,
                  }}
                >
                  Gamemodel
                </span>
              </div>
              <p
                style={{
                  fontSize: 12, color: C.grayMid,
                  fontFamily: SERIF, fontStyle: 'italic', lineHeight: 1.6, margin: 0,
                }}
              >
                Tréneri, hráči, dochádzka, zápasy. Jednoducho.
              </p>
            </div>

            {/* Launch status */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 7, marginBottom: 7,
                }}
              >
                <LiveDot size={6} />
                <span
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: C.gray,
                  }}
                >
                  Pripravujeme launch
                </span>
              </div>
              <p
                style={{
                  fontSize: 11, color: C.grayMid,
                  fontFamily: SERIF, fontStyle: 'italic', margin: 0,
                }}
              >
                Spustenie Q3 2026
              </p>
            </div>

            {/* Contact */}
            <div>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: C.grayMid, textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.black)}
                onMouseLeave={e => (e.currentTarget.style.color = C.grayMid)}
              >
                <Mail size={12} strokeWidth={1.5} />
                {EMAIL}
              </a>
            </div>

          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            maxWidth: 1120, margin: '0 auto',
            padding: '20px 36px',
          }}
        >
          <div className="footer-bottom" style={{ fontSize: 11, color: C.grayLight }}>
            <span style={{ letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
              Slovensko · Od 2026
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic' }}>
              Vytvorené trénermi, pre trénerov 🇸🇰
            </span>
          </div>
        </div>

      </footer>

    </div>
  )
}
