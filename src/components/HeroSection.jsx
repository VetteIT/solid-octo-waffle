import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useInView, useScroll, useTransform } from 'framer-motion'
import RobotScene from './RobotScene'

const tickerItems = [
  'Перший крок',
  'Перший робот',
  'Сміливі мрії',
  'Шкільні перемоги',
  'Сміх із друзями',
  'Чарівні подорожі',
]

const MagneticButton = ({ onClick }) => {
  const buttonRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMove = (event) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * 0.2)
    y.set(offsetY * 0.2)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      className="cta-button magnetic"
      style={{ x, y }}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      Прокрутити спогади
    </motion.button>
  )
}

const HeroSection = ({ isLoaded = false }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.2, once: false })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const duplicatedTicker = useMemo(() => [...tickerItems, ...tickerItems], [])

  // Паралакс ефекти при скролі
  const heroLeftY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroLeftOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0])
  const heroLeftScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroLeftRotate = useTransform(scrollYProgress, [0, 1], [0, -20])
  const heroLeftX = useTransform(scrollYProgress, [0, 1], [0, -150])

  const heroRightY = useTransform(scrollYProgress, [0, 1], [0, 250])
  const heroRightOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0])
  const heroRightScale = useTransform(scrollYProgress, [0, 1], [1, 0.6])
  const heroRightRotate = useTransform(scrollYProgress, [0, 1], [0, 30])
  const heroRightX = useTransform(scrollYProgress, [0, 1], [0, 180])

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="hero-grid">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 150, x: -120, rotate: -25, scale: 0.6, filter: 'blur(25px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 150, x: -120, rotate: -25, scale: 0.6, filter: 'blur(25px)' }}
          exit={{
            opacity: 0,
            y: -60,
            x: -50,
            rotate: -5,
            scale: 0.9,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            y: heroLeftY,
            opacity: heroLeftOpacity,
            scale: heroLeftScale,
            rotate: heroLeftRotate,
            x: heroLeftX,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 50, x: -40, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.2, margin: '200px 0px' }}
            exit={{
              opacity: 0,
              y: -20,
              x: -25,
              rotate: -4,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Сімейна студія тепла • 2025
          </motion.span>
          <motion.h1
            className="hero-title"
            initial={{ y: 120, opacity: 0, rotateX: -50, scale: 0.5, filter: 'blur(20px)' }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2, margin: '200px 0px' }}
            exit={{
              y: -60,
              opacity: 0,
              rotateX: 15,
              scale: 0.85,
              filter: 'blur(10px)',
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Матвій, з Днем народження!
          </motion.h1>
          <motion.p
            className="hero-subtext"
            initial={{ y: 80, opacity: 0, x: -50, rotate: -5, filter: 'blur(15px)' }}
            whileInView={{ y: 0, opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2, margin: '200px 0px' }}
            exit={{
              y: -40,
              opacity: 0,
              x: -30,
              rotate: -2,
              filter: 'blur(8px)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            День, коли робот-друг спостерігає за кожним порухом, оберігає світло і підказує:
            мрії вже здійснюються. Зазирни у студію спогадів, щоб заново прожити моменти, де
            ти сміявся, перемагав і вигадував нові всесвіти.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 60, scale: 0.7, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.2, margin: '150px 0px' }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.9,
              rotate: -4,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton onClick={scrollToTimeline} />
            <motion.div
              className="hero-pill"
              initial={{ opacity: 0, x: 40, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              exit={{
                opacity: 0,
                x: 25,
                rotate: 2,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              whileHover={{ scale: 1.05, x: 2, y: -2 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>↓</span> Скроль, щоб запустити час
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-ticker"
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            exit={{
              opacity: 0,
              y: -20,
              rotate: -1,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 1.2, duration: 0.9 }}
          >
            <motion.div
              className="ticker-track"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {duplicatedTicker.map((item, index) => (
                <span key={`${item}-${index}`} className="ticker-item">
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 180, x: 150, rotate: 35, scale: 0.4, filter: 'blur(30px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 180, x: 150, rotate: 35, scale: 0.4, filter: 'blur(30px)' }}
          exit={{
            opacity: 0,
            y: 50,
            x: 45,
            rotate: 8,
            scale: 0.9,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            y: heroRightY,
            opacity: heroRightOpacity,
            scale: heroRightScale,
            rotate: heroRightRotate,
            x: heroRightX,
          }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="robot-stage">
            <motion.div
              className="robot-aura"
              aria-hidden="true"
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              exit={{
                scale: 0.5,
                opacity: 0,
                rotate: -45,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 0.5, duration: 1.1 }}
            />
            <RobotScene layoutId="hero-robot" />
            <motion.div
              className="robot-ring ring-one"
              aria-hidden="true"
              initial={{ rotate: -200, scale: 0, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              exit={{
                rotate: 50,
                scale: 0.6,
                opacity: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="robot-ring ring-two"
              aria-hidden="true"
              initial={{ rotate: 200, scale: 0, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              exit={{
                rotate: -50,
                scale: 0.6,
                opacity: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="robot-caption"
              initial={{ opacity: 0, y: 50, scale: 0.6, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.8,
                rotate: 3,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: 1.1, duration: 1 }}
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              >
                «Я бачу кожен твій геніальний рух!»
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
