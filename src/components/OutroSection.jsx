import { useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import SectionHeader from './common/SectionHeader'

const OutroSection = ({ isLoaded = false }) => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.3, once: false })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useSpring(0, { stiffness: 50, damping: 25 })
  const glowY = useSpring(0, { stiffness: 50, damping: 25 })
  const glowIntensity = useSpring(0, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      mouseX.set(deltaX)
      mouseY.set(deltaY)
      glowX.set(deltaX * 40)
      glowY.set(deltaY * 40)
    }

    const handleMouseEnter = () => {
      glowIntensity.set(1)
    }

    const handleMouseLeave = () => {
      glowIntensity.set(0)
      glowX.set(0)
      glowY.set(0)
      mouseX.set(0)
      mouseY.set(0)
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [glowX, glowY, glowIntensity, mouseX, mouseY])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 1])
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -50])
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1])

  const replayJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.section
      id="outro"
      ref={sectionRef}
      className="outro-section"
      style={{ 
        opacity: isLoaded ? sectionOpacity : 0,
        y: sectionY, 
        scale: sectionScale 
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 150, scale: 0.8, filter: 'blur(25px)' }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 150, scale: 0.8, filter: 'blur(25px)' }}
        exit={{
          opacity: 0,
          y: -50,
          scale: 0.95,
          filter: 'blur(4px)',
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeader
          eyebrow="Фінальний акорд"
          title="Дякую, що ти є, Матвій"
          description="Нехай цей рік стане продовженням історії, де головний герой завжди знає, що його люблять, підтримують і надихають творити нові світи."
          align="center"
          isLoaded={isLoaded}
        />
      </motion.div>
      <motion.div
        className="outro-grid"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.div
          ref={cardRef}
          className="outro-card"
          initial={{ opacity: 0, y: 200, x: -150, rotate: -25, scale: 0.3, filter: 'blur(30px)' }}
          animate={isLoaded ? undefined : { opacity: 0, y: 200, x: -150, rotate: -25, scale: 0.3, filter: 'blur(30px)' }}
          whileInView={isLoaded ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' } : undefined}
          viewport={{ once: false, amount: 0.4, margin: '200px 0px 100px 0px' }}
          exit={{
            opacity: 0,
            y: -50,
            x: -40,
            rotate: -5,
            scale: 0.9,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          whileHover={{ y: -6, rotateY: 3, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="outro-card-glow"
            style={{
              x: glowX,
              y: glowY,
              opacity: glowIntensity,
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? undefined : { opacity: 0, y: 40 }}
            whileInView={isLoaded ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            Завжди повертайся до цих спогадів, коли потрібно нагадати серцю: ти вже створив диво.
          </motion.p>
          <motion.button
            className="outro-button"
            onClick={replayJourney}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? undefined : { opacity: 0, y: 20 }}
            whileInView={isLoaded ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            exit={{
              opacity: 0,
              y: 10,
              transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              delay: 0.6, 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            Подивитись усе ще раз
          </motion.button>
        </motion.div>
        <motion.div
          className="outro-celebration"
          initial={{ opacity: 0, scale: 0.1, rotate: 200, y: 200, x: 150, filter: 'blur(35px)' }}
          animate={isLoaded ? undefined : { opacity: 0, scale: 0.1, rotate: 200, y: 200, x: 150, filter: 'blur(35px)' }}
          whileInView={isLoaded ? { opacity: 1, scale: 1, rotate: 0, y: 0, x: 0, filter: 'blur(0px)' } : undefined}
          viewport={{ once: false, amount: 0.4, margin: '200px 0px 100px 0px' }}
          exit={{
            opacity: 0,
            scale: 0.85,
            rotate: -30,
            y: -50,
            x: -40,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          whileHover={{ scale: 1.02, rotateY: -2, y: -3 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="celebration-ring"
            initial={{ scale: 0, rotate: -360 }}
            animate={isLoaded ? { rotate: 360 } : { scale: 0, rotate: -360 }}
            whileInView={isLoaded ? { scale: 1, rotate: 0 } : undefined}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            exit={{
              scale: 0.6,
              rotate: 180,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
          />
          <motion.div
            className="celebration-ring delay"
            initial={{ scale: 0, rotate: 360 }}
            animate={isLoaded ? { rotate: -360 } : { scale: 0, rotate: 360 }}
            whileInView={isLoaded ? { scale: 1, rotate: 0 } : undefined}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            exit={{
              scale: 0.6,
              rotate: -180,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' } }}
          />
          <motion.div
            className="celebration-core"
            initial={{ opacity: 0, scale: 0.2, rotateY: -90 }}
            animate={isLoaded ? undefined : { opacity: 0, scale: 0.2, rotateY: -90 }}
            whileInView={isLoaded ? { opacity: 1, scale: 1, rotateY: 0 } : undefined}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            exit={{
              opacity: 0,
              scale: 0.7,
              rotateY: 45,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: -40, rotate: -12 }}
              animate={isLoaded ? undefined : { opacity: 0, y: -40, rotate: -12 }}
              whileInView={isLoaded ? { opacity: 1, y: 0, rotate: 0 } : undefined}
              viewport={{ once: false, amount: 0.2, margin: '50px 0px' }}
              exit={{
                opacity: 0,
                y: -20,
                rotate: 6,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 0.7, duration: 0.9 }}
            >
              Made by
            </motion.span>
            <motion.strong
              initial={{ opacity: 0, scale: 0, rotate: -360 }}
              animate={isLoaded ? undefined : { opacity: 0, scale: 0, rotate: -360 }}
              whileInView={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              viewport={{ once: false, amount: 0.2, margin: '50px 0px' }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotate: 90,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
            >
              Mykyta Olym
            </motion.strong>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default OutroSection
