import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import AnimatedCursor from 'react-animated-cursor'

import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import AchievementsSection from './components/AchievementsSection'
import WishesSection from './components/WishesSection'
import OutroSection from './components/OutroSection'
import AmbientAudio from './components/AmbientAudio'
import Preloader from './components/Preloader'
import ConfettiCanvas from './components/ConfettiCanvas'
import ScrollProgressBar from './components/decor/ScrollProgressBar'
import SectionParticles from './components/decor/SectionParticles'
import useMediaTimeline from './hooks/useMediaTimeline'
import usePreloadMedia from './hooks/usePreloadMedia'

function App() {
  const mediaItems = useMediaTimeline()
  const { isLoaded, progress } = usePreloadMedia(mediaItems)
  const confettiRef = useRef(null)

  useEffect(() => {
    if (isLoaded && confettiRef.current) {
      confettiRef.current.shoot()
    }
  }, [isLoaded])

  return (
    <div className="app-shell">
      <SectionParticles variant="hero" className="global-background" />

      <AnimatedCursor
        innerSize={8}
        outerSize={40}
        color="255,255,255"
        outerAlpha={0.25}
        innerScale={1}
        outerScale={2}
        trailingSpeed={6}
        clickables={['a', 'button', '.cta-button', '.timeline-item', '.achievement-card', '.outro-button']}
      />

      <ScrollProgressBar />
      <AmbientAudio />
      <ConfettiCanvas ref={confettiRef} />

      {/* Лоадер тепер з красивим exit-анімом */}
      <AnimatePresence>
        {!isLoaded && <Preloader progress={progress} />}
      </AnimatePresence>

      <HeroSection isLoaded={isLoaded} />
      <TimelineSection mediaItems={mediaItems} isLoaded={isLoaded} />
      <AchievementsSection isLoaded={isLoaded} />
      <WishesSection isLoaded={isLoaded} />
      <OutroSection isLoaded={isLoaded} />
    </div>
  )
}

export default App
