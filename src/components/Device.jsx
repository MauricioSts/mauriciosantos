import { useCallback, useRef } from 'react'
import { motion as Motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* Device (React Bits Pro, reescrito aqui com a mesma API). Moldura de celular
   em CSS puro, com paralaxe e rotação no hover.

   Diferença de implementação: lá o `isScrollable` usa Lenis. Aqui é rolagem
   nativa com scroll-behavior smooth, porque a única coisa que rola dentro da
   tela é uma captura em pé e o Lenis custaria mais uma dependência no bundle. */

const SPRING = { stiffness: 200, damping: 24, mass: 0.7 }

export default function Device({
  image,
  scale = 1,
  isScrollable = false,
  enableParallax = true,
  parallaxStrength = 15,
  enableRotate = true,
  rotateStrength = 3,
  autoAnimate = false,
  className = '',
  alt = '',
  children,
}) {
  const ref = useRef(null)
  const mx = useMotionValue(0) // -1..1 na horizontal
  const my = useMotionValue(0)

  const shift = enableParallax ? parallaxStrength : 0
  const turn = enableRotate ? rotateStrength : 0
  const x = useSpring(useTransform(mx, v => v * shift), SPRING)
  const y = useSpring(useTransform(my, v => v * shift), SPRING)
  const rotateY = useSpring(useTransform(mx, v => v * turn), SPRING)
  const rotateX = useSpring(useTransform(my, v => v * -turn), SPRING)
  const rotateZ = useSpring(useTransform(mx, v => v * turn / 3), SPRING)

  const onMove = useCallback(e => {
    if (autoAnimate) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))))
    my.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))))
  }, [autoAnimate, mx, my])

  const onLeave = useCallback(() => { if (!autoAnimate) { mx.set(0); my.set(0) } }, [autoAnimate, mx, my])

  /* Lemniscata: o cursor imaginário anda em oito, que é o que o autoAnimate do
     original faz para o aparelho nunca parar em uma pose só. */
  useAnimationFrame(t => {
    if (!autoAnimate) return
    const a = t / 2600
    mx.set(Math.sin(a))
    my.set(Math.sin(a * 2) / 2)
  })

  return (
    <div
      ref={ref}
      className={`dv ${className}`.trim()}
      style={{ '--dv-scale': scale }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Motion.div className="dv-body" style={{ x, y, rotateX, rotateY, rotateZ }}>
        <div className={isScrollable ? 'dv-screen dv-scroll' : 'dv-screen'}>
          {children || (image && <img src={image} alt={alt} draggable="false" loading="lazy" />)}
        </div>
        <span className="dv-island" />
        <span className="dv-side dv-vol" />
        <span className="dv-side dv-pwr" />
      </Motion.div>
    </div>
  )
}
