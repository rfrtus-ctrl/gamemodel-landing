import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { C, SERIF, EMAIL, pageTransition, fadeUp } from '../design'
import { PageHero, Eyebrow, DiamondLogo } from '../components/Primitives'
import PricingCards from '../components/PricingCards'

// ── Data ───────────────────────────────────────────────────────────────────────

const ENTERPRISE_FEATURES = [
  'Custom branding',
  'API prístup',
  'Pokročilé reporty',
  'Dedicated account manager',
  'Onboarding + školenie',
  'SLA podľa dohody',
  'Custom integrácie',
  'White-label option',
]

const HOW_STEPS = [
  {
    num: '1.',
    title: 'Počítate hráčov',
    body: 'Cena podľa aktívnych hráčov v kádri. Archivovaní hráči sa nepočítajú. Klub má presný prehľad.',
  },
  {
    num: '2.',
    title: 'Soft limit s grace period',
    body: 'Pri prekročení limitu máte 30 dní na upgrade alebo archiváciu starých hráčov. Žiadne prekvapenia.',
  },
  {
    num: '3.',
    title: 'Auto-upgrade',
    body: 'Po 30 dňoch nad limitom sa plán automaticky upgrade. Vždy len krok dopredu, nikdy späť.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Čo ak prekročíme limit hráčov?',
    a: 'Nič sa nestane okamžite. Máte 30 dní na rozhodnutie — buď upgrade na vyšší plán, alebo archivácia neaktívnych hráčov. Po 30 dňoch sa plán automaticky upgrade.',
  },
  {
    q: 'Môžem zrušiť kedykoľvek?',
    a: 'Áno. Žiadny záväzok, žiadna výpovedná lehota. Pri ročnej platbe vraciame nevyužitú časť pomerne.',
  },
  {
    q: 'Ako sa počítajú hráči?',
    a: 'Iba aktívni hráči v kádri tímov. Archivovaní hráči (odišli z klubu, neaktívni) sa nepočítajú. Hostia (na hosťovaní) sa tiež nepočítajú.',
  },
  {
    q: 'Je možný individuálny plán?',
    a: 'Áno, pre top kluby a federácie ponúkame Enterprise riešenia s custom cenou a features. Kontaktujte nás na info@gamemodel.sk.',
  },
  {
    q: 'Prečo platíte za klub a nie za tím?',
    a: 'Lebo váš klub má 14 tímov ale stále je to jeden klub. Konkurencia by si pýtala 240 € mesačne. My 49 €. Spravodlivý pricing podľa veľkosti, nie podľa arbitrárnych jednotiek.',
  },
]

// ── FAQ Accordion ──────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div>
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', background: 'none', border: 'none',
              padding: '20px 0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 15, fontWeight: 600, color: C.black,
                textAlign: 'left', lineHeight: 1.4,
              }}
            >
              {item.q}
            </span>
            <span
              style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${open === i ? C.green : C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: open === i ? C.green : C.grayMid,
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {open === i
                ? <Minus size={12} strokeWidth={2} />
                : <Plus  size={12} strokeWidth={2} />
              }
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p
                  style={{
                    fontSize: 15, lineHeight: 1.75, color: C.gray,
                    margin: '0 40px 20px 0',
                  }}
                >
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ClenstvoPage() {
  return (
    <motion.div {...pageTransition}>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════════ */}
      <PageHero
        eyebrow="— Členstvo —"
        headline="Platíte podľa veľkosti klubu, nie podľa počtu funkcií."
        subtitle="Spravodlivý pricing. Žiadne skryté poplatky. Bez záväzku."
      />

      {/* ═══ PRICING CARDS ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <PricingCards />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 36 }}
          >
            <a
              href="#enterprise"
              style={{
                fontSize: 12, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: C.green, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Pre top kluby a federácie — Enterprise riešenia
              <ArrowRight size={12} strokeWidth={2} />
            </a>
            <p
              style={{
                fontSize: 13, fontFamily: SERIF, fontStyle: 'italic',
                color: C.grayMid, margin: '14px 0 0',
              }}
            >
              Ceny bez DPH. Pri ročnej platbe 2 mesiace zadarmo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ ENTERPRISE ═════════════════════════════════════════════════════════ */}
      <section
        id="enterprise"
        style={{ padding: '72px 0', borderTop: `1px solid ${C.border}`, background: C.card }}
      >
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
          >
            <div
              style={{
                background: C.white, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: 40,
                display: 'flex', gap: 48, flexWrap: 'wrap',
              }}
            >
              {/* Left */}
              <div style={{ flex: '0 0 auto', maxWidth: 320, minWidth: 220 }}>
                <DiamondLogo size={40} />
                <div style={{ marginTop: 20 }}>
                  <Eyebrow style={{ marginBottom: 12 }}>— Enterprise</Eyebrow>
                  <h3
                    style={{
                      fontFamily: SERIF, fontWeight: 700, fontSize: 24,
                      color: C.black, margin: '0 0 12px', lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Pre top kluby a federácie
                  </h3>
                  <p
                    style={{
                      fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
                      color: C.gray, margin: '0 0 28px', lineHeight: 1.6,
                    }}
                  >
                    Profesionálne kluby, regionálne federácie, akadémie 600+ hráčov. Cena na vyžiadanie.
                  </p>
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent('Enterprise riešenie — GameModel')}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: C.black, color: C.cream,
                      padding: '12px 22px', borderRadius: 3,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
                      textTransform: 'uppercase', textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Kontaktovať nás
                    <ArrowRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* Right — feature grid */}
              <div style={{ flex: 1, minWidth: 240 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '12px 24px',
                    paddingTop: 4,
                  }}
                >
                  {ENTERPRISE_FEATURES.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          color: C.green, fontWeight: 700, fontSize: 13, flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: 13, color: C.gray, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 52 }}
          >
            <Eyebrow style={{ marginBottom: 20 }}>— Ako to funguje —</Eyebrow>
            <h2
              style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                color: C.black, margin: 0, lineHeight: 1.3,
              }}
            >
              Jedno číslo riadi všetko.
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 36,
            }}
          >
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  style={{
                    fontFamily: SERIF, fontStyle: 'italic', fontSize: 36,
                    fontWeight: 400, color: C.green, lineHeight: 1, marginBottom: 14,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: C.black, marginBottom: 10,
                  }}
                >
                  {step.title}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray, margin: 0 }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section
        style={{ padding: '72px 0', borderTop: `1px solid ${C.border}`, background: C.card }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
          >
            <Eyebrow style={{ marginBottom: 20 }}>— Časté otázky —</Eyebrow>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 900, letterSpacing: '-0.035em',
                color: C.black, margin: '0 0 40px', lineHeight: 1.05,
              }}
            >
              Otázky ktoré nám klub kladie
            </h2>
          </motion.div>
          <FaqAccordion />
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
          >
            <Eyebrow style={{ marginBottom: 20 }}>— Začnite —</Eyebrow>
            <h2
              style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                color: C.black, margin: '0 0 12px', lineHeight: 1.3,
              }}
            >
              Vyberte si plán pre váš klub
            </h2>
            <p
              style={{
                fontSize: 18, fontFamily: SERIF, fontStyle: 'italic',
                color: C.gray, margin: '0 0 36px', lineHeight: 1.5,
              }}
            >
              Alebo si ho ukážeme v 15-minútovej demo session.
            </p>
            <div
              style={{
                display: 'flex', flexWrap: 'wrap', gap: 16,
                justifyContent: 'center', alignItems: 'center',
              }}
            >
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('Demo GameModel')}`}
                style={{
                  background: C.black, color: C.cream,
                  padding: '14px 28px', borderRadius: 3,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'transform 0.3s, opacity 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.87' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.opacity = '1' }}
              >
                Požiadať o demo
                <ArrowRight size={13} strokeWidth={2} />
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('Začneme zadarmo — GameModel')}`}
                style={{
                  color: C.black, fontSize: 13, fontWeight: 500,
                  textDecoration: 'none', borderBottom: `1px solid ${C.black}`,
                  paddingBottom: 1,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  transition: 'gap 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = '11px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
              >
                Začnite zadarmo 14 dní
                <ArrowRight size={12} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
