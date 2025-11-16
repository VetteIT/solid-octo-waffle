import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import VideoPlayer from './common/VideoPlayer'
import SectionHeader from './common/SectionHeader'
import useInteractiveGlow from '../hooks/useInteractiveGlow'

const robotMessages = [
  'Час пливе, а спогади залишаються назавжди',
  'Кожен момент — це крок до мрії',
  'Пам\'ятаєш цю історію?',
  'Твої пригоди надихають всіх',
  'Сміливість і творчість — твої суперсили',
]

const TimelineSection = ({ mediaItems = [], isLoaded = false }) => {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef([])
  const observerRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.15, once: false })
  const { handleGlowMove, handleGlowLeave } = useInteractiveGlow()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.6', 'end end'],
  })

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-40px', '40px'])
  
  // Легкий паралакс для панелі (мінімальний, щоб панель залишалась видимою)
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -20])

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.dataset.index)
        if (!isNaN(index)) {
          setActiveIndex(index)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: '-15% 0px',
    })

    cardRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [mediaItems, handleIntersection])

  if (mediaItems.length === 0) {
    return null
  }

  const years = [...new Set(mediaItems.map((item) => item.year || item.date.split('-')[0]))].sort()

  return (
    <section id="timeline" ref={sectionRef} className="timeline-section">
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(20px)' }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 100, scale: 0.9, filter: 'blur(20px)' }}
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
          eyebrow="Подорож у часі"
          heading="Хронологія теплих митей"
          subheading="Перегляньте кожен крок, кожну усмішку, кожну перемогу. Від перших кроків до зоряних виступів — всі моменти зібрані тут."
          isLoaded={isLoaded}
        />
      </motion.div>

      <div className="timeline-layout">
        <motion.div
          className="timeline-panel"
          ref={panelRef}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2, margin: '150px 0px' }}
          exit={{
            opacity: 0,
            x: -20,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{ y: panelY }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          onPointerMove={(e) => {
            const rect = panelRef.current?.getBoundingClientRect()
            if (!rect) return
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            panelRef.current.style.setProperty('--mx', `${x}%`)
            panelRef.current.style.setProperty('--my', `${y}%`)
          }}
          onPointerLeave={() => {
            if (panelRef.current) {
              panelRef.current.style.removeProperty('--mx')
              panelRef.current.style.removeProperty('--my')
            }
          }}
        >
          <motion.div
            className="timeline-progress"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span className="progress-fill" style={{ height: progressHeight }} />
          </motion.div>

          <div className="timeline-years">
            {years.map((year, index) => (
              <motion.div
                key={year}
                className={`timeline-year ${
                  String(mediaItems[activeIndex]?.year || mediaItems[activeIndex]?.date.split('-')[0] || '').startsWith(
                    year,
                  )
                    ? 'active'
                    : ''
                }`}
                initial={{ opacity: 0, x: -30, y: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.3, margin: '100px 0px' }}
                exit={{
                  opacity: 0,
                  x: -15,
                  y: -5,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {year}
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              className="timeline-caption"
              key={activeIndex}
              initial={{ opacity: 0, y: 20, x: -15 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                y: -10,
                x: 10,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="robot-emoji"
                initial={{ opacity: 0, y: 6, scale: 0.4, rotate: -40 }}
                animate={{
                  opacity: 1,
                  y: [0, -4, 0],
                  scale: [1, 1.15, 1],
                  rotate: [0, -15, 15, 0],
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  scale: 0.3,
                  rotate: 40,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  delay: 0.15,
                  duration: 2.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              >
                🤖
              </motion.span>
              <p>{robotMessages[activeIndex % robotMessages.length]}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="timeline-content">
          {mediaItems.map((item, index) => {
            const isEven = index % 2 === 0
            const direction = isEven ? 1 : -1

            return (
              <motion.article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                data-index={index}
                className="timeline-item"
                initial={{
                  opacity: 0,
                  y: 140,
                  x: direction * 80,
                  rotate: direction * 18,
                  scale: 0.75,
                  filter: 'blur(18px)',
                }}
                animate={
                  isLoaded
                    ? undefined
                    : {
                        opacity: 0,
                        y: 140,
                        x: direction * 80,
                        rotate: direction * 18,
                        scale: 0.75,
                        filter: 'blur(18px)',
                      }
                }
                whileInView={
                  isLoaded
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }
                    : undefined
                }
                viewport={{ amount: 0.4, once: false, margin: '200px 0px 100px 0px' }}
                exit={{
                  opacity: 0,
                  y: -40,
                  x: direction * -30,
                  rotate: direction * -4,
                  scale: 0.94,
                  filter: 'blur(4px)',
                  transition: {
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  rotateY: direction * 3,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                onMouseMove={handleGlowMove}
                onMouseLeave={handleGlowLeave}
              >
                <motion.div
                  className="timeline-number"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: 45,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  transition={{
                    delay: index * 0.05 + 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>

                <motion.div
                  className="timeline-media-container"
                  initial={{ opacity: 0, scale: 0.5, rotate: direction * 20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
                  transition={{
                    delay: index * 0.05 + 0.15,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  layout
                >
                  {item.type === 'video' ? (
                    <VideoPlayer src={item.src} />
                  ) : (
                    <motion.div
                      className="timeline-image"
                      whileHover={{ scale: 1.03, rotate: direction * 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ willChange: 'transform', transformOrigin: 'center' }}
                    >
                      <img 
                        src={item.src} 
                        alt={item.label}
                        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      />
                      <div className="image-overlay" />
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  className="timeline-details"
                  initial={{ opacity: 0, y: 60, x: direction * 40 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: '150px 0px' }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    x: direction * -20,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  transition={{
                    delay: index * 0.05 + 0.2,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.span
                    className="timeline-badge"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
                    whileHover={{ scale: 1.08, rotate: 3, y: -3 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.displayDate}
                  </motion.span>
                  <h3 className="timeline-title">{item.label}</h3>
                  <p className="timeline-desc">{item.description}</p>
                    <motion.div
                      className="timeline-tags"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2, margin: '100px 0px' }}
                      transition={{ delay: index * 0.05 + 0.25, duration: 0.4 }}
                    >
                    <motion.span
                      className="tag"
                      whileHover={{ scale: 1.1, x: 3, rotate: 2 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      #{item.year || item.date.split('-')[0]}
                    </motion.span>
                    <motion.span
                      className="tag"
                      whileHover={{ scale: 1.1, x: 3, rotate: -2 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.type === 'video' ? '🎬 відео' : '📷 фото'}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
