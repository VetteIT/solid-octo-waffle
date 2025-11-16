import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [cursorState, setCursorState] = useState('default') // default, hover, text, video
  const [cursorText, setCursorText] = useState('')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // велике кільце — з легкою інерцією, крапка — точно під реальним курсором
  const cursorX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.6 })
  const cursorY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.6 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => {
      setCursorState((prev) => `${prev}-clicking`)
    }

    const handleMouseUp = () => {
      setCursorState((prev) => prev.replace('-clicking', ''))
    }

    // Interactive elements handlers
    const handleHoverButton = (e) => {
      setCursorState('hover')
      const text = e.target.getAttribute('data-cursor-text')
      if (text) setCursorText(text)
    }

    const handleHoverText = () => {
      setCursorState('text')
    }

    const handleHoverVideo = () => {
      setCursorState('video')
      setCursorText('▶')
    }

    const handleHoverLink = (e) => {
      setCursorState('hover')
      setCursorText('↗')
    }

    const handleLeave = () => {
      setCursorState('default')
      setCursorText('')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Query all interactive elements
    const updateListeners = () => {
      document.querySelectorAll('a, .cta-button, .outro-button, .hero-pill').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverLink)
        el.addEventListener('mouseleave', handleLeave)
      })

      document.querySelectorAll('button:not(.cta-button):not(.outro-button)').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverButton)
        el.addEventListener('mouseleave', handleLeave)
      })

      document.querySelectorAll('.timeline-item, .memory-card').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverButton)
        el.addEventListener('mouseleave', handleLeave)
      })

      document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, .timeline-desc').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverText)
        el.addEventListener('mouseleave', handleLeave)
      })

      document.querySelectorAll('video, .video-player').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverVideo)
        el.addEventListener('mouseleave', handleLeave)
      })
    }

    // Initial setup
    updateListeners()

    // Re-attach listeners on DOM changes
    const observer = new MutationObserver(updateListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      observer.disconnect()
    }
  }, [mouseX, mouseY])

  const getCursorScale = () => {
    if (cursorState.includes('clicking')) return 0.7
    if (cursorState === 'hover') return 1.8
    if (cursorState === 'text') return 0.5
    if (cursorState === 'video') return 2
    return 1
  }

  const getDotScale = () => {
    if (cursorState.includes('clicking')) return 0.5
    if (cursorState === 'hover' || cursorState === 'video') return 0
    if (cursorState === 'text') return 1.2
    return 1
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`custom-cursor ${cursorState}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: getCursorScale(),
          opacity: cursorState === 'text' ? 0.3 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </motion.div>
      <motion.div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: getDotScale(),
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </>
  )
}

export default CustomCursor
