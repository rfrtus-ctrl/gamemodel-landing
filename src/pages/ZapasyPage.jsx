import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, EMAIL, DEMO_SUBJ, pageTransition, fadeUp } from '../design'
import { PageHero, ContentSection, MiniCard, Eyebrow } from '../components/Primitives'

// ── Visual fragments ───────────────────────────────────────────────────────────

function MatchCard() {
  const lineup = ['Horváth', 'Blaho', 'Kováč', 'Novák', 'Petráš', 'Sloboda', 'Mináč', 'Lukáč', 'Baláž', 'Varga', 'Tóth']
  return (
    <MiniCard>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 400, fontFamily: SERIF, color: C.black, letterSpacing: '-0.02em', marginBottom: 4 }}>
          First Team <span style={{ color: C.green, fontWeight: 700 }}>2:0</span> vs Šaľa
        </div>
        <div style={{ fontSize: 11, color: C.grayMid, fontFamily: SERIF, fontStyle: 'italic' }}>
          20. apríla 2026 · 3-5-2 · Doma
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 0, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: 12 }}>
        {[
          { label: 'Hráči', val: '11' },
          { label: 'Striedania', val: '3' },
          { label: 'Góly', val: '2' },
          { label: 'Asistencie', val: '1' },
        ].map((s, i) => (
          <div key={s.label} style={{
            flex: 1, textAlign: 'center', padding: '8px 4px',
            borderLeft: i > 0 ? `1px solid ${C.border}` : 'none',
          }}>
            <div style={{ fontSize: 14, fontWeight: 400, fontFamily: SERIF, color: C.black }}>{s.val}</div>
            <div style={{ fontSize: 8, color: C.grayLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lineup */}
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 6 }}>
        Zostava
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {lineup.map((player, i) => (
          <span key={player} style={{
            fontSize: 9, padding: '2px 6px', borderRadius: 3,
            background: i < 11 ? 'rgba(26,93,58,0.07)' : C.border,
            color: i < 11 ? C.green : C.grayMid,
            fontWeight: 600, letterSpacing: '0.04em',
          }}>
            {player}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ fontSize: 11, color: i <= 4 ? C.green : C.grayLight }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: 9, color: C.grayLight, fontFamily: SERIF, fontStyle: 'italic' }}>Hodnotenie zápasu</span>
      </div>
    </MiniCard>
  )
}

function FormationVisual() {
  // Simple 3-5-2 formation visualization
  const rows = [
    { label: 'Útok',    positions: ['Mináč', 'Baláž'] },
    { label: 'Stred',   positions: ['Sloboda', 'Blaho', 'Kováč', 'Petráš', 'Novák'] },
    { label: 'Obrana',  positions: ['Lukáč', 'Tóth', 'Varga'] },
    { label: 'Brankár', positions: ['Horváth'] },
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12, textAlign: 'center' }}>
        Formácia 3-5-2
      </div>
      <div style={{
        background: 'rgba(26,93,58,0.04)', border: `1px solid rgba(26,93,58,0.1)`,
        borderRadius: 8, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {rows.map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {row.positions.map(p => (
              <div key={p} style={{
                width: 38, textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: C.green, opacity: 0.8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 7, fontWeight: 800, color: C.cream,
                }}>
                  {p.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: 7, color: C.grayMid, whiteSpace: 'nowrap' }}>{p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </MiniCard>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ZapasyPage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Funkcia —"
        headline="Zápasy"
        subtitle="Od plánovania cez zostavu až po hodnotenie. Všetko v jednom toku."
      />

      {/* Match callout */}
      <section style={{ padding: '56px 0 40px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
          >
            <MatchCard />
          </motion.div>
        </div>
      </section>

      <ContentSection
        eyebrow="— I. Plánovanie"
        headline="Domáce alebo vonku. Súper, dátum, miesto, kategória."
        body="Naplánujte zápasy na týždne dopredu. Automatické notifikácie pre rodičov a hráčov."
        altBg
      />

      <ContentSection
        eyebrow="— II. Zostavy"
        headline="Vyber zostavu z kádra. Formácia. Striedania."
        body="4-3-3, 3-5-2, 4-4-2 — všetky formácie. Drag-and-drop interface. História zostáv pre porovnanie."
        visual={<FormationVisual />}
        flipped
      />

      <ContentSection
        eyebrow="— III. Výsledky"
        headline="Skóre, góly, asistencie, karty, minutáž — všetko po zápase."
        body="Každý zápas má detailný záznam. Štatistiky sa automaticky priradia hráčom."
        altBg
      />

      <ContentSection
        eyebrow="— IV. Hodnotenia"
        headline="Hodnotenie každého hráča po zápase. 1–5 hviezd."
        body="Tréner ohodnotí každého hráča po zápase. Hodnotenia sa zapracujú do dlhodobých trendov."
      />

      <ContentSection
        eyebrow="— V. Komunikácia"
        headline="Automatické notifikácie pre rodičov a hráčov."
        body="Zmena času zápasu? Notifikácia. Zmena miesta? Notifikácia. Zostava? Notifikácia. Žiadne WhatsApp skupiny."
        altBg
      />

      {/* Final CTA */}
      <section style={{ padding: '72px 0 80px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow style={{ marginBottom: 20 }}>— Začnite dnes —</Eyebrow>
            <a
              href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
              style={{
                background: C.black, color: C.cream,
                padding: '16px 32px', borderRadius: 2,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.87' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.opacity = '1' }}
            >
              Vyskúšať GameModel — Požiadať o demo
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
