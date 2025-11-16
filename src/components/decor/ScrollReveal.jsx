import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const ParallaxSection = ({ children, speed = 0.5 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      style={{ y, position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}

export const FadeInScale = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)

export const SlideInFromLeft = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)

export const SlideInFromRight = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)

export const RotateInView = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)

export const StaggerChildren = ({ children, staggerDelay = 0.1, isLoaded = true }) => {
  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? undefined : "hidden"}
      whileInView={isLoaded ? "visible" : undefined}
      viewport={{ once: false, amount: 0.2, margin: '200px 0px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    }}
  >
    {children}
  </motion.div>
)

export const BlurFadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{
      duration: 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)
