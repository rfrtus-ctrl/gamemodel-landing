import { motion } from 'framer-motion'
import { Users, User, ClipboardCheck, Trophy, ArrowRight } from 'lucide-react'
import { C, SERIF, EMAIL, DEMO_SUBJ, heroStagger, heroItem, pageTransition, fadeUp } from '../design'
import { Eyebrow, LiveDot, FeatureCard } from '../components/Primitives'
import DashboardMockup from '../components/DashboardMockup'

const FEATURES = [
  {
    icon: Users,
    title: 'Trénerský tím',
    desc:  'Manažujte trénerský tím, role a oprávnenia. Každý tréner vidí len to čo má vidieť.',
    to:    '/funkcie/treneri',
  },
  {
    icon: User,
    title: 'Hráči',
    desc:  'Kompletná evidencia hráčov, zdravotné záznamy, štatistiky a výkonnosť v jednom mieste.',
    to:    '/funkcie/hraci',
  },
  {
    icon: ClipboardCheck,
    title: 'Dochádzka',
    desc:  'Rýchle zaznamenávanie cez mobil. Reporty pre tréning, zápasy aj dlhodobé trendy.',
    to:    '/funkcie/dochadzka',
  },
  {
    icon: Trophy,
    title: 'Zápasy',
    desc:  'Plánovanie zápasov, zostavy, výsledky. Automatické notifikácie pre rodičov.',
    to:    '/funkcie/zapasy',
  },
]

export default function HomePage() {
  return (
    <motion.div {...pageTransition}>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: '90vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(80px,12vh,120px) 24px clamp(60px,8vh,80px)',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
          <motion.div variants={heroStagger} initial="hidden" animate="show">

            {/* Eyebrow */}
            <motion.div variants={heroItem} style={{ marginBottom: 36 }}>
              <Eyebrow>— Pre futbalové kluby —</Eyebrow>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItem}
              style={{
                fontSize: 'clamp(2.75rem, 8.5vw, 4.5rem)',
                fontWeight: 900, lineHeight: 0.96,
                letterSpacing: '-0.04em', color: C.black, margin: 0,
              }}
            >
              <span style={{ display: 'block' }}>Tréneri, hráči,</span>
              <span style={{ display: 'block' }}>dochádzka, zápasy.</span>
              <span
                style={{
                  display: 'inline-block', color: C.green,
                  transform: 'skewX(-5deg)', marginTop: '0.05em',
                }}
              >
                Jednoducho.
              </span>
            </motion.h1>

            {/* Rule */}
            <motion.div
              variants={heroItem}
              style={{ width: 60, height: 1, background: C.black, opacity: 0.18, margin: '28px auto' }}
            />

            {/* Tagline — Lora italic */}
            <motion.div
              variants={heroItem}
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontFamily: SERIF, fontWeight: 400,
                lineHeight: 1.3, color: C.black,
                marginBottom: 20, letterSpacing: '-0.01em',
              }}
            >
              <em>Disciplína.</em>{' '}
              <span style={{ fontStyle: 'normal' }}>Detail.</span>{' '}
              <em>Víťazstvo</em>
              <span style={{ color: C.green, fontStyle: 'normal' }}>.</span>
            </motion.div>

            {/* Subtitle */}
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
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.87' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.opacity = '1' }}
              >
                Požiadať o demo
                <ArrowRight size={14} strokeWidth={2} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  color: C.black, fontSize: 13, fontWeight: 500,
                  letterSpacing: '0.02em', textDecoration: 'none',
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
              <span style={{ fontSize: 12, color: C.black, fontWeight: 600, fontFamily: SERIF }}>
                FK Slovan Levice
              </span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═══ MOCKUP ══════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px' }}>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 14 }}
          >
            <Eyebrow>— Skutočná aplikácia —</Eyebrow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: 'center', marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 17, color: C.grayMid,
                fontFamily: SERIF, fontStyle: 'italic', margin: 0,
              }}
            >
              Toto vidí tréner každé ráno.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
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

      {/* ═══ FEATURES ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══ FILOZOFIA + STAT SPLIT ══════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
            className="phil-grid"
          >

            {/* Left — quote */}
            <div style={{ flex: 1 }}>
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

            <div className="phil-divider" />

            {/* Right — stat */}
            <div style={{ flex: 1 }}>
              <Eyebrow style={{ marginBottom: 20 }}>— Sledovanie</Eyebrow>
              <div
                style={{
                  display: 'flex', alignItems: 'baseline',
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
                    fontWeight: 400, fontFamily: SERIF, color: C.green,
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

    </motion.div>
  )
}
