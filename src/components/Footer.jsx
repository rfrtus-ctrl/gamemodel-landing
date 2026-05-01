import { Mail } from 'lucide-react'
import { C, SERIF, EMAIL } from '../design'
import { DiamondLogo, GameModelWordmark, LiveDot } from './Primitives'

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}` }}>

      {/* Main row */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 36px' }}>
        <div className="footer-main">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <DiamondLogo size={26} />
              <GameModelWordmark size={18} />
            </div>
            <p
              style={{
                fontSize: 12, color: C.grayMid,
                fontFamily: SERIF, fontStyle: 'italic',
                lineHeight: 1.6, margin: 0,
              }}
            >
              Tréneri, hráči, dochádzka, zápasy. Jednoducho.
            </p>
          </div>

          {/* Launch status */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 7, marginBottom: 7,
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
  )
}
