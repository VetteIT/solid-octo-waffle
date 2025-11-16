import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export default ScrollProgressBar

