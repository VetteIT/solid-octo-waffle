import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.8 })
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.8 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [x, y])

  return (
    <motion.div
      className="cursor-glow"
      style={{ translateX: springX, translateY: springY }}
      aria-hidden="true"
    />
  )
}

export default CursorGlow

