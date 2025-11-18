import { motion, useReducedMotion } from 'framer-motion'

function Reveal({ children, className = '', delay = 0, y = 16 }) {
  const prefersReducedMotion = useReducedMotion()
  const initial = prefersReducedMotion ? {} : { opacity: 0, y }
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal


