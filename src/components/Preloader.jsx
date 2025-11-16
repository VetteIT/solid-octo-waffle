import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { DNA } from 'react-loader-spinner'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const Preloader = ({ progress = 0 }) => {
  const [smoothProgress, setSmoothProgress] = useState(0)
  const smoothRef = useRef(0)

  useEffect(() => {
    const target = clamp(progress, 0, 100)
    const from = smoothRef.current

    if (target <= from) return

    const controls = animate(from, target, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        smoothRef.current = latest
        setSmoothProgress(latest)
      },
    })

    return () => {
      controls.stop()
    }
  }, [progress])

  const displayPercent = Math.round(smoothProgress)
  const isFinished = smoothProgress >= 99.5

  return (
    <motion.div
      className="preloader-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinished ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isFinished ? 'none' : 'auto' }}
    >
      <div className="preloader-inner">
        <div className="preloader-glow" aria-hidden="true" />

        <motion.div
          className="preloader-core"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="preloader-dna-wrapper">
            <DNA
              visible
              height={150}
              width={150}
              ariaLabel="matvii-birthday-loader"
            />
          </div>

          <div className="preloader-text">
            <span className="preloader-label">
              Готуємо сюрприз: завантажуємо спогади та відео…
            </span>
            <span className="preloader-percent">{displayPercent}%</span>
          </div>

          <div className="preloader-bar">
            <motion.div
              className="preloader-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${smoothProgress}%` }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Preloader
