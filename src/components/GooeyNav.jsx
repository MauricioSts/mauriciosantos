import { useMemo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function GooeyNav({
  items = [],
  initialActiveIndex = 0,
  animationTime = 600,
  className = '',
  controlledActiveIndex,
  onChange,
  enableScrollSpy = true
}) {
  const [internalActive, setInternalActive] = useState(initialActiveIndex)
  const active = controlledActiveIndex ?? internalActive
  const refs = useRef([])
  const [blob, setBlob] = useState({ left: 0, width: 0 })
  const sectionElsRef = useRef([])

  useEffect(() => {
    const el = refs.current[active]
    if (el) {
      const rect = el.getBoundingClientRect()
      const parent = el.parentElement.getBoundingClientRect()
      setBlob({ left: rect.left - parent.left, width: rect.width })
    }
  }, [active, items])

  useEffect(() => {
    const onResize = () => {
      const el = refs.current[active]
      if (!el) return
      const rect = el.getBoundingClientRect()
      const parent = el.parentElement.getBoundingClientRect()
      setBlob({ left: rect.left - parent.left, width: rect.width })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  // Scrollspy: follow current section while scrolling
  useEffect(() => {
    if (!enableScrollSpy) return
    sectionElsRef.current = items
      .map((it) => typeof it.href === 'string' && it.href.startsWith('#') ? document.querySelector(it.href) : null)
    const onScroll = () => {
      const headerOffset = 80 // approximate header height
      let bestIdx = active
      let bestDist = Infinity
      sectionElsRef.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top - headerOffset)
        if (rect.bottom > headerOffset && dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      })
      if (bestIdx !== active) {
        setInternalActive(bestIdx)
        if (onChange) onChange(bestIdx)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [items, active, enableScrollSpy, onChange])

  const activate = (i) => {
    setInternalActive(i)
    if (onChange) onChange(i)
  }

  return (
    <div className={`relative inline-flex rounded-full border border-gray-800/60 bg-gray-900/70 backdrop-blur-md px-2 py-1 ${className}`}>
      {/* SVG filter for gooey */}
      <svg className="absolute -z-10 opacity-0" width="0" height="0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="relative" style={{ filter: 'url(#goo)' }}>
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.45)]"
          animate={{ left: blob.left, width: Math.max(blob.width, 64) }}
          transition={{ duration: animationTime / 1000, ease: 'easeOut' }}
        />
      </div>

      <nav className="relative z-10 flex items-center gap-1">
        {items.map((it, i) => (
          <a
            key={i}
            ref={(n) => (refs.current[i] = n)}
            href={it.href}
            onClick={(e) => {
              if (it.href?.startsWith('#')) {
                e.preventDefault()
                const target = document.querySelector(it.href)
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              activate(i)
            }}
            onMouseEnter={() => activate(i)}
            onFocus={() => activate(i)}
            className={`px-4 py-2 rounded-full no-underline transition-colors text-sm md:text-[15px] ${
              active === i ? 'text-emerald-300' : 'text-gray-300 hover:text-emerald-200'
            }`}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default GooeyNav


