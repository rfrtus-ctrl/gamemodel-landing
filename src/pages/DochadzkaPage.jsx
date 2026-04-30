import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, pageTransition, fadeUp } from '../design'
import { PageHero, ContentSection, MiniCard, Eyebrow } from '../components/Primitives'

// ── Visual fragments ───────────────────────────────────────────────────────────

function AttendanceMatrix() {
  const players = ['M. Blaho', 'R. Kováč', 'J. Horváth', 'P. Novák', 'T. Sloboda']
  const dates   = ['5.11', '8.11', '12.11', '15.11', '19.11', '22.11']
  const data = [
    [true,  true,  false, true,  true,  true ],
    [true,  false, true,  true,  false, true ],
    [true,  true,  true,  false, true,  true ],
    [false, true,  true,  true,  true,  true ],
    [true,  true,  true,  true,  false, false],
  ]
  return (
    <MiniCard style={{ overflowX: 'auto' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 10 }}>
        Dochádzka — November 2025
      </div>
      <table style={{ borderCollapse: 'collapse', fontSize: 10, minWidth: 280 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '3px 6px', color: C.grayLight, fontWeight: 500, width: 80 }}></th>
            {dates.map(d => (
              <th key={d} style={{ padding: '3px 6px', color: C.grayLight, fontWeight: 500, fontSize: 9, textAlign: 'center' }}>{d}</th>
            ))}
            <th style={{ padding: '3px 6px', color: C.grayMid, fontWeight: 700, fontSize: 9, textAlign: 'center' }}>%</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, pi) => {
            const pct = Math.round((data[pi].filter(Boolean).length / dates.length) * 100)
            return (
              <tr key={p} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: '6px 6px', color: C.black, fontWeight: 500, fontSize: 10, whiteSpace: 'nowrap' }}>{p}</td>
                {data[pi].map((present, di) => (
                  <td key={di} style={{ padding: '6px 6px', textAlign: 'center' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 3,
                      background: present ? 'rgba(26,93,58,0.15)' : 'rgba(26,26,26,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, color: present ? C.green : C.grayLight,
                      fontWeight: 700, margin: '0 auto',
                    }}>
                      {present ? '✓' : '○'}
                    </div>
                  </td>
                ))}
                <td style={{ padding: '6px 6px', textAlign: 'center', color: pct >= 80 ? C.green : C.grayMid, fontWeight: 700, fontSize: 10, fontFamily: SERIF }}>
                  {pct}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </MiniCard>
  )
}

function TrendCard() {
  const players = [
    { name: 'M. Blaho',   trend: '+12%', color: C.green, note: 'Zlepšuje sa' },
    { name: 'R. Kováč',   trend: '–8%',  color: '#c0392b', note: 'Pokles' },
    { name: 'T. Sloboda', trend: '100%', color: C.green, note: 'Perfektná' },
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12 }}>
        Trendy dochádzky
      </div>
      {players.map((p, i) => (
        <div key={p.name} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: i < players.length - 1 ? `1px solid ${C.border}` : 'none',
        }}>
          <div>
            <div style={{ fontSize: 11, color: C.black, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 9, color: C.grayLight, fontFamily: SERIF, fontStyle: 'italic' }}>{p.note}</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 400, fontFamily: SERIF, color: p.color }}>{p.trend}</div>
        </div>
      ))}
    </MiniCard>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DochadzkaPage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Funkcia —"
        headline="Dochádzka"
        subtitle="Rýchle zaznamenávanie cez mobil. Reporty ktoré dávajú zmysel."
      />

      {/* Large stat callout */}
      <section style={{ padding: '64px 0 48px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
          >
            <Eyebrow style={{ marginBottom: 16 }}>— FK Slovan Levice</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0, lineHeight: 1, marginBottom: 14 }}>
              <span style={{ fontSize: 'clamp(56px, 12vw, 96px)', fontWeight: 400, fontFamily: SERIF, color: C.black, letterSpacing: '-0.04em' }}>
                87
              </span>
              <span style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 400, fontFamily: SERIF, color: C.green }}>
                %
              </span>
            </div>
            <p style={{ fontSize: 14, color: C.grayMid, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, margin: 0 }}>
              Priemerná dochádzka na tréningoch za sezónu 2025/26
            </p>
          </motion.div>
        </div>
      </section>

      <ContentSection
        eyebrow="— I. Rýchlosť"
        headline="Tréner zaznamená dochádzku za 30 sekúnd. Telefónom. Na ihrisku."
        body="Bez papierov. Bez Excelu. Bez prepisovania. Jednoducho odškrtnete kto prišiel a hotovo."
        altBg
      />

      <ContentSection
        eyebrow="— II. Štruktúra"
        headline="Tréningy a zápasy sa sledujú oddelene."
        body="Hráč môže mať 95% dochádzku na tréningoch ale len 60% na zápasoch. GameModel vám ukáže rozdiel."
        visual={<AttendanceMatrix />}
        flipped
      />

      <ContentSection
        eyebrow="— III. Reporty"
        headline="Týždenné, mesačné, sezónne. Per hráč, per tím, per kategória."
        body="Export do Excelu v matrix layout (mesiac × hráči). Pre rodičov, pre vedenie, pre seba."
        altBg
      />

      <ContentSection
        eyebrow="— IV. Trendy"
        headline="Kto často chýba? Kto sa zlepšuje? Kto má 100%?"
        body="GameModel automaticky identifikuje trendy. Hráči ktorých dochádzka klesá. Hráči ktorí sa stali pravidelnými."
        visual={<TrendCard />}
        flipped
      />

      {/* CTA */}
      <section style={{ padding: '56px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Eyebrow style={{ marginBottom: 16 }}>Ďalšia funkcia</Eyebrow>
          <Link
            to="/funkcie/zapasy"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 15, fontWeight: 600, color: C.black,
              fontFamily: SERIF, textDecoration: 'none',
              borderBottom: `1px solid ${C.black}`, paddingBottom: 2,
            }}
          >
            Pozrite si Zápasy <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

    </motion.div>
  )
}
