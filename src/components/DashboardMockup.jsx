import { ChevronRight } from 'lucide-react'
import { C, SERIF } from '../design'
import { DiamondLogo, GameModelWordmark } from './Primitives'

const SIDEBAR_MAIN = [
  { emoji: '🏠', label: 'Prehľad',  active: true  },
  { emoji: '👥', label: 'Hráči',    active: false },
  { emoji: '⚽', label: 'Tímy',     active: false },
  { emoji: '🏋️', label: 'Tréningy', active: false },
  { emoji: '🧑‍💼', label: 'Staff',    active: false },
  { emoji: '⭐', label: 'Talenty',   active: false },
]

const SIDEBAR_MGMT = [
  { emoji: '📋', label: 'Dochádzka', active: false },
  { emoji: '📅', label: 'Kalendár',  active: false },
]

const STATS = [
  { label: 'Hráčov', value: '35', green: false },
  { label: 'Dochádzka', value: '87%', green: true  },
  { label: 'Tímov',  value: '14', green: false },
]

const MATCHES = [
  { home: 'FK Slovan Levice', away: 'Inter Bratislava',     score: '0:1', meta: '20. apr · 4-3-3', win: false },
  { home: 'AS Trenčín',       away: 'ŠK Slovan Bratislava', score: '0:2', meta: '19. apr · 4-4-2', win: false },
  { home: 'Prievidza',        away: 'Senec',                score: '3:1', meta: '18. apr · 3-5-2', win: true  },
]

const LANG_PILLS = ['SK', 'EN', 'ES']

export default function DashboardMockup() {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.09)',
        overflow: 'hidden',
        fontSize: 12,
        userSelect: 'none',
        lineHeight: 1.4,
        boxShadow: [
          '0 1px 3px rgba(0,0,0,0.03)',
          '0 8px 24px rgba(0,0,0,0.05)',
          '0 24px 64px rgba(0,0,0,0.08)',
        ].join(', '),
      }}
    >

      {/* ── TOP BAR ── */}
      <div
        style={{
          background: C.white, borderBottom: `1px solid ${C.border}`,
          padding: '0 16px', height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <DiamondLogo size={20} />
          <GameModelWordmark size={14} />
          <div style={{ width: 1, height: 16, background: C.border, margin: '0 4px' }} />
          <span style={{ color: C.grayLight, fontSize: 11, fontFamily: SERIF, fontStyle: 'italic' }}>
            Sezóna 2025/26
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language pills */}
          <div style={{ display: 'flex', gap: 4 }}>
            {LANG_PILLS.map((lang, i) => (
              <span
                key={lang}
                style={{
                  padding: '3px 7px', borderRadius: 3, fontSize: 9,
                  fontWeight: 700, letterSpacing: '0.08em',
                  background: i === 0 ? C.green : 'transparent',
                  color: i === 0 ? C.cream : C.grayLight,
                  border: i === 0 ? 'none' : `1px solid ${C.border}`,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
          {/* Avatar */}
          <div
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: C.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: C.cream,
              border: `2px solid rgba(26,93,58,0.2)`,
            }}
          >
            RF
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', minHeight: 340 }}>

        {/* Sidebar */}
        <div
          style={{
            width: 196, flexShrink: 0,
            background: C.card,
            borderRight: `1px solid ${C.border}`,
            paddingTop: 14, paddingBottom: 14,
          }}
        >
          {/* Main nav */}
          {SIDEBAR_MAIN.map(item => (
            <div
              key={item.label}
              style={{
                padding: '8px 16px',
                display: 'flex', alignItems: 'center', gap: 9,
                background: item.active ? C.green : 'transparent',
                borderRadius: item.active ? '0 6px 6px 0' : 0,
                marginRight: item.active ? 8 : 0,
                color: item.active ? C.cream : C.grayMid,
                fontWeight: item.active ? 600 : 400,
                cursor: 'default', fontSize: 11,
                marginBottom: item.active ? 0 : 0,
              }}
            >
              <span style={{ fontSize: 12 }}>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}

          {/* Separator */}
          <div style={{ height: 1, background: C.border, margin: '10px 12px' }} />

          {/* Manažment eyebrow */}
          <div
            style={{
              padding: '4px 16px 6px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.grayMid,
            }}
          >
            Manažment
          </div>

          {SIDEBAR_MGMT.map(item => (
            <div
              key={item.label}
              style={{
                padding: '8px 16px',
                display: 'flex', alignItems: 'center', gap: 9,
                color: C.grayMid, cursor: 'default', fontSize: 11,
              }}
            >
              <span style={{ fontSize: 12 }}>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '18px 20px', background: C.white, overflowX: 'hidden' }}>

          {/* Header */}
          <div
            style={{
              display: 'flex', alignItems: 'flex-start',
              justifyContent: 'space-between', marginBottom: 18,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: C.grayMid, marginBottom: 4,
                }}
              >
                — Prehľad
              </div>
              <div
                style={{
                  color: C.black, fontSize: 20, fontWeight: 400,
                  fontFamily: SERIF, fontStyle: 'italic',
                }}
              >
                Dobré ráno, admin.
              </div>
            </div>
            <div
              style={{
                padding: '3px 9px',
                border: `1px solid ${C.green}`,
                color: C.green, fontSize: 9, fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                borderRadius: 2,
              }}
            >
              Aktívny
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
            {STATS.map(s => (
              <div
                key={s.label}
                style={{
                  flex: 1, background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: '11px 14px',
                }}
              >
                <div
                  style={{
                    color: C.grayMid, fontSize: 10, marginBottom: 5,
                    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 28, fontWeight: 400, lineHeight: 1,
                    fontFamily: SERIF,
                    color: s.green ? C.green : C.black,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Recent matches */}
          <div
            style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.grayMid, marginBottom: 8,
            }}
          >
            — Posledné zápasy
          </div>

          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8, overflow: 'hidden', marginBottom: 10,
            }}
          >
            {MATCHES.map((m, i) => (
              <div
                key={m.home}
                style={{
                  padding: '8px 12px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderBottom: i < MATCHES.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                {/* Outcome dot */}
                <div
                  style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: m.win ? C.green : '#888',
                  }}
                />
                {/* Teams — grows to fill space */}
                <span style={{ flex: 1, color: C.black, fontSize: 11, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <strong style={{ fontWeight: 600 }}>{m.home}</strong>
                  <span style={{ color: C.grayMid }}>{' — '}</span>
                  <span style={{ fontWeight: 400 }}>{m.away}</span>
                </span>
                {/* Score — fixed width, vertically aligned */}
                <span style={{
                  width: 34, textAlign: 'right', flexShrink: 0,
                  fontSize: 11, fontWeight: 700,
                  color: m.win ? C.green : C.black,
                }}>
                  {m.score}
                </span>
                {/* Date · formation */}
                <span
                  style={{
                    color: C.grayMid, fontSize: 10, flexShrink: 0,
                    fontFamily: SERIF, fontStyle: 'italic',
                  }}
                >
                  {m.meta}
                </span>
                <ChevronRight size={10} color={C.grayLight} strokeWidth={1.5} />
              </div>
            ))}
          </div>

          {/* All matches link */}
          <div
            style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: C.green, cursor: 'pointer',
            }}
          >
            Všetky zápasy →
          </div>

        </div>
      </div>
    </div>
  )
}
