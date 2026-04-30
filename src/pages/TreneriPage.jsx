import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, pageTransition } from '../design'
import { PageHero, ContentSection, MiniCard, Eyebrow } from '../components/Primitives'

// ── Visual fragments ───────────────────────────────────────────────────────────

function PermissionsMatrix() {
  const roles = ['Hlavný tréner', 'Asistent', 'Kondičný', 'Brankársky']
  const perms = ['Hráči', 'Dochádzka', 'Zápasy', 'Reporty']
  const access = [
    [true,  true,  true,  true ],
    [true,  true,  true,  false],
    [false, true,  false, false],
    [false, false, true,  false],
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12 }}>
        Role a oprávnenia
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 10 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '4px 8px', color: C.grayLight, fontWeight: 600, letterSpacing: '0.08em' }}></th>
              {perms.map(p => (
                <th key={p} style={{ padding: '4px 8px', color: C.grayLight, fontWeight: 600, letterSpacing: '0.06em', textAlign: 'center' }}>
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, ri) => (
              <tr key={role} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: '7px 8px', color: C.black, fontWeight: 500, whiteSpace: 'nowrap' }}>{role}</td>
                {access[ri].map((has, pi) => (
                  <td key={pi} style={{ padding: '7px 8px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: has ? C.green : C.grayLight,
                    }}>
                      {has ? '✓' : '–'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MiniCard>
  )
}

function TeamAssignment() {
  const teams = [
    { coach: 'M. Blaho',  role: 'Hlavný tréner', teams: ['First Team', 'U19'] },
    { coach: 'P. Horváth',role: 'Asistent',       teams: ['U17'] },
    { coach: 'J. Kováč',  role: 'Brankársky tréner', teams: ['First Team', 'U19', 'U17'] },
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12 }}>
        Pridelenie tímov
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {teams.map(t => (
          <div key={t.coach} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: C.black,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: C.cream, flexShrink: 0,
            }}>
              {t.coach.split(' ').map(w => w[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.black }}>{t.coach}</div>
              <div style={{ fontSize: 10, color: C.grayMid, fontFamily: SERIF, fontStyle: 'italic' }}>{t.role}</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {t.teams.map(team => (
                <span key={team} style={{
                  fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 3,
                  background: 'rgba(26,93,58,0.08)', color: C.green, letterSpacing: '0.06em',
                }}>
                  {team}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MiniCard>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function TreneriPage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Funkcia —"
        headline="Trénerský tím"
        subtitle="Každý tréner vidí presne to, čo má vidieť. Nič menej, nič viac."
      />

      <ContentSection
        eyebrow="— I. Role a oprávnenia"
        headline="Každá role má vlastné oprávnenia a prístupy."
        body="Hlavný tréner, asistent, kondičný tréner, brankársky tréner, mládežnícky koordinátor. Každý vidí len svojich hráčov, svoje tímy, svoje dáta."
        visual={<PermissionsMatrix />}
      />

      <ContentSection
        eyebrow="— II. Pridelenie tímov"
        headline="Tréner môže byť priradený k viacerým tímom súčasne."
        body="Hlavný tréner U17. Asistent pre U15. Brankársky tréner pre celý klub. GameModel rieši zložité hierarchie jednoducho."
        visual={<TeamAssignment />}
        flipped
        altBg
      />

      <ContentSection
        eyebrow="— III. História a výkon"
        headline="Každý tréner má svoj záznam aktivít a hodnotení."
        body="Záznam aktivít, hodnotenia od športového riaditeľa, profesionálny rozvoj. Pre vedenie klubu je viditeľné kto ako prispieva."
      />

      {/* CTA to next page */}
      <section style={{ padding: '56px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Eyebrow style={{ marginBottom: 16 }}>Ďalšia funkcia</Eyebrow>
          <Link
            to="/funkcie/hraci"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 15, fontWeight: 600, color: C.black,
              fontFamily: SERIF, textDecoration: 'none',
              borderBottom: `1px solid ${C.black}`, paddingBottom: 2,
            }}
          >
            Pozrite si Hráči <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

    </motion.div>
  )
}
