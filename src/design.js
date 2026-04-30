// ── GameModel Design Tokens ────────────────────────────────────────────────────

export const C = {
  bg:        '#f5f3ed',
  card:      '#fafaf7',
  white:     '#ffffff',
  black:     '#1a1a1a',
  gray:      '#525252',
  grayMid:   '#8a8a8a',
  grayLight: '#b8b8b8',
  green:     '#1a5d3a',
  cream:     '#f5f3ed',
  border:    'rgba(26,26,26,0.08)',
  borderSt:  'rgba(26,26,26,0.15)',
}

export const SERIF = "'Lora', Georgia, serif"
export const EMAIL = 'info@gamemodel.sk'
export const DEMO_SUBJ = encodeURIComponent('Demo request — GameModel')

// ── Framer Motion variants ─────────────────────────────────────────────────────

export const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

export const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}
