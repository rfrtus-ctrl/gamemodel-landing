import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, fadeUp } from '../design'

// ── GMLogo ─────────────────────────────────────────────────────────────────────

export function GMLogo({ size = 28 }) {
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

// ── Eyebrow ────────────────────────────────────────────────────────────────────

export function Eyebrow({ children, style: s = {}, className = '' }) {
  return (
    <div
      className={className}
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

// ── LiveDot ────────────────────────────────────────────────────────────────────

export function LiveDot({ size = 7 }) {
  return (
    <span
      style={{
        position: 'relative', width: size, height: size,
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

// ── FeatureCard (homepage grid) ────────────────────────────────────────────────

export function FeatureCard({ icon: Icon, title, desc, to, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: 32, cursor: 'default',
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
      <h3
        style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: C.black, margin: '0 0 10px',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.75, color: C.gray, margin: '0 0 20px' }}>
        {desc}
      </p>
      {to && (
        <Link
          to={to}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 600, color: C.green,
            letterSpacing: '0.04em', textDecoration: 'none',
          }}
        >
          Viac <ArrowRight size={11} strokeWidth={1.5} />
        </Link>
      )}
    </motion.div>
  )
}

// ── PageHero (inner pages compact hero) ───────────────────────────────────────

export function PageHero({ eyebrow, headline, subtitle, serifHeadline = false }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: '52vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(80px,10vh,110px) 24px clamp(48px,6vh,64px)',
        textAlign: 'center',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 680 }}>
        <Eyebrow style={{ marginBottom: 28 }}>{eyebrow}</Eyebrow>
        <h1
          style={{
            fontSize: serifHeadline
              ? 'clamp(2.2rem, 5vw, 3.5rem)'
              : 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: serifHeadline ? 400 : 900,
            lineHeight: 1.05,
            letterSpacing: serifHeadline ? '-0.01em' : '-0.03em',
            color: C.black, margin: '0 0 20px',
            fontFamily: serifHeadline ? SERIF : undefined,
            fontStyle: serifHeadline ? 'italic' : 'normal',
          }}
        >
          {headline}
        </h1>
        <div style={{ width: 48, height: 1, background: C.black, opacity: 0.18, margin: '20px auto 24px' }} />
        {subtitle && (
          <p
            style={{
              fontSize: 18, lineHeight: 1.7, color: C.gray,
              fontFamily: SERIF, fontStyle: 'italic',
              maxWidth: 500, margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </motion.section>
  )
}

// ── ContentSection (detail pages alternating layout) ──────────────────────────

export function ContentSection({ eyebrow, label, headline, body, visual, flipped = false, altBg = false, extra = null }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '72px 0',
        background: altBg ? C.card : C.bg,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
        <div className={`content-section-inner${flipped ? ' flipped' : ''}`}>
          {/* Text column */}
          <div style={{ flex: 1 }}>
            {label
              ? label
              : <Eyebrow style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>
            }
            <div
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontFamily: SERIF, fontStyle: 'italic',
                fontWeight: 400, lineHeight: 1.3,
                color: C.black, marginBottom: 20,
                letterSpacing: '-0.01em',
              }}
            >
              {headline}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray, margin: 0 }}>
              {body}
            </p>
            {extra}
          </div>

          {/* Visual column */}
          {visual && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {visual}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

// ── MiniCard (generic white card used as visual fragments) ────────────────────

export function MiniCard({ children, style: s = {} }) {
  return (
    <div
      style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        ...s,
      }}
    >
      {children}
    </div>
  )
}

// ── FunkcieCard (funkcie page main grid — larger) ─────────────────────────────

export function FunkcieCard({ icon: Icon, title, desc, to, index, noLink = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: '28px 28px 24px',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        display: 'flex', flexDirection: 'column',
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
      <div
        style={{
          width: 32, height: 32, borderRadius: '50%',
          border: `1px solid ${C.green}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18, opacity: 0.7,
        }}
      >
        <Icon size={13} color={C.green} strokeWidth={1.5} />
      </div>
      <h3
        style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: C.black, margin: '0 0 9px',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: C.gray, margin: '0 0 16px', flex: 1 }}>
        {desc}
      </p>
      {!noLink && to && (
        <Link
          to={to}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 600, color: C.green,
            letterSpacing: '0.04em', textDecoration: 'none',
          }}
        >
          Detail <ArrowRight size={10} strokeWidth={1.5} />
        </Link>
      )}
    </motion.div>
  )
}
