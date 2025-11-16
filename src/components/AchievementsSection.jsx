import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeader from './common/SectionHeader'
import useInteractiveGlow from '../hooks/useInteractiveGlow'

const featuredAchievements = [
  {
    id: 1,
    title: 'Перший гучний виступ на сцені',
    description:
      'Ти сміливо вийшов на сцену, взяв мікрофон і подарував пісню, яку запам’ятали рідні та журі. Голос тремтів, але очі сяяли впевненістю.',
    icon: '🎤',
    year: '2014',
  },
  {
    id: 2,
    title: 'Командний дух і спортивний характер',
    description:
      'Змагання, тренування, падіння й знову підйом — ти вчився не здаватися, підтримувати команду і радіти перемогам разом з іншими.',
    icon: '🏆',
    year: '2015',
  },
  {
    id: 3,
    title: 'Творчі ідеї, що оживають у проєктах',
    description:
      'Малюнки, вироби, мінісценки й домашні шоу — ти перетворюєш фантазії на справжні історії, які дарують посмішки всій родині.',
    icon: '✨',
    year: '2016',
  },
  {
    id: 4,
    title: 'Сила родини поруч із тобою',
    description:
      'Разом із братом, сестрою та батьками ти навчився ділитися, допомагати й радіти успіхам одне одного — це головний фундамент усіх перемог.',
    icon: '👨‍👩‍👧‍👦',
    year: '2017',
  },
]

const timelineMoments = [
  {
    id: 'tm-1',
    year: '2012',
    title: 'Перші маленькі перемоги',
    text: 'Перші влучні удари м’яча, перші сміливі кроки у спорті й іграх — з цього починається шлях чемпіона.',
  },
  {
    id: 'tm-2',
    year: '2013',
    title: 'Віра в себе',
    text: 'Ти вчишся не боятися нових викликів: виступити, спробувати, показати, що можеш більше, ніж здається.',
  },
  {
    id: 'tm-3',
    year: '2014',
    title: 'Крок уперед кожного року',
    text: 'Щороку ти відкриваєш у собі щось нове — талант, характер, терпіння, доброту та відповідальність.',
  },
  {
    id: 'tm-4',
    year: '2015+',
    title: 'Перемоги, які тільки починаються',
    text: 'Попереду — нові сцени, старти, друзi й мрії. Успіхи, що вже є, — лише початок великого шляху.',
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
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 100, scale: 0.85, filter: 'blur(20px)' }}
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
          eyebrow="Моменти перемог та успіхів"
          heading="Кроки, які вже зроблені"
          subheading="Тут зібрані не всі медалі й грамоти, а ті миті, коли ти був сміливим, наполегливим, добрим і справжнім собою — саме з них складається твоя історія перемог."
          centered={false}
          isLoaded={isLoaded}
        />
      </motion.div>

      <div className="achievements-layout">
        <motion.div
          className="achievements-timeline"
          initial={{ opacity: 0, x: -40, y: 40, filter: 'blur(18px)' }}
          animate={isLoaded && isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : { opacity: 0, x: -40, y: 40, filter: 'blur(18px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {timelineMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              className="achievements-timeline-item"
              initial={{ opacity: 0, y: 40, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline-year-pill">{moment.year}</div>
              <div className="timeline-moment-content">
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="achievements-grid">
          {featuredAchievements.map((achievement, index) => {
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
      </div>
    </motion.section>
  )
}

export default AchievementsSection
