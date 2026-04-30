import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { C, SERIF, pageTransition } from '../design'
import { PageHero, ContentSection, MiniCard, Eyebrow } from '../components/Primitives'

// ── Visual fragments ───────────────────────────────────────────────────────────

function PlayerProfile() {
  return (
    <MiniCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', background: C.black,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: C.cream,
        }}>MB</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.black }}>Marek Blaho</div>
          <div style={{ fontSize: 10, color: C.grayMid, fontFamily: SERIF, fontStyle: 'italic' }}>
            First Team · Stredopoliar
          </div>
          <div style={{ fontSize: 9, color: C.grayLight, marginTop: 2 }}>
            Nar. 12. 3. 2001 · 182 cm · 76 kg
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        {[{ l: 'Góly', v: '7' }, { l: 'Asistencie', v: '5' }, { l: 'Zápasy', v: '14' }, { l: 'Minutáž', v: '1 240' }].map(s => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 400, fontFamily: SERIF, color: C.black, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 8, color: C.grayLight, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: i <= 4 ? C.green : C.grayLight, fontSize: 12 }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: 9, color: C.grayLight, fontFamily: SERIF, fontStyle: 'italic' }}>
          Hodnotenie — sezóna 25/26
        </span>
      </div>
    </MiniCard>
  )
}

function SeasonStats() {
  const months = ['Sep', 'Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  const goals   = [1, 2, 0, 1, 2, 1, 3, 2]
  const max     = Math.max(...goals)
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12 }}>
        Góly sezóna 25/26
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
        {months.map((m, i) => (
          <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div
              style={{
                width: '100%', borderRadius: 3,
                background: goals[i] > 0 ? C.green : C.border,
                opacity: goals[i] > 0 ? 0.7 + (goals[i] / max) * 0.3 : 1,
                height: goals[i] > 0 ? `${(goals[i] / max) * 48}px` : '4px',
                minHeight: 4, transition: 'height 0.3s',
              }}
            />
            <span style={{ fontSize: 7, color: C.grayLight, letterSpacing: '0.05em' }}>{m}</span>
          </div>
        ))}
      </div>
    </MiniCard>
  )
}

function RatingsCard() {
  const ratings = [
    { match: 'vs Šaľa', score: 5, date: '20. apr' },
    { match: '@ Horné Saliby', score: 3, date: '19. apr' },
    { match: 'vs Partizánske', score: 4, date: '18. apr' },
  ]
  return (
    <MiniCard>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.grayLight, marginBottom: 12 }}>
        Hodnotenia — M. Blaho
      </div>
      {ratings.map((r, i) => (
        <div key={r.match} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 0',
          borderBottom: i < ratings.length - 1 ? `1px solid ${C.border}` : 'none',
        }}>
          <div>
            <div style={{ fontSize: 11, color: C.black, fontWeight: 500 }}>{r.match}</div>
            <div style={{ fontSize: 9, color: C.grayLight, fontFamily: SERIF, fontStyle: 'italic' }}>{r.date}</div>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(j => (
              <span key={j} style={{ fontSize: 10, color: j <= r.score ? C.green : C.grayLight }}>★</span>
            ))}
          </div>
        </div>
      ))}
    </MiniCard>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HraciPage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Funkcia —"
        headline="Hráči"
        subtitle="Kompletný profil každého hráča. Od zdravotných záznamov po posledný zápas."
      />

      <ContentSection
        eyebrow="— I. Profil"
        headline="Každý hráč má kompletný profil."
        body="Osobné údaje, kontakt, rodičia, zdravotná dokumentácia. Všetko zabezpečené, prístupné len oprávneným osobám."
        visual={<PlayerProfile />}
      />

      <ContentSection
        eyebrow="— II. Štatistiky"
        headline="Góly, asistencie, karty, minutáž — automaticky."
        body="Po každom zápase sa štatistiky aktualizujú. Vidíte progres hráča za sezónu, kariéru, alebo kategóriu."
        visual={<SeasonStats />}
        flipped
        altBg
      />

      <ContentSection
        eyebrow="— III. Hodnotenia"
        headline="Hodnotenie po každom zápase od trénera."
        body="1–5 hviezd po každom zápase. Sledujte výkonnostné trendy hráčov za celú sezónu."
        visual={<RatingsCard />}
      />

      <ContentSection
        eyebrow="— IV. Kariéra"
        headline="História prestupov, zmluvy, dokumenty."
        body="Ak sa hráč prevedie do iného klubu alebo prebehne predzmluva — všetko je zaznamenané."
        altBg
      />

      {/* CTA */}
      <section style={{ padding: '56px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Eyebrow style={{ marginBottom: 16 }}>Ďalšia funkcia</Eyebrow>
          <Link
            to="/funkcie/dochadzka"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 15, fontWeight: 600, color: C.black,
              fontFamily: SERIF, textDecoration: 'none',
              borderBottom: `1px solid ${C.black}`, paddingBottom: 2,
            }}
          >
            Pozrite si Dochádzku <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

    </motion.div>
  )
}
