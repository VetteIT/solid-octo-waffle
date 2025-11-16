import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import SectionHeader from './common/SectionHeader'
import useInteractiveGlow from '../hooks/useInteractiveGlow'

const heroLine =
  'Матвій, ти поєднуєш сміливість дослідника і тепло друга, завдяки чому світ стає яскравішим.'

const traits = ['Добрий', 'Розумний', 'Сміливий', 'Щирий', 'Мрійливий', 'Незламний']

const stats = [
  { label: 'Років світла', value: 15, color: '#9c6eff' },
  { label: 'Гучних сміхів за рік', value: 520, color: '#48d5ff' },
  { label: 'Нових пригод попереду', value: 300, color: '#ffb97a' },
]

const StatCounter = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { handleGlowMove, handleGlowLeave } = useInteractiveGlow()

  useEffect(() => {
    if (!isVisible) return

    let frame
    let start
    const duration = 2000

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [value, delay, isVisible])

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      onViewportEnter={() => setIsVisible(true)}
      onMouseMove={handleGlowMove}
      onMouseLeave={handleGlowLeave}
      transition={{ delay: delay * 0.15, duration: 0.6 }}
    >
      <div className="stat-number">{count.toLocaleString('uk-UA')}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

const WishesSection = ({ isLoaded = false }) => {
  const sectionRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const isInView = useInView(sectionRef, { amount: 0.15, once: false })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.3])
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    let timeout
    let index = 0

    const type = () => {
      setTypedText(heroLine.slice(0, index))
      if (index <= heroLine.length) {
        index += 1
        timeout = setTimeout(type, 35)
      }
    }

    const startTyping = setTimeout(type, 500)
    return () => {
      clearTimeout(startTyping)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <motion.section
      id="wishes"
      ref={sectionRef}
      className="wishes-section"
      style={{ 
        opacity: isLoaded ? sectionOpacity : 0,
        y: sectionY 
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.85, filter: 'blur(20px)' }}
        animate={
          isLoaded
            ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: 120, scale: 0.85, filter: 'blur(20px)' }
        }
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeader
          heading="Побажання від серця"
          subheading="Нехай цей рік стане студією твоїх найсміливіших історій."
          centered
          isLoaded={isLoaded}
        />
      </motion.div>

      <div className="wishes-content">
        <motion.div
          className="wishes-text-block"
          initial={{ opacity: 0, y: 150, x: -120, rotate: -20, scale: 0.5, filter: 'blur(25px)' }}
          animate={isLoaded ? undefined : { opacity: 0, y: 150, x: -120, rotate: -20, scale: 0.5, filter: 'blur(25px)' }}
          whileInView={isLoaded ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' } : undefined}
          viewport={{ once: false, amount: 0.4, margin: '200px 0px 100px 0px' }}
          exit={{
            opacity: 0,
            y: -40,
            x: -30,
            rotate: -5,
            scale: 0.95,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="type-line"
            initial={{ opacity: 0, y: 60, rotateX: -40, scale: 0.6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
            exit={{
              opacity: 0,
              y: -30,
              rotateX: 10,
              scale: 0.9,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {typedText}
          </motion.div>
          <motion.p
            className="wishes-paragraph"
            initial={{ opacity: 0, y: 80, x: -50 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
            exit={{
              opacity: 0,
              y: -40,
              x: -30,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Бажаємо тобі завжди чітко чути власне серце та впевнено малювати майбутнє. Хай кожне
            бажання має смак нового відкриття, хай поруч будуть люди, що захоплюються твоєю
            добротою, а робот-охоронець нагадує: ти головний творець свого космосу.
          </motion.p>
          <motion.div
            className="trait-chips"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
            transition={{ delay: 0.5 }}
          >
            {traits.map((trait, index) => (
              <motion.span
                key={trait}
                className="trait-chip"
                initial={{ opacity: 0, scale: 0, rotate: -180, y: 50, x: -40 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0, x: 0 }}
                viewport={{ once: false, amount: 0.3, margin: '100px 0px' }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: 45,
                  y: -20,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                whileHover={{ scale: 1.1, y: -4, rotate: 3 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {trait}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>


        <motion.div
          className="wishes-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
          transition={{ delay: 0.7 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 100, x: index % 2 === 0 ? -80 : 80, rotate: index % 2 === 0 ? -20 : 20, scale: 0.2 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3, margin: '100px 0px' }}
              exit={{
                opacity: 0,
                y: -50,
                x: index % 2 === 0 ? -30 : 30,
                rotate: index % 2 === 0 ? 8 : -8,
                scale: 0.7,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatCounter value={stat.value} label={stat.label} delay={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default WishesSection
