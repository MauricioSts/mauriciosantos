import { Children, cloneElement, isValidElement, useMemo } from 'react'
import HoverPreview from './HoverPreview'
import { TECH_RE, techFor } from '../data/tech'

/* Varre o texto de uma árvore de elementos e transforma todo nome de
   ferramenta conhecido em alvo de hover com o logo dela. Fica em um wrapper e
   não em cada string do site para o nome novo entrar só no catálogo: quem
   escreve "Django" em qualquer seção já ganha o preview. */

const ICON_SIZE = 96

function targetsFor(text) {
  const targets = []
  let content = ''
  let last = 0
  /* matchAll cria o próprio lastIndex, então a regex global compartilhada
     não guarda estado entre as chamadas. */
  for (const m of text.matchAll(TECH_RE)) {
    const tech = techFor(m[0])
    if (!tech) continue
    content += text.slice(last, m.index) + `{${targets.length}}`
    targets.push({ text: m[0], color: tech.color, icon: <tech.Icon />, altText: m[0] })
    last = m.index + m[0].length
  }
  if (!targets.length) return null
  content += text.slice(last)
  return { content, targets }
}

function scan(node) {
  if (typeof node === 'string') {
    /* Uma chave solta no texto viraria marcador do HoverPreview e sumiria. */
    if (node.includes('{')) return node
    const found = targetsFor(node)
    if (!found) return node
    return (
      <HoverPreview
        content={found.content}
        targets={found.targets}
        imageWidth={ICON_SIZE}
        imageHeight={ICON_SIZE}
        imageBorderRadius="20px"
        maxRotation={14}
        maxOffset={12}
      />
    )
  }
  if (Array.isArray(node)) return Children.map(node, scan)
  if (!isValidElement(node)) return node

  const kids = node.props.children
  /* innerHTML e render prop não têm filhos para percorrer. */
  if (kids == null || typeof kids === 'function' || node.props.dangerouslySetInnerHTML) return node
  return cloneElement(node, undefined, scan(kids))
}

export default function TechScan({ children }) {
  const scanned = useMemo(() => scan(children), [children])
  return <>{scanned}</>
}
