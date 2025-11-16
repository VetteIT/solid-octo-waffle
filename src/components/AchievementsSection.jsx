import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeader from './common/SectionHeader'
import useInteractiveGlow from '../hooks/useInteractiveGlow'

const achievements = [
  {
    id: 1,
    title: 'Перший крок у робототехніці',
    description: 'Створив свого першого робота та відкрив для себе світ технологій',
    icon: '🤖',
    color: '#9c6eff',
    year: '2015',
  },
  {
    id: 2,
    title: 'Шкільні перемоги',
    description: 'Багаторазовий переможець олімпіад та конкурсів',
    icon: '🏆',
    color: '#48d5ff',
    year: '2018',
  },
  {
    id: 3,
    title: 'Творчі проєкти',
    description: 'Реалізував десятки креативних ідей та проєктів',
    icon: '✨',
    color: '#ffb97a',
    year: '2020',
  },
  {
    id: 4,
    title: 'Дружба та підтримка',
    description: 'Надихнув та підтримав багатьох друзів на їхньому шляху',
    icon: '💫',
    color: '#ff6fb7',
    year: '2022',
  },
  {
    id: 5,
    title: 'Зоряні виступи',
    description: 'Виступив на великих сценах та поділився своїм талантом',
    icon: '⭐',
    color: '#94f0c6',
    year: '2024',
  },
  {
    id: 6,
    title: 'Мрії стають реальністю',
    description: 'Продовжуєш рухатися вперед та втілювати найсміливіші мрії',
    icon: '🚀',
    color: '#9c6eff',
    year: '2025',
  },
]

const AchievementsSection = ({ isLoaded = false }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.1, once: false })
  const [hoveredId, setHoveredId] = useState(null)
  const { handleGlowMove, handleGlowLeave } = useInteractiveGlow()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.3])
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.section
      ref={sectionRef}
      className="achievements-section"
      style={{
        opacity: isLoaded ? sectionOpacity : 0,
        y: sectionY,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.85, filter: 'blur(20px)' }}
        animate={isLoaded && isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 100, scale: 0.85, filter: 'blur(20px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.3, margin: '200px 0px 100px 0px' }}
        exit={{
          opacity: 0,
          y: -40,
          scale: 0.95,
          filter: 'blur(4px)',
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeader
          eyebrow="Досягнення та нагороди"
          heading="Моменти перемог та успіхів"
          subheading="Кожна нагорода — це не просто трофей, а свідчення твоєї наполегливості, таланту та здатності перетворювати мрії на реальність."
          centered
          isLoaded={isLoaded}
        />
      </motion.div>

      <div className="achievements-grid">
        {achievements.map((achievement, index) => {
          const isHovered = hoveredId === achievement.id
          const delay = index * 0.1

          return (
            <motion.div
              key={achievement.id}
              className="achievement-card"
              initial={{ opacity: 0, y: 80, scale: 0.6, rotate: -15 }}
              animate={isLoaded ? undefined : { opacity: 0, y: 80, scale: 0.6, rotate: -15 }}
              whileInView={isLoaded ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : undefined}
              viewport={{ once: false, amount: 0.2, margin: '150px 0px' }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 0.8,
                rotate: 10,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                rotate: isHovered ? 1 : 0,
              }}
              onHoverStart={() => setHoveredId(achievement.id)}
              onHoverEnd={() => setHoveredId(null)}
              onMouseMove={handleGlowMove}
              onMouseLeave={(event) => {
                handleGlowLeave(event)
                setHoveredId(null)
              }}
              transition={{
                delay,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <motion.div
                className="achievement-icon"
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0], scale: 1.2 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {achievement.icon}
              </motion.div>
              <motion.div className="achievement-year">{achievement.year}</motion.div>
              <motion.h3
                className="achievement-title"
                animate={isHovered ? { y: -2 } : { y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {achievement.title}
              </motion.h3>
              <motion.p
                className="achievement-description"
                animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {achievement.description}
              </motion.p>
              <motion.div
                className="achievement-glow"
                animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default AchievementsSection

