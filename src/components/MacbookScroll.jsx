import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import {
  TbBrightnessDown, TbBrightnessUp, TbTable, TbSearch, TbMicrophone, TbMoon,
  TbPlayerTrackPrev, TbPlayerSkipForward, TbPlayerTrackNext,
  TbVolume3, TbVolume2, TbVolume, TbWorld, TbChevronUp, TbCommand,
  TbCaretUpFilled, TbCaretLeftFilled, TbCaretDownFilled, TbCaretRightFilled,
} from 'react-icons/tb'
import './MacbookScroll.css'

/* Porte do MacbookScroll do Aceternity UI (ui.aceternity.com) para JSX + CSS próprio:
   o original é TSX com Tailwind, e aqui o Tailwind não está ativo. A geometria, as
   faixas de scroll e os valores das transformações são os mesmos do original. */

const ICON = { className: 'mbs-ico' }

export default function MacbookScroll({ src, alt = '', title, badge, children, showGradient = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => { if (window.innerWidth < 768) setIsMobile(true) }, [])

  /* o chassi aqui é bem maior que os 32rem do original, então a tela cresce menos
     no fim: 1.5x estouraria a largura da janela em telas de 1366px */
  const zoom = isMobile ? 1 : 1.3
  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, zoom])
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, zoom])
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500])
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0])
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  /* o wrapper recorta: no fim da animação a tela viaja 1500px para baixo e, sem o
     corte, passaria por cima da seção seguinte (o demo original faz o mesmo) */
  return <div className="mbs-wrap"><div className="mbs" ref={ref}>
    <Motion.h2 className="mbs-title" style={{ translateY: textTransform, opacity: textOpacity }}>
      {title}
    </Motion.h2>

    <Lid scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} src={src} alt={alt}>
      {children}
    </Lid>

    {/* base: barra acima do teclado, alto-falantes, teclado e trackpad */}
    <div className="mbs-base">
      <div className="mbs-topbar"><i /></div>
      <div className="mbs-deckrow">
        <div className="mbs-speakercol"><SpeakerGrid /></div>
        <div className="mbs-keypadcol"><Keypad /></div>
        <div className="mbs-speakercol"><SpeakerGrid /></div>
      </div>
      <div className="mbs-trackpad" />
      <div className="mbs-foot" />
      {showGradient && <div className="mbs-fade" />}
      {badge && <div className="mbs-badge">{badge}</div>}
    </div>
  </div></div>
}

/* a tela aceita conteúdo vivo (children) ou um screenshot (src) */
function Lid({ scaleX, scaleY, rotate, translate, src, alt, children }) {
  return <div className="mbs-lid">
    <div className="mbs-lidback">
      <div className="mbs-lidlogo"><span>MS</span></div>
    </div>
    <Motion.div
      className="mbs-screen"
      style={{ scaleX, scaleY, rotateX: rotate, translateY: translate, transformStyle: 'preserve-3d', transformOrigin: 'top' }}
    >
      <div className="mbs-screenbg" />
      {children
        ? <div className="mbs-screenui">{children}</div>
        : src && <img src={src} alt={alt} />}
    </Motion.div>
  </div>
}

function SpeakerGrid() {
  return <div className="mbs-speaker" />
}

/* backlit: o brilho branco por trás da tecla, ligado no original */
function KBtn({ children, className = '', childrenClassName = '', backlit = true, style }) {
  return <div className={'mbs-kbtn' + (backlit ? ' lit' : '')}>
    <div className={'mbs-kface ' + className} style={style}>
      <div className={'mbs-klabel ' + childrenClassName}>{children}</div>
    </div>
  </div>
}

/* tecla de duas linhas (símbolo em cima, caractere embaixo) */
function K2({ top, bottom }) {
  return <KBtn><span>{top}</span><span>{bottom}</span></KBtn>
}

/* tecla da fileira de função: ícone + rótulo Fn */
function KFn({ icon, label }) {
  const Icon = icon
  return <KBtn><Icon {...ICON} /><span className="mbs-fnlabel">{label}</span></KBtn>
}

/* tecla larga do rodapé: rótulo em cima, ícone embaixo (ou o contrário) */
function KMod({ top, bottom, wide }) {
  return <KBtn className={wide ? 'mbs-w-8' : ''} childrenClassName="mbs-kcol">
    <div className="mbs-kline">{top}</div>
    <div className="mbs-kline start">{bottom}</div>
  </KBtn>
}

function Keypad() {
  return <div className="mbs-keypad">
    {/* fileira 1 */}
    <div className="mbs-krow">
      <KBtn className="mbs-w-10 mbs-pl" childrenClassName="mbs-start">esc</KBtn>
      <KFn icon={TbBrightnessDown} label="F1" />
      <KFn icon={TbBrightnessUp} label="F2" />
      <KFn icon={TbTable} label="F3" />
      <KFn icon={TbSearch} label="F4" />
      <KFn icon={TbMicrophone} label="F5" />
      <KFn icon={TbMoon} label="F6" />
      <KFn icon={TbPlayerTrackPrev} label="F7" />
      <KFn icon={TbPlayerSkipForward} label="F8" />
      <KFn icon={TbPlayerTrackNext} label="F9" />
      <KFn icon={TbVolume3} label="F10" />
      <KFn icon={TbVolume2} label="F11" />
      <KFn icon={TbVolume} label="F12" />
      <KBtn><div className="mbs-power"><div /></div></KBtn>
    </div>

    {/* fileira 2 */}
    <div className="mbs-krow">
      <K2 top="~" bottom="`" />
      <K2 top="!" bottom="1" />
      <K2 top="@" bottom="2" />
      <K2 top="#" bottom="3" />
      <K2 top="$" bottom="4" />
      <K2 top="%" bottom="5" />
      <K2 top="^" bottom="6" />
      <K2 top="&" bottom="7" />
      <K2 top="*" bottom="8" />
      <K2 top="(" bottom="9" />
      <K2 top=")" bottom="0" />
      <K2 top="—" bottom="_" />
      <K2 top="+" bottom="=" />
      <KBtn className="mbs-w-10 mbs-pr" childrenClassName="mbs-end">delete</KBtn>
    </div>

    {/* fileira 3 */}
    <div className="mbs-krow">
      <KBtn className="mbs-w-10 mbs-pl" childrenClassName="mbs-start">tab</KBtn>
      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(c => <KBtn key={c}><span>{c}</span></KBtn>)}
      <K2 top="{" bottom="[" />
      <K2 top="}" bottom="]" />
      <K2 top="|" bottom="\" />
    </div>

    {/* fileira 4 */}
    <div className="mbs-krow">
      <KBtn className="mbs-w-caps mbs-pl" childrenClassName="mbs-start">caps lock</KBtn>
      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(c => <KBtn key={c}><span>{c}</span></KBtn>)}
      <K2 top=":" bottom=";" />
      <K2 top={'"'} bottom="'" />
      <KBtn className="mbs-w-return mbs-pr" childrenClassName="mbs-end">return</KBtn>
    </div>

    {/* fileira 5 */}
    <div className="mbs-krow">
      <KBtn className="mbs-w-shift mbs-pl" childrenClassName="mbs-start">shift</KBtn>
      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(c => <KBtn key={c}><span>{c}</span></KBtn>)}
      <K2 top="<" bottom="," />
      <K2 top=">" bottom="." />
      <K2 top="?" bottom="/" />
      <KBtn className="mbs-w-shift mbs-pr" childrenClassName="mbs-end">shift</KBtn>
    </div>

    {/* fileira 6 */}
    <div className="mbs-krow">
      <KMod top={<span>fn</span>} bottom={<TbWorld {...ICON} />} />
      <KMod top={<TbChevronUp {...ICON} />} bottom={<span>control</span>} />
      <KMod top={<OptionKey />} bottom={<span>option</span>} />
      <KMod top={<TbCommand {...ICON} />} bottom={<span>command</span>} wide />
      <KBtn className="mbs-w-space" />
      <KMod top={<TbCommand {...ICON} />} bottom={<span>command</span>} wide />
      <KMod top={<OptionKey />} bottom={<span>option</span>} />
      <div className="mbs-arrows">
        <KBtn className="mbs-arrow"><TbCaretUpFilled {...ICON} /></KBtn>
        <div className="mbs-arrowrow">
          <KBtn className="mbs-arrow"><TbCaretLeftFilled {...ICON} /></KBtn>
          <KBtn className="mbs-arrow"><TbCaretDownFilled {...ICON} /></KBtn>
          <KBtn className="mbs-arrow"><TbCaretRightFilled {...ICON} /></KBtn>
        </div>
      </div>
    </div>
  </div>
}

function OptionKey() {
  return <svg className="mbs-ico" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect stroke="currentColor" strokeWidth="2" x="18" y="5" width="10" height="2" />
    <polygon stroke="currentColor" strokeWidth="2" points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
  </svg>
}
