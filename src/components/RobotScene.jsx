import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const RobotScene = ({ className = '', layoutId }) => {
  const wrapperRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 40, damping: 25 })
  const rotateY = useSpring(0, { stiffness: 40, damping: 25 })
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const hasArea = rect.width > 0 && rect.height > 0
      if (hasArea) {
        setCanRender(true)
      }
    }

    measure()

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measure) : null
    if (resizeObserver) {
      resizeObserver.observe(el)
    }

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      mouseX.set(deltaX)
      mouseY.set(deltaY)
      rotateY.set(deltaX * 12)
      rotateX.set(-deltaY * 10)
      el.style.setProperty('--mx', `${deltaX * 80}px`)
      el.style.setProperty('--my', `${deltaY * 80}px`)
    }

    const handlePointerLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
      mouseX.set(0)
      mouseY.set(0)
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }

    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [rotateX, rotateY, mouseX, mouseY])

  return (
    <motion.div
      ref={wrapperRef}
      className={`robot-wrapper robot-floating ${className}`}
      layoutId={layoutId}
      style={{
        rotateX,
        rotateY,
        perspective: 1800,
      }}
    >
      <div className="robot-interact-layer" aria-hidden />
      <div className="robot-glow-follow" aria-hidden />
      <div className="robot-spline">
        {canRender ? <Spline scene="https://prod.spline.design/qYXCINioNq25WH2N/scene.splinecode" /> : null}
      </div>
    </motion.div>
  )
}

export default RobotScene
