import { useEffect, useRef } from 'react'
import ambientTrack from '../assets/audio/matvii-ambient.mp3'

const AmbientAudio = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5
    audio.loop = true
    audio.muted = false

    const handleInteraction = async () => {
      try {
        await audio.play()
        document.removeEventListener('click', handleInteraction)
        document.removeEventListener('keydown', handleInteraction)
        document.removeEventListener('touchstart', handleInteraction)
        document.removeEventListener('mousemove', handleInteraction)
      } catch (err) {
        // Audio playback requires user interaction - this is expected
      }
    }

    // Try autoplay silently (will fail without user interaction, which is expected)
    audio.play().catch(() => {
      // Expected to fail without user interaction - wait for user interaction
    })

    // Wait for user interaction to play audio
    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('keydown', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })
    document.addEventListener('mousemove', handleInteraction, { once: true })

    return () => {
      audio.pause()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('mousemove', handleInteraction)
    }
  }, [])

  return <audio ref={audioRef} src={ambientTrack} preload="auto" loop aria-hidden="true" />
}

export default AmbientAudio
