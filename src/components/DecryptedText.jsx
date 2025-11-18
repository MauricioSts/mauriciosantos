import { useEffect, useMemo, useRef, useState } from 'react'

function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover', // 'hover' | 'view'
  revealDirection = 'left', // 'left' | 'right' | 'center'
}) {
  const target = String(text)
  const [output, setOutput] = useState(target)
  const [revealed, setRevealed] = useState(Array(target.length).fill(false))
  const containerRef = useRef(null)
  const runningRef = useRef(false)
  const observerRef = useRef(null)

  const charList = useMemo(() => characters.split(''), [characters])

  const indicesOrder = useMemo(() => {
    const idx = [...target].map((_, i) => i)
    if (revealDirection === 'right') return idx.reverse()
    if (revealDirection === 'center') {
      const mid = Math.floor(idx.length / 2)
      const order = []
      for (let d = 0; d <= mid; d++) {
        if (mid - d >= 0) order.push(mid - d)
        if (mid + d < idx.length) order.push(mid + d)
      }
      return order
    }
    return idx
  }, [target, revealDirection])

  const run = () => {
    if (runningRef.current) return
    runningRef.current = true
    const revealedLocal = [...revealed]
    let orderIdx = 0
    const tick = () => {
      if (orderIdx >= indicesOrder.length) {
        runningRef.current = false
        setOutput(target)
        setRevealed(Array(target.length).fill(true))
        return
      }
      const i = indicesOrder[orderIdx]
      let iter = 0
      const interval = setInterval(() => {
        iter += 1
        setOutput((prev) => {
          const arr = prev.split('')
          if (!revealedLocal[i]) arr[i] = charList[(Math.random() * charList.length) | 0]
          return arr.join('')
        })
        if (iter >= maxIterations) {
          clearInterval(interval)
          revealedLocal[i] = true
          setOutput((prev) => {
            const arr = prev.split('')
            arr[i] = target[i]
            return arr.join('')
          })
          orderIdx += 1
          setTimeout(tick, speed)
        }
      }, Math.max(8, Math.floor(speed / 3)))
    }
    tick()
  }

  useEffect(() => {
    setOutput(target)
    setRevealed(Array(target.length).fill(false))
  }, [target])

  useEffect(() => {
    if (animateOn !== 'view') return
    if (!containerRef.current) return
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run()
          if (observerRef.current) observerRef.current.disconnect()
        }
      })
    }, { threshold: 0.2 })
    observerRef.current.observe(containerRef.current)
    return () => observerRef.current && observerRef.current.disconnect()
  }, [animateOn])

  const handleMouseEnter = () => {
    if (animateOn === 'hover') run()
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
    >
      <span className={className}>{output}</span>
      <span className={encryptedClassName} aria-hidden="true" />
    </span>
  )
}

export default DecryptedText


