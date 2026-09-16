import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from 'react'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import TechScan from './components/TechScan'
import ModalCard from './components/ModalCards'
import Device from './components/Device'
import MacbookScroll from './components/MacbookScroll'

const MAIL = 'contatomauriciosts@gmail.com'
const LINKS = {
  github: 'https://github.com/MauricioSts',
  linkedin: 'https://linkedin.com/in/mauriciosts',
  store: 'https://jerseyandbits.vercel.app/',
}

/* No celular a barra de URL some/aparece durante o scroll e muda innerHeight a cada
   frame, o que fazia o notebook "pular". Congelamos a altura em telas de toque e só
   remedimos quando a largura muda (rotação / redimensionamento real). */
const COARSE = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches
let vpW = typeof window !== 'undefined' ? window.innerWidth : 1280
let vpH = typeof window !== 'undefined' ? window.innerHeight : 800
function viewport() {
  if (window.innerWidth !== vpW || !COARSE) { vpW = window.innerWidth; vpH = window.innerHeight }
  return { w: vpW, h: vpH }
}
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches

/* ---------------- dados (conteúdo real do repo) ---------------- */
function useProjects() {
  const t = useTranslation()
  const p = t.projects
  return useMemo(() => [
    {
      id: 'patchmap', num: '01', name: 'PatchMap', year: '2026',
      images: ['/patchmap02.png'],
      tags: ['React Native', 'Expo', 'TypeScript', 'Django', 'PostgreSQL'],
      href: 'https://patchmap.mauriciosts.com/',
      accent: 'linear-gradient(150deg,#04162c,#1f6fd0)', ...p.patchMap,
    },
    {
      id: 'cadsol', num: '02', name: 'CADSOL-RN', year: '2026',
      images: ['/cadsol.png'],
      tags: ['React.js', 'TypeScript', 'Clean Architecture', 'GitHub Actions'],
      href: 'https://cadsol.sethas.rn.gov.br/',
      accent: 'linear-gradient(150deg,#04222c,#0891b2)', ...p.cadsol,
    },
    {
      id: 'bridgeandbits', num: '03', name: 'BridgeAndBits', year: '2025',
      images: ['/bridge.png'], tags: ['React.js', 'PostgreSQL', 'Tailwind CSS'],
      href: 'https://bridgeandbits.mauriciosts.com/',
      accent: 'linear-gradient(150deg,#0b2545,#1c5b9c)', ...p.bridgeAndBits,
    },
    {
      /* rainbow: o único jogo da lista. Colore só o rótulo do tipo, que é onde
         está escrito o que ele é; o título fica igual ao dos outros projetos. */
      id: 'comidas-da-copa', num: '04', name: 'Comidas da Copa', year: '2026',
      images: ['/comidas-da-copa-2.png', '/comidas-da-copa-3.png'],
      tags: ['Next.js 16', 'Supabase', 'Realtime', 'TypeScript'],
      href: 'https://cupfoods.mauriciosts.com/',
      accent: 'linear-gradient(150deg,#3b2c0c,#9a7724)', rainbow: true, ...p.comidasDaCopa,
    },
    {
      id: 'jerseyandbits', num: '05', name: 'JerseyAndBits', year: '2025',
      images: ['/jersey.jpeg'], tags: ['React.js', 'Firebase', 'Tailwind CSS'],
      href: 'https://jerseyandbits.vercel.app/',
      accent: 'linear-gradient(150deg,#06312a,#0f7a63)', ...p.jerseyAndBits,
    },
    {
      id: 'salviano-burguer', num: '06', name: 'Salviano Burguer', year: '2024',
      images: ['/salvianoburguer.png'], tags: ['JavaScript', 'Tailwind CSS', 'WhatsApp API'],
      href: 'https://salvianoburguer.vercel.app/',
      accent: 'linear-gradient(150deg,#3d1410,#8a3a2c)', ...p.salvianoBurguer,
    },
    {
      id: 'chovinista', num: '07', name: 'Chovinista', year: '2024',
      images: ['/chovinista.jpeg'], tags: ['React.js', 'Tailwind CSS'],
      href: null,
      accent: 'linear-gradient(150deg,#241a3d,#5b3f8f)', ...p.chovinista,
    },
  ], [p])
}

function useExperiences() {
  const t = useTranslation()
  const { language } = useLanguage()
  const e = t.experience, k = e.kinds
  const now = language === 'pt' ? '2025 até hoje' : '2025 to present'
  return useMemo(() => [
    { when: now, kind: k.internship, org: 'SETHAS', tags: ['React Native', 'TypeScript', 'Django'], ...e.sethas },
    { when: '2025', kind: k.scholarship, org: 'IFRN', tags: ['Flutter', 'Dart'], ...e.ifrnFlutter },
    { when: '2025', kind: k.freelance, org: 'Inspire Logic', tags: ['React.js', 'PostgreSQL'], ...e.inspireLogic },
    { when: '2024', kind: k.scholarship, org: 'IFRN', tags: ['Unity', 'C#', 'AR', 'VR'], ...e.ifrnAR },
    {
      when: '2023', kind: k.internship,
      org: language === 'pt' ? 'Secretaria de Infraestrutura do RN' : 'Infrastructure Department of RN',
      tags: [language === 'pt' ? 'Suporte de TI' : 'IT Support'], ...e.secretaria,
    },
  ], [e, k, now, language])
}

/* Apps que só existem no celular. PLP e SSK ficam fora da lista de projetos
   de propósito: abrem o mesmo modal de detalhe, mas não entram no carrossel
   nem na navegação anterior/próximo dele. O PatchMap aponta para o índice da
   lista, então continua sendo o mesmo projeto em todo lugar. */
function useMobileApps() {
  const projects = useProjects()
  const t = useTranslation()
  const p = t.projects
  const m = t.mobile
  return useMemo(() => {
    const patchmap = projects.findIndex(x => x.id === 'patchmap')
    return [
      {
        id: 'plp', name: 'Programa Leite Potiguar', tag: m.maintained,
        image: '/plp-login.jpg',
        target: {
          id: 'plp', num: '07', name: 'Programa Leite Potiguar', year: '2026',
          images: ['/plp-login.jpg'], portrait: true,
          tags: ['React Native', 'TypeScript'],
          href: 'https://play.google.com/store/apps/details?id=com.colaborador_pontt',
          accent: 'linear-gradient(150deg,#111a45,#c2447c)', ...p.plp,
        },
      },
      {
        id: 'patchmap', name: 'PatchMap', tag: m.built,
        image: '/patchmap-app.png', target: patchmap,
      },
      {
        id: 'ssk', name: 'SSK', tag: m.building,
        image: '/ssk-1.png',
        target: {
          id: 'ssk', num: '08', name: 'SSK', year: '2026',
          /* 1 é o login, que também vai no aparelho do leque; o resto é a
             galeria do detalhe, na ordem em que o app é usado. */
          images: ['/ssk-1.png', '/ssk-2.png', '/ssk-3.png', '/ssk-4.png', '/ssk-5.png', '/ssk-6.png', '/ssk-7.png', '/ssk-8.png'],
          portrait: true,
          tags: ['React Native', 'TypeScript'],
          accent: 'linear-gradient(150deg,#06211c,#1f9d78)', ...p.ssk,
        },
      },
    ]
  }, [projects, p, m])
}

/* Só framework, linguagem e plataforma. HTML, CSS, Tailwind, Vite, Expo e GitHub
   saíram: são pressupostos de qualquer front-end, e listá-los dilui o que pesa. */
function useStacks() {
  const g = useTranslation().stack.groups
  return useMemo(() => ({
    [g.web]: [['React', '⚛'], ['TypeScript', 'TS'], ['JavaScript', 'JS']],
    [g.mobile]: [['React Native', '⚛'], ['Flutter', '◇'], ['Dart', '◑']],
    [g.backend]: [['Node.js', '⬡'], ['Django', 'dj'], ['Docker', '⛴'], ['Git', 'G'], ['Vercel', '▲']],
    [g.database]: [['PostgreSQL', 'P'], ['Firebase', 'F'], ['Supabase', 'S']],
  }), [g])
}

/* Stacks principais. Antes isto era contado automaticamente pelas tags dos projetos,
   e a contagem bruta media a coisa errada: Tailwind aparecia em 4 dos 6 repositórios
   e liderava, enquanto React Native e Django — que sustentam o trabalho do dia a dia
   no estágio — mal pontuavam. A lista é curada; o peso é o quanto cada uma carrega
   hoje, e o rótulo diz onde ela é usada de verdade. */
function useCoreStack() {
  const c = useTranslation().stack.core
  return useMemo(() => [
    { k: 'React.js', w: 100, where: c.react },
    { k: 'React Native', w: 88, where: c.reactNative },
    { k: 'Django', w: 76, where: c.django },
    { k: 'TypeScript', w: 70, where: c.typescript },
    { k: 'PostgreSQL', w: 58, where: c.postgres },
  ], [c])
}

/* ---------------- reveal ---------------- */
const EASE = 'cubic-bezier(.22,.61,.36,1)'
const TRANS = `opacity .9s ${EASE}, transform .9s ${EASE}`
function Reveal({ as = 'div', className = '', style, delay = 0, y = 26, children, ...rest }) {
  const ref = useRef(null)
  const [st, setSt] = useState('show')
  // nasce visível: só esconde o que entrou abaixo da dobra
  useLayoutEffect(() => {
    const el = ref.current
    if (el && el.getBoundingClientRect().top > viewport().h * 0.9) setSt('pre')
  }, [])
  useEffect(() => {
    if (st !== 'pre') return
    const check = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < viewport().h * 0.9 && r.bottom > -40) { setSt('in'); off() }
    }
    const off = () => { removeEventListener('scroll', check); removeEventListener('resize', check); clearTimeout(tm) }
    addEventListener('scroll', check, { passive: true }); addEventListener('resize', check)
    const tm = setTimeout(() => { setSt('in'); off() }, 2600) // rede de segurança: nada fica em branco
    check()
    return off
  }, [st])
  const hidden = st === 'pre'
  const Tag = as
  return <Tag ref={ref} className={className} {...rest}
    style={{ ...style, opacity: hidden ? 0 : 1, transform: hidden ? `translateY(${y}px)` : 'none', transition: TRANS, transitionDelay: (hidden ? 0 : delay) + 'ms' }}>
    {children}
  </Tag>
}

/* Parallax: o elemento anda em sentido contrário à rolagem, numa fração da
   distância percorrida, e o CSS lê o deslocamento em --py. Escrever uma variável
   (e não o transform inteiro) deixa a regra livre para compor com escala. */
function useParallax(rate = 0.18, max = 140) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    let raf = null
    const frame = () => {
      raf = null
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > viewport().h + 200) return // fora de vista, não gasta quadro
      const mid = r.top + r.height / 2 - viewport().h / 2
      /* inteiro: meio pixel de deslocamento borraria o texto no antialiasing */
      const py = Math.round(Math.max(-max, Math.min(max, -mid * rate)))
      el.style.setProperty('--py', py + 'px')
    }
    const on = () => { if (raf == null) raf = requestAnimationFrame(frame) }
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    frame()
    return () => {
      removeEventListener('scroll', on); removeEventListener('resize', on)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [rate, max])
  return ref
}

function useInView(threshold = 0.85) {
  const ref = useRef(null); const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (seen) return
    const check = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < viewport().h * threshold && r.bottom > 0) { setSeen(true); removeEventListener('scroll', check) }
    }
    addEventListener('scroll', check, { passive: true }); check()
    const tm = setTimeout(check, 400)
    return () => { removeEventListener('scroll', check); clearTimeout(tm) }
  }, [seen, threshold])
  return [ref, seen]
}

/* ---------------- mockup com screenshot real ---------------- */
function Shot({ src, alt, eager = false }) {
  return <div className="mini">
    <div className="dts"><i></i><i></i><i></i></div>
    <div className="shot"><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" /></div>
  </div>
}

/* ---------------- tela do MacBook ---------------- */
/* Fundo da célula do retrato: aparece enquanto o JPEG não chegou, para não piscar um
   retângulo vazio no meio da abertura da tampa. Vetorial, então acompanha o --u. */
function Portrait() {
  return <svg className="avsvg" viewBox="0 0 120 150" preserveAspectRatio="xMidYMid slice"
    aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="pf-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#16283c" /><stop offset="1" stopColor="#0a0f16" />
      </linearGradient>
      <linearGradient id="pf-fg" x1=".2" y1="0" x2=".8" y2="1">
        <stop offset="0" stopColor="#5ac8fa" /><stop offset="1" stopColor="#2997ff" />
      </linearGradient>
    </defs>
    <rect width="120" height="150" fill="url(#pf-bg)" />
    <g fill="none" stroke="#2997ff" strokeOpacity=".18">
      <circle cx="60" cy="66" r="52" /><circle cx="60" cy="66" r="40" /><circle cx="60" cy="66" r="28" />
    </g>
    <path d="M60 108c-23 0-42 17-45 40v2h90v-2c-3-23-22-40-45-40z" fill="url(#pf-fg)" />
    <circle cx="60" cy="62" r="27" fill="url(#pf-fg)" />
  </svg>
}

function MacScreen() {
  const t = useTranslation()
  return <div className="osx">
    <div className="tb"><i></i><i></i><i></i><span className="url">{t.hero.url}</span></div>
    <div className="cols">
      <div className="side">
        <div className="av"><b>MS</b> Mauricio</div>
        <div className="nv">{t.nav.projects}</div>
        <div className="nv on">{t.hero.aboutNav}</div>
        <div className="nv">{t.nav.stack}</div>
        <div className="nv">{t.nav.experience}</div>
        <div className="nv">{t.nav.contact}</div>
      </div>
      <div className="body">
        <div className="prof">
          {/* 750x1334 aguenta o mergulho: na tela cheia a célula pede ~710x1300 reais,
              então a foto é reduzida, nunca ampliada */}
          <div className="ph"><Portrait /><img src="/profile.jpeg" alt="Mauricio Santos" decoding="async" /></div>
          <div className="bio">
            <div className="h">{t.hero.aboutTitle}</div>
            <p dangerouslySetInnerHTML={{ __html: t.hero.aboutP1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.hero.aboutP2 }} />
          </div>
        </div>
        <div className="sts">
          <div className="st"><b>7</b>{t.hero.stats.projects}</div>
          <div className="st"><b>2+</b>{t.hero.stats.years}</div>
          <div className="st"><b>2</b>{t.hero.stats.degrees}</div>
        </div>
      </div>
    </div>
  </div>
}

/* ---------------- header ---------------- */
function Nav({ active, go }) {
  const t = useTranslation()
  const { language, toggleLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const items = [[t.nav.overview, 'home'], [t.nav.projects, 'projetos'], [t.nav.stack, 'stack'], [t.nav.experience, 'experiencia']]
  useEffect(() => {
    if (!open) return
    const k = (ev) => { if (ev.key === 'Escape') setOpen(false) }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [open])
  const jump = (id) => { setOpen(false); go(id) }
  return <>
    <div className="lnav">
      <div className="lnav-in">
        <button className="name" onClick={() => jump('home')}>Mauricio Santos</button>
        <div className="right">
          {items.map(([lbl, id]) => (
            <button key={id} className={'lk' + (active === id ? ' on' : '')} onClick={() => jump(id)}>{lbl}</button>
          ))}
          <button className="lang" onClick={toggleLanguage} aria-label="Trocar idioma">{language === 'pt' ? 'EN' : 'PT'}</button>
          <button className="pill" onClick={() => jump('contato')}>{t.nav.contact}</button>
          <button className={'burger' + (open ? ' x' : '')} onClick={() => setOpen(o => !o)}
            aria-expanded={open} aria-label={open ? t.nav.close : t.nav.menu}><i></i><i></i></button>
        </div>
      </div>
    </div>
    <div className={'sheet' + (open ? ' on' : '')} onClick={() => setOpen(false)}>
      <nav onClick={(e) => e.stopPropagation()}>
        {items.map(([lbl, id]) => (
          <button key={id} className={active === id ? 'on' : ''} onClick={() => jump(id)}>{lbl}</button>
        ))}
        <button onClick={() => jump('contato')}>{t.nav.contact}</button>
      </nav>
    </div>
  </>
}

/* ---------------- hero + notebook ---------------- */
function Hero({ go }) {
  const t = useTranslation()
  const cue = useRef(null)
  const intro = useParallax(0.22, 180)   // o bloco de abertura sobe mais devagar que a página
  const photo = useParallax(0.1, 60)     // a foto do "sobre" desliza dentro da moldura

  /* o convite de rolagem some assim que a página sai do topo, para não competir
     com o notebook que abre logo abaixo */
  useEffect(() => {
    const on = () => { if (cue.current) cue.current.style.opacity = Math.max(0, 1 - scrollY / 200) }
    addEventListener('scroll', on, { passive: true }); on()
    return () => removeEventListener('scroll', on)
  }, [])

  return <section id="home" className="hero">
    <div className="wrap hero-in" ref={intro}>
      <Reveal className="kick" y={14}>{t.hero.kick}</Reveal>
      <Reveal as="h1" delay={60} y={18}>Mauricio Santos</Reveal>
      <Reveal className="sub" delay={130} y={18}><b>{t.hero.role}</b></Reveal>
      <Reveal className="cta" delay={200} y={14}>
        <button className="btn" onClick={() => go('projetos')}>{t.hero.ctaProjects}</button>
        <a className="alink" href="#contato" onClick={(ev) => { ev.preventDefault(); go('contato') }}>
          {t.hero.ctaTalk}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6" /></svg>
        </a>
      </Reveal>
      {/* convite para rolar até o notebook; o JS apaga assim que a rolagem começa */}
      <div className="scrollcue" ref={cue}>
        <span>{t.hero.scrollCue}</span>
        <i></i>
      </div>
    </div>

    <MacbookScroll title={t.hero.scrollHint}><MacScreen /></MacbookScroll>

    {/* fallback do "sobre" no celular, onde a tela do notebook fica pequena demais */}
    <div className="mbio">
      <div className="mphoto"><img src="/profile.jpeg" alt="Mauricio Santos" ref={photo} /></div>
      <h3>{t.hero.aboutTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.hero.aboutP1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.hero.aboutP2 }} />
      <div className="sb2">
        <div><b>7</b><span>{t.hero.stats.projects}</span></div>
        <div><b>2+</b><span>{t.hero.stats.years}</span></div>
        <div><b>2</b><span>{t.hero.stats.degrees}</span></div>
      </div>
    </div>

    <div className="wrap hero-foot"><p className="foot">{t.hero.footNote}</p></div>
  </section>
}

/* ---------------- último lançamento ---------------- */
function Latest({ open }) {
  const t = useTranslation()
  const projects = useProjects()
  const i = projects.findIndex(p => p.id === 'patchmap')
  const p = projects[i]
  const [ref, seen] = useInView(0.95) // só baixa o vídeo de quem chegou perto dele
  const vid = useRef(null)

  useEffect(() => {
    if (!seen || reduced()) return
    const v = vid.current; if (!v) return
    v.muted = true // o Safari só aceita autoplay com a propriedade setada, não só o atributo
    v.play().catch(() => { }) // se o navegador recusar, fica o poster
  }, [seen])

  if (!p) return null
  return <TechScan><section id="ultimo" className="latest" ref={ref}>
    <div className="wrap">
      <Reveal className="chapter" y={14}>{t.latest.chapter}</Reveal>
      <Reveal as="h2" className="big" delay={50}>{t.latest.title}<span className="dim">{t.latest.dim}</span></Reveal>
      <Reveal className="lede" delay={110}>{p.head}</Reveal>
    </div>
    <Reveal className="lvwrap" delay={80}>
      <button className="lvideo" style={{ background: p.accent }} onClick={() => open(i)}
        aria-label={`${t.latest.cta}: ${p.name}`}>
        <span className="lframe">
          {seen
            ? <video ref={vid} src="/patchmap-demo.mp4" poster="/patchmap-demo-poster.jpg"
              muted loop playsInline preload="metadata" tabIndex={-1} aria-hidden="true" />
            : <img src="/patchmap-demo-poster.jpg" alt="" />}
        </span>
        <span className="lbar">
          <span className="lmeta"><b>{p.name}</b><i>{p.num} · {p.type} · {p.year}</i></span>
          <span className="lcta">{t.latest.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6" /></svg>
          </span>
        </span>
      </button>
    </Reveal>
  </section></TechScan>
}

/* ---------------- projetos ---------------- */
function Highlights({ open }) {
  const t = useTranslation()
  const projects = useProjects()
  const rail = useRef(null)
  const [pos, setPos] = useState({ s: false, e: true })
  const upd = useCallback(() => {
    const el = rail.current; if (!el) return
    setPos({ s: el.scrollLeft > 8, e: el.scrollLeft < el.scrollWidth - el.clientWidth - 8 })
  }, [])
  useEffect(() => {
    const el = rail.current; if (!el) return
    el.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd)
    const tm = setTimeout(upd, 300)
    return () => { el.removeEventListener('scroll', upd); removeEventListener('resize', upd); clearTimeout(tm) }
  }, [upd])
  const nudge = (d) => {
    const el = rail.current; if (!el) return
    const card = el.querySelector('.hcard')
    el.scrollBy({ left: d * ((card?.offsetWidth || 320) + 20), behavior: 'smooth' })
  }
  return <TechScan><section id="projetos" className="projsec">
    <div className="gal-head">
      <Reveal as="h2" y={18}>{t.portfolio.title}</Reveal>
      <Reveal className="arrows" delay={80} y={0}>
        <button onClick={() => nudge(-1)} disabled={!pos.s} aria-label={t.portfolio.prev}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button onClick={() => nudge(1)} disabled={!pos.e} aria-label={t.portfolio.next}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </Reveal>
    </div>
    <div className="rail" ref={rail}>
      {projects.map((p, i) => (
        <Reveal as="article" key={p.id} className="hcard" delay={Math.min(i, 3) * 70}>
          <button className="hopen" onClick={() => open(i)} aria-label={p.name}>
            <div className="top">
              <div className="n">{p.num} · <span className={p.rainbow ? 'rainbow' : undefined}>{p.type.toUpperCase()}</span></div>
              <h3>{p.head}</h3>
              <p className="d">{p.description}</p>
            </div>
            <div className="art" style={{ background: p.accent }}>
              <Shot src={p.images[0]} alt={p.name} eager={i < 2} />
              <span className="plus">+</span>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  </section></TechScan>
}

/* ---------------- apps mobile ---------------- */
const FAN = ['l', 'c', 'r']

function MobileApps({ open }) {
  const t = useTranslation()
  const apps = useMobileApps()
  return <TechScan><section id="mobile" className="mobsec">
    <div className="wrap">
      <Reveal className="chapter" y={14}>{t.mobile.chapter}</Reveal>
      <Reveal as="h2" className="big" delay={50}>{t.mobile.title}<span className="dim">{t.mobile.dim}</span></Reveal>
      <Reveal className="lede" delay={110}>{t.mobile.lede}</Reveal>
    </div>
    <Reveal className="fanwrap" delay={80} y={34}>
      <div className="fanout">
        {apps.map((a, i) => (
          <button key={a.id} className={'fanit ' + FAN[i]} onClick={() => open(a.target)}
            aria-label={`${t.mobile.open}: ${a.name}`}>
            <Device image={a.image} alt={a.name} scale={i === 1 ? 1 : 0.86} parallaxStrength={10} rotateStrength={4} />
            <span className="fanlbl"><b>{a.name}</b><i>{a.tag}</i></span>
          </button>
        ))}
      </div>
    </Reveal>
  </section></TechScan>
}

/* ---------------- stack ---------------- */
function Bars() {
  const core = useCoreStack()
  const [ref, seen] = useInView(0.88)
  const max = Math.max(...core.map(u => u.w))
  return <div className="bars" ref={ref}>
    {core.map(u => (
      <div className="bar" key={u.k}>
        <div className="bl"><span>{u.k}</span><span>{u.where}</span></div>
        <div className="track"><div className="fill" style={{ width: seen ? (u.w / max * 100) + '%' : 0 }}></div></div>
      </div>
    ))}
  </div>
}

function Stack() {
  const t = useTranslation()
  const stacks = useStacks()
  const keys = Object.keys(stacks)
  const [tab, setTab] = useState(0)
  const firstKey = keys[0]
  useEffect(() => { setTab(0) }, [firstKey]) // troca de idioma reordena as abas
  return <TechScan><section id="stack">
    <div className="wrap">
      <Reveal className="chapter" y={14}>{t.stack.chapter}</Reveal>
      <Reveal as="h2" className="big" delay={50}>{t.stack.title}<span className="dim">{t.stack.dim}</span></Reveal>
      <Reveal className="lede" delay={110}>{t.stack.lede}</Reveal>
      <Reveal delay={80} style={{ marginTop: 56 }}>
        <div className="segwrap">
          <div className="seg" role="tablist">
            {keys.map((k, i) => (
              <button key={k} role="tab" aria-selected={i === tab} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{k}</button>
            ))}
          </div>
        </div>
        <div className="chips">
          {(stacks[keys[tab]] || []).map(([nm, ic]) => <div className="chip" key={nm}><i>{ic}</i> {nm}</div>)}
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className="subhead" style={{ marginTop: 96 }}>{t.stack.usageTitle}</div>
        <Bars />
        <p className="foot">{t.stack.usageNote}</p>
      </Reveal>
    </div>
  </section></TechScan>
}

/* ---------------- experiência ---------------- */
function Experience() {
  const t = useTranslation()
  const experiences = useExperiences()
  const edu = [t.education.ifrn, t.education.estacio]
  const [open, setOpen] = useState(0)
  const [seen, setSeen] = useState(-1)
  const wrapRef = useRef(null), fillRef = useRef(null), itemRefs = useRef([])
  useEffect(() => {
    let raf = null
    const frame = () => {
      raf = null
      const w = wrapRef.current; if (!w) return
      const vh = viewport().h
      const r = w.getBoundingClientRect()
      if (fillRef.current) fillRef.current.style.height = Math.max(0, Math.min(r.height, vh * 0.6 - r.top)) + 'px'
      let last = -1
      itemRefs.current.forEach((el, i) => { if (el && el.getBoundingClientRect().top < vh * 0.72) last = i })
      setSeen(s => (last > s ? last : s)) // os pontos acendem e não apagam mais
    }
    const on = () => { if (raf == null) raf = requestAnimationFrame(frame) }
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); on()
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); if (raf != null) cancelAnimationFrame(raf) }
  }, [])
  return <TechScan><section id="experiencia">
    <div className="wrap">
      <Reveal className="chapter" y={14}>{t.experience.chapter}</Reveal>
      <Reveal as="h2" className="big" delay={50}>{t.experience.title}<span className="dim">{t.experience.dim}</span></Reveal>
      <Reveal className="lede" delay={110}>{t.experience.lede}</Reveal>
      <div className="exp" ref={wrapRef}>
        <div className="vrail"><i ref={fillRef}></i></div>
        {experiences.map((e, i) => (
          <div className={'xit' + (open === i ? ' open' : '') + (seen >= i ? ' seen' : '')} key={e.org + i}
            ref={(el) => { itemRefs.current[i] = el }}>
            <div className="xdot"></div>
            <button className="xhead" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <div className="xwhen">{e.when}</div>
              <div className="xmid">
                <div className="xrole">{e.role}</div>
                <div className="xorg">{e.org}</div>
                {e.place && <div className="xplace">{e.place}</div>}
              </div>
              <div className="xright">
                <span className="kindpill">{e.kind}</span>
                <span className="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg></span>
              </div>
            </button>
            <div className="xdrop">
              <div className="xinner">
                <div className="xin">
                  <div>
                    <p className="xsum">{e.sum}</p>
                    <ul className="xb">{e.responsibilities.map(b => <li key={b}>{b}</li>)}</ul>
                    <div className="xtags">{e.tags.map(tg => <span className="xtag" key={tg}>{tg}</span>)}</div>
                  </div>
                  <div className="xmetric"><b>{e.tags[0]}</b><span>{t.experience.mainStack}</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Reveal className="subhead">{t.experience.eduTitle}</Reveal>
      <div className="edu">
        {edu.map((d, i) => (
          <Reveal className="educard" key={d.course} delay={i * 70}>
            <div className="st">{d.status}</div>
            <div className="c">{d.course}</div>
            <div className="s">{d.school}</div>
            <div className="w">{d.when}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section></TechScan>
}

/* ---------------- contato ---------------- */
const ICONS = {
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4z" /></svg>,
  store: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 13h6" /></svg>,
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>,
}

function Contact() {
  const t = useTranslation()
  const [copied, setCopied] = useState(false)
  useEffect(() => { if (!copied) return; const tm = setTimeout(() => setCopied(false), 1800); return () => clearTimeout(tm) }, [copied])
  const copy = async () => {
    try { await navigator.clipboard?.writeText(MAIL); setCopied(true) } catch { location.href = 'mailto:' + MAIL }
  }
  return <section id="contato" className="cta-sec">
    <div className="wrap">
      <Reveal className="chapter" y={14}>{t.contact.chapter}</Reveal>
      <Reveal as="h2" className="big" delay={50}>{t.contact.title}<span className="dim">{t.contact.dim}</span></Reveal>
      <Reveal className="lede" delay={110}>{t.contact.lede}</Reveal>
      <Reveal className="crow" delay={170}>
        <a className="btn" href={'mailto:' + MAIL}>{t.contact.send}</a>
        <button className="btn ghost" onClick={copy}>{copied ? t.contact.copied : t.contact.copy}</button>
      </Reveal>
      <Reveal className="foot" delay={220} style={{ textAlign: 'center' }}>{MAIL}</Reveal>
      <Reveal className="social" delay={260}>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label={t.contact.labels.github}>{ICONS.github}</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.contact.labels.linkedin}>{ICONS.linkedin}</a>
        <a href={LINKS.store} target="_blank" rel="noopener noreferrer" aria-label={t.contact.labels.store}>{ICONS.store}</a>
        <a href={'mailto:' + MAIL} aria-label={t.contact.labels.email}>{ICONS.email}</a>
      </Reveal>
    </div>
  </section>
}

/* ---------------- detalhe do projeto ---------------- */
/* O brilho do fundo do modal vem do próprio projeto: a cor clara do gradiente
   do card, que é a última do `accent`. */
function glowOf(accent) {
  const hex = accent && accent.match(/#[0-9a-f]{3,8}/gi)
  return hex ? hex[hex.length - 1] : '#0a84ff'
}

function Detail({ index, close, goto }) {
  const t = useTranslation()
  const projects = useProjects()
  const open = index != null
  /* Número é projeto da lista; objeto é app que só vive na seção mobile. */
  const p = open ? (typeof index === 'number' ? projects[index] : index) : null
  const topRef = useRef(null)
  /* Trocar de projeto pelo par anterior/próximo mantém o modal aberto, então a
     rolagem precisa voltar ao topo na mão. */
  useEffect(() => { topRef.current?.scrollTo({ top: 0 }) }, [index])
  return <ModalCard
    open={open}
    onClose={close}
    scrollRef={topRef}
    gradientColor={glowOf(p?.accent)}
    animationVariant="scale"
    animationSpeed="normal"
    springStiffness={240}
    springDamping={28}
    ariaLabel={p ? p.name : t.detail.project}
    closeLabel={t.detail.back}
    backdropGradientPosition="50% 8%"
  >
    {p && <DetailContent p={p} index={index} close={close} goto={goto} />}
  </ModalCard>
}

function DetailContent({ p, index, close, goto }) {
  const t = useTranslation()
  const projects = useProjects()
  const listed = typeof index === 'number'
  const prev = listed ? (index - 1 + projects.length) % projects.length : 0
  const next = listed ? (index + 1) % projects.length : 0
  return <TechScan><div className="detail">
    <div className="dbar"><div className="dbar-in">
      <button className="back" onClick={close}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6" /></svg> {t.detail.back}
      </button>
      <div className="nm">{p.name}</div>
      {p.href
        ? <a className="pill" href={p.href} target="_blank" rel="noopener noreferrer">{t.detail.access}</a>
        : <span className="pill off">{t.detail.soon}</span>}
    </div></div>

    <div className="dhero">
      <div className="n">{t.detail.project.toUpperCase()} {p.num} · <span className={p.rainbow ? 'rainbow' : undefined}>{p.type.toUpperCase()}</span></div>
      <h1>{p.name}</h1>
      <p className="t">{p.head}</p>
      <div className={p.portrait ? 'dpanel portrait' : 'dpanel'} style={{ background: p.accent }}>
        {p.portrait
          ? <Device image={p.images[0]} alt={p.name} scale={0.62} autoAnimate />
          : <Shot src={p.images[0]} alt={p.name} eager />}
      </div>
      {p.images.length > 1 && (
        <div className={p.portrait ? 'dgal portrait' : 'dgal'}>
          {p.images.slice(1).map((img, i) => (
            <div className="gpic" key={img}><img src={img} alt={`${p.name} ${i + 2}`} loading="lazy" /></div>
          ))}
        </div>
      )}
    </div>

    <div className="dbody">
      <div className="dgrid">
        <div><div className="lbl">{t.detail.problem}</div><p>{p.problem}</p></div>
        <div><div className="lbl">{t.detail.solution}</div><p>{p.solution}</p></div>
      </div>
      <div className="specs">
        <div><div className="k">{t.detail.year}</div><div className="v">{p.year}</div></div>
        <div><div className="k">{t.detail.role}</div><div className="v">{p.role}</div></div>
        <div><div className="k">{t.detail.stack}</div><div className="v">{p.tags.join(' · ')}</div></div>
      </div>
      <div className="dcta">
        {p.href && <a className="btn" href={p.href} target="_blank" rel="noopener noreferrer">{t.detail.access}</a>}
        <button className="btn ghost" onClick={close}>{t.detail.others}</button>
      </div>
    </div>

    {listed && (
      <div className="dpair">
        <button onClick={() => goto(prev)}><small>{t.detail.prev}</small><h4>{projects[prev].name}</h4></button>
        <button className="nx" onClick={() => goto(next)}><small>{t.detail.next}</small><h4>{projects[next].name}</h4></button>
      </div>
    )}
  </div></TechScan>
}

/* ---------------- app ---------------- */
const IDS = ['home', 'projetos', 'stack', 'experiencia', 'contato']

export default function Site() {
  const t = useTranslation()
  const [active, setActive] = useState('home')
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    let raf = null
    const frame = () => {
      raf = null
      const vh = viewport().h
      let cur = IDS[0]
      IDS.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= vh * 0.35) cur = id
      })
      setActive(cur)
    }
    const on = () => { if (raf == null) raf = requestAnimationFrame(frame) }
    addEventListener('scroll', on, { passive: true }); on()
    return () => { removeEventListener('scroll', on); if (raf != null) cancelAnimationFrame(raf) }
  }, [])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 52, behavior: 'smooth' })
  }

  return <>
    <Nav active={active} go={go} />
    <Hero go={go} />
    <Latest open={setDetail} />
    <MobileApps open={setDetail} />
    <Highlights open={setDetail} />
    <Stack />
    <Experience />
    <Contact />
    <footer><div className="wrap">
      <div className="fn">{t.footer.note}</div>
      <div className="fr">
        <span><b>© 2026 Mauricio Santos.</b> {t.footer.rights}</span>
        <span>{t.footer.place}</span>
      </div>
    </div></footer>
    <Detail index={detail} close={() => setDetail(null)} goto={setDetail} />
  </>
}
