import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage      from './pages/HomePage'
import FilozofiaPage from './pages/FilozofiaPage'
import FunkciePage   from './pages/FunkciePage'
import TreneriPage   from './pages/TreneriPage'
import HraciPage     from './pages/HraciPage'
import DochadzkaPage from './pages/DochadzkaPage'
import ZapasyPage    from './pages/ZapasyPage'
import ClenstvoPage  from './pages/ClenstvoPage'
import { C } from './design'

// AnimatePresence needs location inside BrowserRouter
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/filozofia"           element={<FilozofiaPage />} />
        <Route path="/funkcie"             element={<FunkciePage />} />
        <Route path="/funkcie/treneri"     element={<TreneriPage />} />
        <Route path="/funkcie/hraci"       element={<HraciPage />} />
        <Route path="/funkcie/dochadzka"   element={<DochadzkaPage />} />
        <Route path="/funkcie/zapasy"      element={<ZapasyPage />} />
        <Route path="/clenstvo"            element={<ClenstvoPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: C.bg, color: C.black, minHeight: '100vh' }}>
        <Navbar />
        {/* 64px top padding for fixed navbar */}
        <div style={{ paddingTop: 64 }}>
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
