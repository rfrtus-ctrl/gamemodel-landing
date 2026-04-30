import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { C, SERIF, EMAIL, DEMO_SUBJ } from '../design'
import { GMLogo } from './Primitives'

const FUNKIE_ITEMS = [
  { label: 'Trénerský tím', to: '/funkcie/treneri' },
  { label: 'Hráči',         to: '/funkcie/hraci'   },
  { label: 'Dochádzka',     to: '/funkcie/dochadzka' },
  { label: 'Zápasy',        to: '/funkcie/zapasy'  },
]

const NAV_LINKS = [
  { label: 'Filozofia', to: '/filozofia' },
  { label: 'Funkcie',   to: '/funkcie',  dropdown: true },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [dropdown,     setDropdown]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [mobileFunkcie,setMobileFunkcie]= useState(false)
  const location  = useLocation()
  const dropRef   = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdown(false)
    setMobileFunkcie(false)
  }, [location.pathname])

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 64,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: scrolled ? 'rgba(245,243,237,0.93)' : 'transparent',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <nav
          style={{
            maxWidth: 1120, margin: '0 auto',
            padding: '0 36px', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          {/* Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <GMLogo size={26} />
            <span
              style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontFamily: SERIF, color: C.black,
              }}
            >
              Gamemodel
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: 28 }}
          >
            {NAV_LINKS.map(link =>
              link.dropdown ? (
                // Funkcie with dropdown
                <div
                  key={link.label}
                  ref={dropRef}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link
                    to={link.to}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                      textTransform: 'uppercase', textDecoration: 'none',
                      color: isActive('/funkcie') ? C.green : C.grayMid,
                      transition: 'color 0.25s',
                    }}
                    onMouseEnter={e => { if (!isActive('/funkcie')) e.currentTarget.style.color = C.black }}
                    onMouseLeave={e => { if (!isActive('/funkcie')) e.currentTarget.style.color = C.grayMid }}
                  >
                    {link.label}
                    <ChevronDown
                      size={11} strokeWidth={2}
                      style={{
                        transition: 'transform 0.2s',
                        transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </Link>

                  {/* Dropdown */}
                  {dropdown && (
                    <div
                      style={{
                        position: 'absolute', top: '100%', left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: 8, minWidth: 180,
                        background: C.white,
                        border: `1px solid rgba(0,0,0,0.08)`,
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
                        padding: '6px',
                        zIndex: 200,
                      }}
                    >
                      {FUNKIE_ITEMS.map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          style={{
                            display: 'block',
                            padding: '10px 14px',
                            borderRadius: 5,
                            fontSize: 12, fontWeight: 500,
                            color: location.pathname === item.to ? C.green : C.black,
                            textDecoration: 'none',
                            background: location.pathname === item.to ? 'rgba(26,93,58,0.06)' : 'transparent',
                            transition: 'background 0.15s, color 0.15s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = C.card
                            e.currentTarget.style.color      = C.green
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = location.pathname === item.to ? 'rgba(26,93,58,0.06)' : 'transparent'
                            e.currentTarget.style.color      = location.pathname === item.to ? C.green : C.black
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    color: isActive(link.to) ? C.green : C.grayMid,
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => { if (!isActive(link.to)) e.currentTarget.style.color = C.black }}
                  onMouseLeave={e => { if (!isActive(link.to)) e.currentTarget.style.color = C.grayMid }}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Kontakt — green underline */}
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: C.green,
                borderBottom: `1px solid ${C.green}`, paddingBottom: 1,
                textDecoration: 'none', transition: 'opacity 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Kontakt
            </a>

            {/* Demo button */}
            <a
              href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
              style={{
                background: C.black, color: C.cream,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '8px 16px', borderRadius: 2,
                textDecoration: 'none',
                transition: 'opacity 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.84'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)' }}
            >
              Demo
            </a>
          </div>

          {/* Mobile: burger + demo */}
          <div className="flex md:hidden items-center" style={{ gap: 12 }}>
            <a
              href={`mailto:${EMAIL}?subject=${DEMO_SUBJ}`}
              style={{
                background: C.black, color: C.cream,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', padding: '7px 12px', borderRadius: 2,
                textDecoration: 'none',
              }}
            >
              Demo
            </a>
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, color: C.black, display: 'flex',
              }}
              aria-label="Otvoriť menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
            background: C.white, borderBottom: `1px solid ${C.border}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            padding: '12px 0 20px',
          }}
        >
          <Link to="/filozofia" style={mobileLink}>Filozofia</Link>
          <div>
            <button
              onClick={() => setMobileFunkcie(o => !o)}
              style={{
                ...mobileLink, width: '100%', textAlign: 'left', background: 'none',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <span>Funkcie</span>
              <ChevronDown
                size={12} strokeWidth={2}
                style={{ transform: mobileFunkcie ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </button>
            {mobileFunkcie && (
              <div style={{ background: C.card }}>
                {FUNKIE_ITEMS.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{ ...mobileLink, paddingLeft: 32, fontSize: 12, color: C.gray }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a href={`mailto:${EMAIL}`} style={mobileLink}>Kontakt</a>
        </div>
      )}
    </>
  )
}

const mobileLink = {
  display: 'block', padding: '12px 24px',
  fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: C.black,
  textDecoration: 'none', transition: 'color 0.15s',
}
