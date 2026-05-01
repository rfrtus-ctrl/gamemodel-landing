import { motion } from 'framer-motion'
import { C, SERIF, EMAIL } from '../design'

export const PLANS = [
  {
    id: 'team',
    name: 'Team',
    limit: 'Do 100 hráčov',
    price: '19',
    subtitle: 'Pre menšie kluby — 3-4 kategórie, 2-3 tímy.',
    prefix: null,
    features: [
      'Neobmedzene tímov a kategórií',
      'Neobmedzene trénerov',
      'Dochádzka, zápasy, štatistiky',
      'Mobilná aplikácia',
      'Email podpora',
    ],
    recommended: false,
    dark: false,
  },
  {
    id: 'club',
    name: 'Club',
    limit: 'Do 300 hráčov',
    price: '49',
    subtitle: 'Pre kluby s mužstvami a celou mládežou. Od U7 po seniorov.',
    prefix: 'Všetko z Team, plus:',
    features: [
      'Hodnotenia hráčov a talenty',
      'Reporty a Excel exporty',
      'Notifikácie pre rodičov',
      'Prioritná podpora (24h)',
    ],
    recommended: true,
    dark: false,
  },
  {
    id: 'academy',
    name: 'Academy',
    limit: 'Do 600 hráčov',
    price: '99',
    subtitle: 'Pre akadémie a kluby s ambíciou. A-tím + kompletná mládež.',
    prefix: 'Všetko z Club, plus:',
    features: [
      'Pokročilý scouting (externé hráčov)',
      'Prestupy a zmluvy',
      'Multi-sezónne štatistiky',
      'Telefonická podpora (4h SLA)',
    ],
    recommended: false,
    dark: true,
  },
]

export default function PricingCards() {
  return (
    <div className="pricing-grid">
      {PLANS.map((plan, i) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
        >
          {/* Recommended badge */}
          {plan.recommended && (
            <div
              style={{
                position: 'absolute', top: -13, left: 24, zIndex: 1,
                background: C.green, color: C.cream,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
                textTransform: 'uppercase',
                padding: '4px 14px', borderRadius: 4,
              }}
            >
              ★ Najobľúbenejšie
            </div>
          )}

          {/* Card body */}
          <div
            style={{
              background: plan.dark ? C.black : C.white,
              border: plan.recommended
                ? `2px solid ${C.green}`
                : `1px solid ${C.border}`,
              borderRadius: 12, padding: 32,
              flex: 1, display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Name */}
            <div
              style={{
                fontFamily: SERIF, fontWeight: 700, fontSize: 26,
                color: plan.dark ? C.cream : C.black,
                marginBottom: 6, letterSpacing: '-0.01em',
              }}
            >
              {plan.name}
            </div>

            {/* Limit */}
            <div
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: C.green, marginBottom: 20,
              }}
            >
              {plan.limit}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: SERIF, fontSize: 40, fontWeight: 400, lineHeight: 1,
                  color: (plan.recommended || plan.dark) ? C.green : C.black,
                }}
              >
                {plan.price} €
              </span>
              <span style={{ fontSize: 11, color: plan.dark ? '#888' : C.grayMid }}>
                / mesiac
              </span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
                color: plan.dark ? '#ccc' : C.gray,
                margin: '0 0 24px', lineHeight: 1.55,
              }}
            >
              {plan.subtitle}
            </p>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: plan.dark ? 'rgba(255,255,255,0.1)' : C.border,
                marginBottom: 18,
              }}
            />

            {/* Features prefix */}
            {plan.prefix && (
              <div
                style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: plan.dark ? '#888' : C.grayMid,
                  marginBottom: 12,
                }}
              >
                {plan.prefix}
              </div>
            )}

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span
                    style={{
                      color: C.green, fontWeight: 700, fontSize: 13,
                      lineHeight: 1.5, flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 13, lineHeight: 1.5,
                      color: plan.dark ? '#e0e0e0' : C.gray,
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Záujem o plán ${plan.name} — GameModel`)}`}
              style={{
                display: 'block', textAlign: 'center', marginTop: 28,
                background: plan.recommended
                  ? C.green
                  : plan.dark ? C.cream : C.black,
                color: plan.recommended
                  ? C.cream
                  : plan.dark ? C.black : C.cream,
                padding: '12px 20px', borderRadius: 3,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Vybrať {plan.name}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
