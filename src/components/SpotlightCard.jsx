import { useRef, useState, useCallback } from 'react'

function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.22)' // emerald-500 ~ green
}) {
  const divRef = useRef(null)
  const rafRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = useCallback((e) => {
    if (!divRef.current || isFocused) return
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return
      const rect = divRef.current.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    })
  }, [isFocused])

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.4)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(0.4)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-gray-200 bg-white overflow-hidden p-6 transition-transform will-change-transform ${className}`}
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          willChange: 'opacity'
        }}
      />

      {children}
    </div>
  )
}

export default SpotlightCard


