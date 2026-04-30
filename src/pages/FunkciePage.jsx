import { motion } from 'framer-motion'
import {
  Users, User, Shield, ClipboardCheck, Trophy, Star,
  Calendar, FileText, Bell, Folder, MessageSquare, Globe,
  Settings, BarChart2, BellRing,
} from 'lucide-react'
import { C, SERIF, pageTransition, fadeUp } from '../design'
import { PageHero, Eyebrow, FunkcieCard } from '../components/Primitives'

const MAIN_CARDS = [
  {
    icon: Users,
    title: 'Trénerský tím',
    desc:  'Manažment trénerov, role a oprávnenia. Hlavný tréner, asistenti, kondiční, brankárski.',
    to:    '/funkcie/treneri',
  },
  {
    icon: User,
    title: 'Hráči',
    desc:  'Evidencia hráčov, štatistiky, hodnotenia, zdravotné záznamy. Kompletný profil.',
    to:    '/funkcie/hraci',
  },
  {
    icon: Shield,
    title: 'Tímy',
    desc:  'Organizácia kategórií od U7 po prvý tím. WU19, U17, U15, U13, U11. Mužské + ženské.',
    noLink: true,
  },
  {
    icon: ClipboardCheck,
    title: 'Dochádzka',
    desc:  'Mobilné zaznamenávanie, reporty, trendy. Tréningy aj zápasy oddelene.',
    to:    '/funkcie/dochadzka',
  },
  {
    icon: Trophy,
    title: 'Zápasy',
    desc:  'Plánovanie, zostavy, výsledky, hodnotenia. Automatické notifikácie.',
    to:    '/funkcie/zapasy',
  },
  {
    icon: Star,
    title: 'Talenty + Scouting',
    desc:  'Identifikácia talentov, sledovanie konkurencie, transfery a prestupy.',
    noLink: true,
  },
]

const EXTRA = [
  { icon: Calendar,     label: 'Kalendár',          desc: 'Tréningy, zápasy, klubové eventy' },
  { icon: FileText,     label: 'Poznámky',           desc: 'Súkromné poznámky pre trénerov' },
  { icon: Bell,         label: 'Oznámenia',          desc: 'Klubová komunikácia' },
  { icon: Folder,       label: 'Dokumenty',          desc: 'Centralizované úložisko' },
  { icon: MessageSquare,label: 'Požiadavky',         desc: 'Žiadosti od hráčov a rodičov' },
  { icon: Globe,        label: 'Viacjazyčnosť',      desc: 'SK / EN / ES' },
  { icon: Settings,     label: 'Role a oprávnenia',  desc: 'Granular access control' },
  { icon: BarChart2,    label: 'Reporty',            desc: 'Export do Excelu, PDF' },
  { icon: BellRing,     label: 'Notifikácie',        desc: 'Email + push notifications' },
]

export default function FunkciePage() {
  return (
    <motion.div {...pageTransition}>

      <PageHero
        eyebrow="— Funkcionalita —"
        headline="Všetko čo futbalový klub potrebuje. Nič navyše."
        subtitle="Jeden systém namiesto piatich Excelových tabuliek a desiatich WhatsApp skupín."
      />

      {/* MAIN GRID */}
      <section style={{ padding: '72px 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {MAIN_CARDS.map((card, i) => (
              <FunkcieCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DOPLNKOVÉ FUNKCIE */}
      <section style={{ padding: '72px 0', borderTop: `1px solid ${C.border}`, background: C.card }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <Eyebrow style={{ marginBottom: 14 }}>— Doplnkové funkcie</Eyebrow>
            <p
              style={{
                fontSize: 16, color: C.gray, fontFamily: SERIF, fontStyle: 'italic',
                margin: 0, maxWidth: 440,
              }}
            >
              Nástroje ktoré dopĺňajú každodenný chod klubu
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            {EXTRA.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: C.white, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: '16px 18px',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: `1px solid ${C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}
                  >
                    <Icon size={12} color={C.grayMid} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.black, marginBottom: 3, letterSpacing: '0.04em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

    </motion.div>
  )
}
