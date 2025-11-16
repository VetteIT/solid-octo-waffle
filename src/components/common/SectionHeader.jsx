import { motion } from 'framer-motion'

const SectionHeader = ({
  eyebrow,
  heading,
  title,
  subheading,
  description,
  align = 'left',
  centered = false,
  isLoaded = true,
}) => {
  const resolvedHeading = heading ?? title
  const resolvedSubheading = subheading ?? description
  const resolvedAlign = centered || align === 'center' ? 'center' : 'left'
  const viewportConfig = { once: false, amount: 0.3, margin: '150px 0px' }

  return (
    <div className={`section-header ${resolvedAlign === 'center' ? 'centered' : ''}`}>
      {eyebrow ? (
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: -6, x: -8 }}
          animate={isLoaded ? undefined : { opacity: 0, y: -6, x: -8 }}
          whileInView={isLoaded ? { opacity: 1, y: 0, x: 0 } : undefined}
          viewport={viewportConfig}
          exit={{
            opacity: 0,
            y: -4,
            x: -4,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.div
        className="section-beam"
        initial={{ opacity: 0, scaleX: 0, clipPath: 'inset(0 100% 0 0)' }}
        animate={isLoaded ? undefined : { opacity: 0, scaleX: 0 }}
        whileInView={isLoaded ? { opacity: 1, scaleX: 1, clipPath: 'inset(0)' } : undefined}
        viewport={viewportConfig}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {resolvedHeading ? (
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 26, filter: 'blur(4px)', rotateX: -8 }}
          animate={
            isLoaded
              ? undefined
              : { opacity: 0, y: 26, filter: 'blur(4px)', rotateX: -8 }
          }
          whileInView={
            isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 } : undefined
          }
          viewport={viewportConfig}
          exit={{
            opacity: 0,
            y: -14,
            filter: 'blur(3px)',
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {resolvedHeading}
        </motion.h2>
      ) : null}

      {resolvedSubheading ? (
        <motion.p
          className="section-subheading"
          initial={{ opacity: 0, y: 14, x: resolvedAlign === 'center' ? 0 : 8 }}
          animate={isLoaded ? undefined : { opacity: 0, y: 14, x: resolvedAlign === 'center' ? 0 : 8 }}
          whileInView={isLoaded ? { opacity: 1, y: 0, x: 0 } : undefined}
          viewport={viewportConfig}
          exit={{
            opacity: 0,
            y: -8,
            x: resolvedAlign === 'center' ? 0 : -4,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {resolvedSubheading}
        </motion.p>
      ) : null}
    </div>
  )
}

export default SectionHeader
