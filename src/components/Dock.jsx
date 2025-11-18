import { useEffect, useMemo, useRef, useState } from 'react'

function Dock({
  items = [],
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  className = ''
}) {
  const panelRef = useRef(null)
  const [mouseX, setMouseX] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const lastXRef = useRef(null)
  const rafRef = useRef(0)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    if (!isHovering) return
    const onMove = (e) => {
      if (!panelRef.current) return
      const rect = panelRef.current.getBoundingClientRect()
      lastXRef.current = Math.max(rect.left, Math.min(e.clientX, rect.right))
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMouseX(lastXRef.current)
          rafRef.current = 0
        })
      }
    }
    const onLeaveWindow = () => {
      setMouseX(null)
      setIsHovering(false)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeaveWindow)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeaveWindow)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [isHovering])

  // Responsive sizing based on viewport width
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const baseUsed = vw < 380 ? Math.max(36, baseItemSize - 14) : vw < 640 ? Math.max(42, baseItemSize - 8) : baseItemSize
  const magnificationUsed = vw < 380 ? Math.max(46, magnification - 24) : vw < 640 ? Math.max(56, magnification - 14) : magnification

  const computed = useMemo(() => {
    return items.map((item) => ({ ...item, _size: baseItemSize }))
  }, [items, baseItemSize])

  const sigma = 90 // spread of influence in px
  const maxScale = 1 + magnificationUsed / baseUsed

  return (
    <div
      ref={panelRef}
      onMouseEnter={() => { setIsHovering(true) }}
      onMouseLeave={() => { setIsHovering(false); setMouseX(null) }}
      className={`mx-auto max-w-full rounded-2xl border border-gray-800/60 bg-gray-900/60 backdrop-blur-md px-2 md:px-4 ${className}`}
      style={{ height: panelHeight }}
      role="menubar"
      aria-label="Dock"
    >
      <div className="flex h-full items-end gap-2.5 md:gap-4">
        {computed.map((it, idx) => {
          const ref = (node) => {
            if (node) it._node = node
          }
          let size = baseItemSize
          if (isHovering && mouseX != null && it._node) {
            const rect = it._node.getBoundingClientRect()
            const center = rect.left + rect.width / 2
            const dist = Math.abs(mouseX - center)
            const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma))
            size = baseItemSize + magnification * influence
          }
          return (
            <button
              key={idx}
              ref={ref}
              onClick={it.onClick}
              title={it.label}
              className="group relative grid place-items-center rounded-xl bg-gray-800/60 text-gray-200 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              style={{ width: baseUsed, height: baseUsed }}
              role="menuitem"
            >
              {(() => {
                let scale = 1
                if (isHovering && mouseX != null && it._node) {
                  const rect = it._node.getBoundingClientRect()
                  const center = rect.left + rect.width / 2
                  const dist = Math.abs(mouseX - center)
                  const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma))
                  scale = 1 + (maxScale - 1) * influence
                }
                return (
                  <div
                    className="text-[0px] will-change-transform"
                    style={{ transform: `scale(${scale})`, transition: 'transform 120ms ease-out' }}
                  >
                    {it.icon}
                  </div>
                )
              })()}
              <span className="pointer-events-none absolute -top-7 scale-95 rounded-md bg-gray-900/90 px-2 py-1 text-xs text-gray-100 opacity-0 shadow-md backdrop-blur-sm transition-all duration-150 group-hover:opacity-100 group-hover:scale-100">
                {it.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Dock


