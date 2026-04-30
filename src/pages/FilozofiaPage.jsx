import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, EMAIL, DEMO_SUBJ, pageTransition, fadeUp } from '../design'
import { PageHero, Eyebrow, ContentSection, MiniCard } from '../components/Primitives'

// ── Visual fragments ───────────────────────────────────────────────────────────

function AttendanceGrid() {
  const rows = [
    { name: 'M. Blaho',   cells: [true,  true,  false, true,  true,  true ] },
    { name: 'R. Kováč',   cells: [true,  false, true,  true,  false, true ] },
    { name: 'J. Horváth', cells: [true,  true,  true,  false, true,  true ] },
    { name: 'P. Novák',   cells: [false, true,  true,  true,  true,  true ] },
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 10 }}>
        Dochádzka — November
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {rows.map(row => (
          <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, color: C.gray, width: 70, flexShrink: 0 }}>{row.name}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {row.cells.map((present, i) => (
                <div
                  key={i}
                  style={{
                    width: 18, height: 18, borderRadius: 3,
                    background: present ? 'rgba(26,93,58,0.15)' : 'rgba(26,26,26,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: present ? C.green : C.grayLight,
                    fontWeight: 700,
                  }}
                >
                  {present ? '✓' : '○'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MiniCard>
  )
}

function PlayerCard() {
  return (
    <MiniCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: C.black,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: C.cream,
        }}>MB</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.black }}>Marek Blaho</div>
          <div style={{ fontSize: 10, color: C.grayMid, fontFamily: SERIF, fontStyle: 'italic' }}>First Team · Stredopoliar</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
        {[{ label: 'Góly', val: '7' }, { label: 'Asistencie', val: '5' }, { label: 'Zápasy', val: '14' }].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 400, fontFamily: SERIF, color: C.black }}>{s.val}</div>
            <div style={{ fontSize: 9, color: C.grayLight, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ color: i <= 4 ? C.green : C.grayLight, fontSize: 13 }}>★</span>
        ))}
      </div>
    </MiniCard>
  )
}

function TrophyVisual() {
  return (
    <MiniCard style={{ textAlign: 'center', padding: '28px 24px' }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
      <div
        style={{
          fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400,
          fontFamily: SERIF, color: C.black, letterSpacing: '-0.03em', lineHeight: 1,
        }}
      >
        12 hodín
      </div>
      <div style={{ fontSize: 11, color: C.grayMid, marginTop: 6, letterSpacing: '0.08em' }}>
        / týždenne ušetrených
      </div>
    </MiniCard>
  )
}

// ── PillarLabel — replaces small eyebrow for the three pillars ─────────────────

function PillarLabel({ numeral, title }) {
  return (
    <div>
      {/* Roman numeral — Lora italic green, large */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(40px, 5vw, 56px)',
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          color: C.green, lineHeight: 1, marginBottom: 12,
        }}
      >
        {numeral}
      </motion.div>

      {/* Title — Inter sans, wide letter-spacing */}
      <div
        style={{
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          fontWeight: 700, letterSpacing: '0.42em',
          textTransform: 'uppercase', color: C.black,
        }}
      >
        {title}
      </div>

      {/* Green accent line */}
      <div
        style={{
          width: 48, height: 1,
          background: C.green,
          margin: '24px 0 32px',
        }}
      />
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FilozofiaPage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Filozofia —"
        headline="Každý detail rozhoduje o úspechu."
        subtitle="Tri princípy ktoré formujú každý detail GameModelu."
        serifHeadline
      />

      {/* ═══ TRINITY CALLOUT ════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>

            <Eyebrow style={{ marginBottom: 28 }}>— Tri princípy</Eyebrow>

            {/* The trinity — Lora italic large, green separators */}
            <div
              style={{
                fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
                fontFamily: SERIF, fontWeight: 400,
                lineHeight: 1.3, marginBottom: 24,
                display: 'flex', flexWrap: 'wrap',
                justifyContent: 'center', alignItems: 'baseline',
              }}
            >
              <em style={{ color: C.black, fontStyle: 'italic' }}>Disciplína.</em>
              <span style={{ color: C.green, fontStyle: 'normal', margin: '0 14px', fontFamily: SERIF }}>·</span>
              <em style={{ color: C.black, fontStyle: 'italic' }}>Detail.</em>
              <span style={{ color: C.green, fontStyle: 'normal', margin: '0 14px', fontFamily: SERIF }}>·</span>
              <em style={{ color: C.green, fontStyle: 'italic' }}>Víťazstvo.</em>
            </div>

            <p
              style={{
                fontSize: 18, color: C.gray,
                fontFamily: SERIF, fontStyle: 'italic',
                margin: 0, lineHeight: 1.6,
              }}
            >
              Tri slová. Tri princípy. Jedna filozofia.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ═══ PILLAR 1 — DISCIPLÍNA ══════════════════════════════════════════════ */}
      <ContentSection
        label={<PillarLabel numeral="I." title="DISCIPLÍNA" />}
        headline="Nič sa nedeje náhodou. Tréner ktorý vie kedy, kto a prečo chýbal, vie čo má robiť ďalej."
        body="GameModel zaznamenáva každý tréning, každú dochádzku, každý detail. Aby si vždy vedel čo sa v tíme deje. Bez Excelových tabuliek. Bez chaotických WhatsApp skupín."
        visual={<AttendanceGrid />}
      />

      {/* ═══ PILLAR 2 — DETAIL ══════════════════════════════════════════════════ */}
      <ContentSection
        label={<PillarLabel numeral="II." title="DETAIL" />}
        headline="Rozdiel medzi priemerným a výnimočným klubom je v detailoch ktoré nikto nevidí."
        body="Štatistiky hráčov, hodnotenia zápasov, sledovanie talentov. Všetko v jednom mieste, prehľadne. Pretože detail rozhoduje — či pri scoutovaní, výbere zostavy, alebo dlhodobom rozvoji hráča."
        visual={<PlayerCard />}
        flipped
        altBg
      />

      {/* ═══ PILLAR 3 — VÍŤAZSTVO ═══════════════════════════════════════════════ */}
      <ContentSection
        label={<PillarLabel numeral="III." title="VÍŤAZSTVO" />}
        headline="Víťazstvo nezačína na ihrisku. Začína v tom, ako klub funguje od pondelka do nedele."
        body="Šetríme trénerom hodiny administratívy týždenne. Aby sa mohli sústrediť na to, prečo prišli — futbal."
        visual={<TrophyVisual />}
      />

      {/* ═══ CLOSING — story + quote ════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
            className="phil-grid"
          >

            {/* Quote */}
            <div style={{ flex: 1 }}>
              <blockquote
                style={{
                  fontSize: 17, lineHeight: 1.78, color: C.black,
                  fontFamily: SERIF, fontStyle: 'italic',
                  margin: '0 0 20px',
                }}
              >
                „Vytvorili sme GameModel pretože sme cítili, že existujúce nástroje nás nepodporujú. Tak sme si urobili svoj."
              </blockquote>
              <p
                style={{
                  fontSize: 12, color: C.grayMid,
                  fontFamily: SERIF, fontStyle: 'italic',
                  margin: '0 0 16px',
                }}
              >
                — Rado · Štefan · Tomáš · Gabo · Dávid
              </p>
              <p
                style={{
                  fontSize: 11, color: C.gray,
                  fontFamily: SERIF, fontStyle: 'italic',
                  letterSpacing: '0.12em', margin: 0,
                }}
              >
                Cesta je cieľ
              </p>
            </div>

            <div className="phil-divider" />

            {/* Story */}
            <div style={{ flex: 1 }}>
              <Eyebrow style={{ marginBottom: 18 }}>— Príbeh</Eyebrow>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray, margin: 0 }}>
                GameModel vznikol v roku 2025 v FK Slovan Levice. Začalo to ako interný
                nástroj pre náš klub. Teraz ho otvárame ostatným klubom ktorí zdieľajú
                našu filozofiu.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══ CLOSING CTA ════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 0 80px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow style={{ marginBottom: 20 }}>— Začnite —</Eyebrow>
            <p
              style={{
                fontSize: 20, fontFamily: SERIF, fontStyle: 'italic',
                color: C.black, marginBottom: 32, lineHeight: 1.4,
              }}
            >
              Vyskúšajte filozofiu v praxi
            </p>
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
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
