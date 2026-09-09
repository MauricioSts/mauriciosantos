import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* HoverPreview (React Bits Pro, reescrito aqui com a mesma API, mais o campo
   `icon` nos alvos para mostrar o logo da ferramenta em vez de uma imagem).
   O texto vem em `content` com marcadores {0}, {1}... e cada marcador vira uma
   palavra-alvo de `targets`. No hover o preview entra flutuando e acompanha o
   cursor: o deslocamento é proporcional à distância até o centro da palavra e a
   rotação vem do lado para onde o cursor puxa.

   O preview é renderizado em portal com position:fixed porque as palavras
   aparecem dentro do carrossel de projetos e do accordion de experiência, e
   os dois cortam o que passa da borda. */

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 }
const GAP = 14
const EDGE = 8

function anchor(rect, position, w, h) {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  if (position === 'below') return { left: cx - w / 2, top: rect.bottom + GAP }
  if (position === 'left') return { left: rect.left - GAP - w, top: cy - h / 2 }
  if (position === 'right') return { left: rect.right + GAP, top: cy - h / 2 }
  return { left: cx - w / 2, top: rect.top - GAP - h }
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

/* Quebra "React {0} e {1}" em ['React ', {index:0}, ' e ', {index:1}] sem regex
   global com estado, para o resultado não depender de quantas vezes já rodou. */
function parseContent(content) {
  const out = []
  let last = 0
  for (const m of content.matchAll(/\{(\d+)\}/g)) {
    if (m.index > last) out.push(content.slice(last, m.index))
    out.push({ index: Number(m[1]) })
    last = m.index + m[0].length
  }
  if (last < content.length) out.push(content.slice(last))
  return out
}

function Target({
  target, imagePosition, enterSpeed, exitSpeed, maxRotation, maxOffset,
  imageWidth, imageHeight, imageBorderRadius, showImageShadow, targetPadding,
  targetClassName, onTargetClick,
}) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const left = useMotionValue(0)
  const top = useMotionValue(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)
  const rotate = useSpring(useTransform(mx, v => (v / (maxOffset || 1)) * maxRotation), SPRING)

  const track = useCallback(event => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const spot = anchor(rect, imagePosition, imageWidth, imageHeight)
    left.set(clamp(spot.left, EDGE, innerWidth - imageWidth - EDGE))
    top.set(clamp(spot.top, EDGE, innerHeight - imageHeight - EDGE))
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1)
    mx.set(clamp(dx, -1, 1) * maxOffset)
    my.set(clamp(dy, -1, 1) * maxOffset)
  }, [left, top, mx, my, maxOffset, imagePosition, imageWidth, imageHeight])

  const leave = useCallback(() => { setOpen(false); mx.set(0); my.set(0) }, [mx, my])

  const activate = useCallback(() => {
    if (onTargetClick) return onTargetClick(target)
    if (target.linkUrl) window.open(target.linkUrl, '_blank', 'noopener,noreferrer')
  }, [onTargetClick, target])

  const interactive = Boolean(onTargetClick || target.linkUrl)
  const label = target.altText || target.text

  return (
    <span
      ref={ref}
      className={`hp-target${interactive ? ' hp-clickable' : ''} ${targetClassName}`.trim()}
      style={{ padding: targetPadding, margin: -targetPadding }}
      onMouseEnter={e => { setOpen(true); track(e) }}
      onMouseMove={track}
      onMouseLeave={leave}
      onClick={interactive ? activate : undefined}
      onKeyDown={interactive ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate() } } : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {target.text}
      {createPortal(
        <AnimatePresence>
          {open && (target.icon || target.imageUrl) && (
            <Motion.span
              className="hp-slot"
              style={{ left, top, width: imageWidth, height: imageHeight }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: enterSpeed } }}
              exit={{ opacity: 0, transition: { duration: exitSpeed } }}
            >
              <Motion.span
                className={target.icon ? 'hp-image hp-logo' : 'hp-image'}
                role="img"
                aria-label={label}
                style={{
                  x, y, rotate,
                  color: target.color,
                  borderRadius: imageBorderRadius,
                  boxShadow: showImageShadow ? '0 18px 50px rgba(0,0,0,.45)' : 'none',
                }}
                initial={{ scale: 0.86 }}
                animate={{ scale: 1, transition: { duration: enterSpeed } }}
                exit={{ scale: 0.9, transition: { duration: exitSpeed } }}
              >
                {target.icon || <img src={target.imageUrl} alt="" draggable="false" />}
              </Motion.span>
            </Motion.span>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </span>
  )
}

export default function HoverPreview({
  content = '',
  targets = [],
  onTargetClick,
  imagePosition = 'above',
  enterSpeed = 0.2,
  exitSpeed = 0.15,
  maxRotation = 12,
  maxOffset = 15,
  imageWidth = 200,
  imageHeight = 200,
  className = '',
  targetClassName = '',
  targetPadding = 4,
  imageBorderRadius = '0.75rem',
  showImageShadow = true,
}) {
  const parts = useMemo(() => parseContent(content), [content])

  /* Sem pré-carga a primeira passada do mouse mostra um quadro vazio. Ícone é
     componente, já vem no bundle, então só imagem precisa disto. */
  useEffect(() => {
    targets.forEach(t => { if (t?.imageUrl) { const img = new Image(); img.src = t.imageUrl } })
  }, [targets])

  return (
    <span className={`hp ${className}`.trim()}>
      {parts.map((part, i) => {
        if (typeof part === 'string') return <span key={i}>{part}</span>
        const target = targets[part.index]
        if (!target) return null
        return (
          <Target
            key={i}
            target={target}
            imagePosition={imagePosition}
            enterSpeed={enterSpeed}
            exitSpeed={exitSpeed}
            maxRotation={maxRotation}
            maxOffset={maxOffset}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            imageBorderRadius={imageBorderRadius}
            showImageShadow={showImageShadow}
            targetPadding={targetPadding}
            targetClassName={targetClassName}
            onTargetClick={onTargetClick}
          />
        )
      })}
    </span>
  )
}
