import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion as Motion } from 'framer-motion'

/* Modal Cards (React Bits Pro, reescrito aqui com a mesma API de animação e
   fechamento). Lá o componente também desenha a grade de cards; aqui só a
   casca do modal é usada, porque os cards do site já existem no carrossel de
   projetos e trazem vídeo, capa e ordem própria. O conteúdo do projeto entra
   como children. */

const SPEEDS = { slow: 0.62, normal: 0.42, fast: 0.26, none: 0 }
const EASE = [0.22, 0.61, 0.36, 1]

const VARIANTS = {
  scale: {
    initial: { opacity: 0, scale: 0.93, y: 26 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 14 },
  },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  slide: {
    initial: { opacity: 0, y: '7%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '4%' },
  },
}

export default function ModalCard({
  open,
  onClose,
  gradientColor = '#6366f1',
  animationSpeed = 'normal',
  springStiffness,
  springDamping,
  animationVariant = 'scale',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  ariaLabel = 'Card details modal',
  backdropGradientPosition = '50% 10%',
  className = '',
  modalClassName = '',
  backdropClassName = '',
  closeLabel = 'Close',
  scrollRef,
  children,
}) {
  const panel = useRef(null)
  const restore = useRef(null)

  const duration = SPEEDS[animationSpeed] ?? SPEEDS.normal
  /* Mola só quando o usuário pediu rigidez ou amortecimento; senão a duração
     manda, que é o que animationSpeed promete. */
  const transition = (springStiffness || springDamping)
    ? { type: 'spring', stiffness: springStiffness ?? 260, damping: springDamping ?? 30 }
    : { duration, ease: EASE }

  useEffect(() => {
    if (!open || !closeOnEscape) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, closeOnEscape, onClose])

  /* A página atrás não pode rolar, e ao fechar volta para onde estava. */
  useEffect(() => {
    if (!open) return
    const y = scrollY
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; scrollTo(0, y) }
  }, [open])

  useEffect(() => {
    if (!open) return
    restore.current = document.activeElement
    panel.current?.focus({ preventScroll: true })
    return () => { if (restore.current instanceof HTMLElement) restore.current.focus({ preventScroll: true }) }
  }, [open])

  const onBackdrop = useCallback(() => { if (closeOnBackdropClick) onClose() }, [closeOnBackdropClick, onClose])

  const variant = VARIANTS[animationVariant] || VARIANTS.scale

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={`mc-root ${className}`.trim()}>
          <Motion.div
            className={`mc-backdrop ${backdropClassName}`.trim()}
            style={{ background: `radial-gradient(120% 85% at ${backdropGradientPosition}, ${gradientColor}59, rgba(0,0,0,.9) 62%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 0.8, ease: EASE }}
            onClick={onBackdrop}
          />
          <Motion.div
            ref={panel}
            className={`mc-modal ${modalClassName}`.trim()}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={transition}
          >
            {showCloseButton && (
              <button className="mc-close" onClick={onClose} aria-label={closeLabel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            )}
            <div className="mc-body" ref={scrollRef}>{children}</div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
