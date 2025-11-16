import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeader from './common/SectionHeader'
import { StaggerChildren, StaggerItem } from './decor/ScrollReveal'

const animationVariants = [
  {
    initial: { opacity: 0, y: 180, x: -100, scale: 0.3, rotate: -30, filter: 'blur(25px)' },
    whileInView: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -120, x: -80, scale: 0.5, rotate: -20, filter: 'blur(20px)' },
    hover: { y: -20, scale: 1.05, rotate: 2, rotateY: 10, boxShadow: '0 35px 80px rgba(156, 110, 255, 0.4)' },
  },
  {
    initial: { opacity: 0, x: -150, y: 120, scale: 0.4, rotate: -25, filter: 'blur(25px)' },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -100, y: -100, scale: 0.55, rotate: -15, filter: 'blur(20px)' },
    hover: { y: -20, x: -6, scale: 1.05, rotateY: -10, boxShadow: '0 35px 80px rgba(72, 213, 255, 0.4)' },
  },
  {
    initial: { opacity: 0, rotate: 50, scale: 0.2, y: 150, x: 60, filter: 'blur(30px)' },
    whileInView: { opacity: 1, rotate: 0, scale: 1, y: 0, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, rotate: -30, scale: 0.5, y: -120, x: 50, filter: 'blur(20px)' },
    hover: { y: -20, rotate: -3, scale: 1.05, rotateY: 12, boxShadow: '0 35px 80px rgba(255, 185, 122, 0.4)' },
  },
  {
    initial: { opacity: 0, y: -150, scale: 0.3, rotate: 25, filter: 'blur(25px)' },
    whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 120, scale: 0.5, rotate: 18, filter: 'blur(20px)' },
    hover: { y: -20, scale: 1.05, rotateY: -10, boxShadow: '0 35px 80px rgba(148, 240, 198, 0.4)' },
  },
  {
    initial: { opacity: 0, x: 150, y: 120, scale: 0.4, rotate: 30, filter: 'blur(25px)' },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 100, y: -100, scale: 0.55, rotate: 20, filter: 'blur(20px)' },
    hover: { y: -20, x: 6, scale: 1.05, rotateY: 10, boxShadow: '0 35px 80px rgba(255, 111, 183, 0.4)' },
  },
]

const cardLayouts = ['normal', 'tall', 'wide', 'skewed', 'normal']

const MemoriesGallerySection = ({ mediaItems = [], isLoaded = false }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.1, once: false })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.3])
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.section
      ref={sectionRef}
      className="memories-section"
      style={{ 
        opacity: isLoaded ? sectionOpacity : 0,
        y: sectionY 
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
          eyebrow="Галерея спогадів"
          heading="Живі моменти, що формують тебе"
          subheading="Вільний простір для всіх моментів, що не поміщаються лише в одну історію. Тут вони летять, мерехтять, переливаються, мов неонові вогні міста."
          centered
          isLoaded={isLoaded}
        />
      </motion.div>

      <StaggerChildren staggerDelay={0.12} isLoaded={isLoaded}>
        <div className="memories-grid">
          {mediaItems.map((item, index) => {
            const variant = animationVariants[index % animationVariants.length]
            const layoutClass = cardLayouts[index % cardLayouts.length]

            return (
              <StaggerItem key={`memory-${item.id}`}>
                <motion.article
                  className={`memory-card ${layoutClass}`}
                  initial={variant.initial}
                  animate={isLoaded ? undefined : variant.initial}
                  whileInView={isLoaded ? variant.whileInView : undefined}
                  viewport={{ once: false, amount: 0.2, margin: '200px 0px 100px 0px' }}
                  exit={{
                    ...variant.exit,
                    opacity: variant.exit?.opacity ?? 0,
                    y: (variant.exit?.y ?? 0) * 0.6,
                    x: (variant.exit?.x ?? 0) * 0.6,
                    rotate: (variant.exit?.rotate ?? 0) * 0.5,
                    scale: variant.exit?.scale ?? 0.9,
                    filter: 'blur(4px)',
                    transition: {
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  whileHover={variant.hover}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    className="memory-media"
                    initial={{ scale: 0.4, rotate: variant.initial.rotate }}
                    animate={isLoaded ? undefined : { scale: 0.4, rotate: variant.initial.rotate }}
                    whileInView={isLoaded ? { scale: 1, rotate: 0 } : undefined}
                    viewport={{ once: false, amount: 0.2, margin: '150px 0px' }}
                    transition={{ delay: index * 0.08 + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    layout
                  >
                    {item.type === 'image' ? (
                      <motion.img
                        src={item.src}
                        alt={item.label}
                        initial={{ scale: 1.3 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false, amount: 0.1 }}
                        whileHover={{ scale: 1.15, rotate: 3 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ willChange: 'transform' }}
                      />
                    ) : (
                      <motion.video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        initial={{ scale: 1.3 }}
                        whileInView={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                    )}
                  </motion.div>
                  <motion.div
                    className="memory-overlay"
                    initial={{ opacity: 0, y: 40 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="memory-date"
                      initial={{ x: -30, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.displayDate}
                    </motion.span>
                    <motion.h4
                      className="memory-title"
                      initial={{ y: 15, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {item.label}
                    </motion.h4>
                    <motion.div
                      className="memory-accent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    />
                  </motion.div>
                </motion.article>
              </StaggerItem>
            )
          })}
        </div>
      </StaggerChildren>
    </motion.section>
  )
}

export default MemoriesGallerySection
