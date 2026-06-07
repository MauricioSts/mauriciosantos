import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'

/* ---------------- data builders (bilingual) ---------------- */
function useProjects() {
  const t = useTranslation()
  return [
    {
      id: 'bridgeandbits', num: '01', name: 'BridgeAndBits',
      desc: t.projects.bridgeAndBits.description,
      images: ['/bridge.png'],
      tags: ['React.js', 'PostgreSQL', 'Tailwind CSS'],
      href: 'https://bridgeandbits.mauriciosts.com/',
      problema: t.projects.bridgeAndBits.problem,
      solucao: t.projects.bridgeAndBits.solution,
    },
    {
      id: 'jerseyandbits', num: '02', name: 'JerseyAndBits',
      desc: t.projects.jerseyAndBits.description,
      images: ['/jersey.jpeg'],
      tags: ['React.js', 'Firebase', 'Tailwind CSS'],
      href: 'https://jerseyandbits.vercel.app/',
      problema: t.projects.jerseyAndBits.problem,
      solucao: t.projects.jerseyAndBits.solution,
    },
    {
      id: 'salviano-burguer', num: '03', name: 'Salviano Burguer',
      desc: t.projects.salvianoBurguer.description,
      images: ['/salvianoburguer.png'],
      tags: ['JavaScript', 'Tailwind CSS', 'WhatsApp API'],
      href: 'https://salvianoburguer.vercel.app/',
      problema: t.projects.salvianoBurguer.problem,
      solucao: t.projects.salvianoBurguer.solution,
    },
    {
      id: 'chovinista', num: '04', name: 'Chovinista',
      desc: t.projects.chovinista.description,
      images: ['/chovinista.jpeg'],
      tags: ['React.js', 'Tailwind CSS'],
      href: null,
      problema: t.projects.chovinista.problem,
      solucao: t.projects.chovinista.solution,
    },
    {
      id: 'comidas-da-copa', num: '05', name: 'Comidas da Copa',
      desc: t.projects.comidasDaCopa.description,
      // capa = tela de entrada do app (sala de jogo); extras na galeria
      images: ['/comidas-da-copa-2.png', '/comidas-da-copa-3.png'],
      tags: ['Next.js 16', 'Supabase', 'Realtime', 'TypeScript'],
      href: 'http://147.15.7.227:3000',
      problema: t.projects.comidasDaCopa.problem,
      solucao: t.projects.comidasDaCopa.solution,
    },
  ]
}

function useExperiences() {
  const t = useTranslation()
  const { language } = useLanguage()
  const atual = language === 'pt' ? '2025 — Atual' : '2025 — Present'
  return [
    { when: atual, role: t.experience.sethas.role, org: 'SETHAS',
      resp: t.experience.sethas.responsibilities, tags: ['React Native', 'TypeScript', 'Django'] },
    { when: '2025', role: t.experience.ifrnFlutter.role, org: 'IFRN',
      resp: t.experience.ifrnFlutter.responsibilities, tags: ['Flutter', 'Dart'] },
    { when: '2025', role: t.experience.inspireLogic.role, org: 'Inspire Logic',
      resp: t.experience.inspireLogic.responsibilities, tags: ['React.js', 'PostgreSQL'] },
    { when: '2024', role: t.experience.ifrnAR.role, org: 'IFRN',
      resp: t.experience.ifrnAR.responsibilities, tags: ['Unity', 'C#', 'AR', 'VR'] },
    { when: '2023', role: t.experience.secretaria.role,
      org: 'Secretaría de Infraestrutura do Rio Grande do Norte',
      resp: t.experience.secretaria.responsibilities, tags: [language === 'pt' ? 'Suporte de TI' : 'IT Support'] },
  ]
}

function useStacks() {
  const t = useTranslation()
  const g = t.devtools.groups
  return {
    [g.web]: [['React', '⚛'], ['TypeScript', 'TS'], ['JavaScript', 'JS'], ['HTML', '<>'], ['CSS', '#'], ['Tailwind', '~'], ['Vite', '⚡']],
    [g.mobile]: [['React Native', '⚛'], ['Flutter', '◇'], ['Dart', '◑']],
    [g.backend]: [['Node.js', '⬡'], ['Django', 'dj'], ['Docker', '⛴'], ['GitHub', '⎇'], ['Vercel', '▲']],
    [g.database]: [['PostgreSQL', '◗'], ['Firebase', '🔥']],
  }
}

const SOCIAL_LINKS = {
  github: 'https://github.com/MauricioSts',
  linkedin: 'https://linkedin.com/in/mauriciosts',
  email: 'contatomauriciosts@gmail.com',
}

/* ---------------- reveal ---------------- */
const REVEAL_TRANS = 'opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)'
function Reveal({ as = 'div', className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [state, setState] = useState('show')
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return
    if (el.getBoundingClientRect().top > innerHeight * 0.9) setState('pre')
  }, [])
  useEffect(() => {
    if (state !== 'pre') return
    const check = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < innerHeight * 0.9 && r.bottom > -40) { setState('in'); cleanup() }
    }
    const cleanup = () => { removeEventListener('scroll', check); removeEventListener('resize', check); clearTimeout(tm) }
    addEventListener('scroll', check, { passive: true }); addEventListener('resize', check)
    const tm = setTimeout(() => { setState('in'); cleanup() }, 2200)
    check()
    return cleanup
  }, [state])
  const hidden = state === 'pre'
  const Tag = as
  const st = { ...style, opacity: hidden ? 0 : 1, transform: hidden ? 'translateY(28px)' : 'none', transition: REVEAL_TRANS }
  return <Tag ref={ref} className={'rv ' + className} style={st} {...rest}>{children}</Tag>
}

function Counter({ to, suffix = '' }) {
  const [v, setV] = useState(0); const ref = useRef(null); const done = useRef(false)
  useEffect(() => {
    const run = () => {
      done.current = true; const dur = 1100, t0 = performance.now()
      const tick = (t) => { const p = Math.min(1, (t - t0) / dur); setV(Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }
    const check = () => {
      if (done.current || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      if (r.top < innerHeight * 0.9 && r.bottom > 0) { run(); removeEventListener('scroll', check) }
    }
    check(); addEventListener('scroll', check, { passive: true })
    const tm = setTimeout(check, 300)
    return () => { removeEventListener('scroll', check); clearTimeout(tm) }
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

/* ---------------- cursor ---------------- */
function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf
    const move = (e) => { mx = e.clientX; my = e.clientY; if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)` }
    const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop) }
    const over = (e) => { if (e.target.closest('a,button,.card,.lang,.social a,.logo')) ring.current?.classList.add('hot') }
    const out = (e) => { if (e.target.closest('a,button,.card,.lang,.social a,.logo')) ring.current?.classList.remove('hot') }
    addEventListener('mousemove', move, { passive: true })
    addEventListener('mouseover', over, { passive: true }); addEventListener('mouseout', out, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { removeEventListener('mousemove', move); removeEventListener('mouseover', over); removeEventListener('mouseout', out); cancelAnimationFrame(raf) }
  }, [])
  return <>
    <div className="cur" ref={dot}></div>
    <div className="cur-ring" ref={ring}></div>
  </>
}

/* ---------------- preloader ---------------- */
function Preloader() {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(() => !!sessionStorage.getItem('ms_seen'))
  useEffect(() => {
    if (done) return
    let cur = 0
    const id = setInterval(() => {
      cur += Math.max(1, Math.round((100 - cur) * 0.14)); if (cur >= 100) cur = 100
      setN(cur)
      if (cur >= 100) { clearInterval(id); setTimeout(() => { setDone(true); sessionStorage.setItem('ms_seen', '1') }, 420) }
    }, 60)
    return () => clearInterval(id)
  }, [done])
  if (done && n === 0) return null
  return <div className={'pre' + (done ? ' done' : '')}>
    <div>
      <div className="cnt">{String(n).padStart(2, '0')}<b>.</b></div>
      <div className="lbl">Mauricio Santos · Portfólio</div>
    </div>
  </div>
}

/* ---------------- stars ---------------- */
function Stars() {
  const ref = useRef(null)
  useEffect(() => {
    const n = window.innerWidth < 700 ? 45 : 80; let h = ''
    for (let i = 0; i < n; i++) {
      const s = Math.random() < .15 ? 2.4 : 1.4
      h += `<i style="left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;width:${s}px;height:${s}px;animation-delay:${(Math.random() * 4).toFixed(2)}s"></i>`
    }
    if (ref.current) ref.current.innerHTML = h
  }, [])
  return <div className="stars" ref={ref}></div>
}

/* ---------------- header ---------------- */
function Header({ active, onNav }) {
  const t = useTranslation()
  const { language, toggleLanguage } = useLanguage()
  const NAV = [t.nav.home, t.nav.projects, t.nav.experience, t.nav.devtools, t.nav.contact]
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null), pillRef = useRef(null)
  useEffect(() => { const s = () => setScrolled(scrollY > 30); addEventListener('scroll', s, { passive: true }); s(); return () => removeEventListener('scroll', s) }, [])
  const measure = () => {
    const btns = navRef.current?.querySelectorAll('button'); if (!btns) return
    const el = btns[active]
    if (el && pillRef.current && el.offsetWidth) { pillRef.current.style.left = el.offsetLeft + 'px'; pillRef.current.style.width = el.offsetWidth + 'px' }
  }
  useLayoutEffect(() => { measure() }, [active, scrolled, language])
  useEffect(() => {
    const r = () => requestAnimationFrame(measure)
    r(); document.fonts?.ready.then(r)
    addEventListener('resize', r)
    const ro = new ResizeObserver(r); if (navRef.current) ro.observe(navRef.current)
    return () => { removeEventListener('resize', r); ro.disconnect() }
  }, [active, language])
  return <header className={'hd' + (scrolled ? ' scrolled' : '')}>
    <div className="hd-in">
      <div className="logo" onClick={() => onNav(0)}><span className="badge">MS</span> Mauricio Santos</div>
      <nav className="nav" ref={navRef}>
        <span className="pill" ref={pillRef}></span>
        {NAV.map((n, i) => <button key={n} className={i === active ? 'on' : ''} onClick={() => onNav(i)}>{n}</button>)}
      </nav>
      <button className="lang" onClick={toggleLanguage}>{language === 'pt' ? 'EN' : 'PT'}</button>
    </div>
  </header>
}

/* ---------------- typewriter ---------------- */
function RoleTyper() {
  const { language } = useLanguage()
  const ROLES = language === 'pt' ? ['Front-end', 'Estudante', 'Empreendedor'] : ['Front-end', 'Student', 'Entrepreneur']
  const [ri, setRi] = useState(0), [txt, setTxt] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const full = ROLES[ri % ROLES.length]; let tm
    if (!del && txt.length < full.length) { tm = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), 75) }
    else if (!del && txt.length === full.length) { tm = setTimeout(() => setDel(true), 1500) }
    else if (del && txt.length > 0) { tm = setTimeout(() => setTxt(full.slice(0, txt.length - 1)), 40) }
    else { setDel(false); setRi((ri + 1) % ROLES.length) }
    return () => clearTimeout(tm)
  }, [txt, del, ri, language])
  return <span className="rolebox">{txt}</span>
}

/* ---------------- hero ---------------- */
function Hero() {
  const t = useTranslation()
  const ph = useRef(null)
  const onMove = (e) => {
    const r = ph.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    ph.current.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`
  }
  const onLeave = () => { ph.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)' }
  return <section id="home" className="hero wrap">
    <div>
      <Reveal className="eyebrow">Portfolio</Reveal>
      <Reveal as="h1">Mauricio<span className="l2">Santos</span></Reveal>
      <Reveal className="roleline"><RoleTyper /></Reveal>
      <Reveal as="p" className="bio" dangerouslySetInnerHTML={{ __html: bold(t.hero.description1) }} />
      <Reveal as="p" className="bio" dangerouslySetInnerHTML={{ __html: bold(t.hero.description2) }} />
      <Reveal className="social">
        <a href="#home" aria-label="Home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg></a>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z" /></svg></a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6 2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3 0-3-1.85-3s-2.13 1.44-2.13 2.9V21h-4z" /></svg></a>
        <a href={'mailto:' + SOCIAL_LINKS.email} aria-label="E-mail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg></a>
      </Reveal>
    </div>
    <Reveal className="photo">
      <div ref={ph} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: 'preserve-3d' }}>
        <div className="chip">MS</div>
        <div className="frame">
          <div className="scan"></div>
          <img src="/profile.jpeg" alt="Mauricio Santos" />
        </div>
      </div>
    </Reveal>
  </section>
}

// emphasize key terms (mirrors the <b> highlights of the original bio)
function bold(text) {
  const terms = ['Sistemas para Internet', 'Engenharia de Software', 'empreendedor', 'PFCsports',
    'Systems for Internet', 'Software Engineering', 'entrepreneur']
  let out = text
  for (const term of terms) out = out.replace(term, `<b>${term}</b>`)
  return out
}

function Stats() {
  const t = useTranslation()
  return <div className="wrap"><div className="stats">
    <Reveal className="stat"><div className="n"><Counter to={5} suffix="+" /></div><div className="k">{t.hero.stats.projects}</div></Reveal>
    <Reveal className="stat"><div className="n"><Counter to={2} suffix="+" /></div><div className="k">{t.hero.stats.years}</div></Reveal>
    <Reveal className="stat"><div className="n"><Counter to={3} /></div><div className="k">{t.hero.stats.stacks}</div></Reveal>
  </div></div>
}

function Marquee() {
  const items = ['React', 'TypeScript', 'Tailwind', 'Firebase', 'PostgreSQL', 'Node.js', 'Vite', 'Front-end', 'UI/UX']
  const row = [...items, ...items]
  return <div className="marq"><div className="row">{row.map((t, i) => <span key={i}>{t}</span>)}</div></div>
}

function Projects({ onOpen }) {
  const t = useTranslation()
  const projects = useProjects()
  return <section id="projetos">
    <div className="wrap">
      <Reveal className="shead"><h2><span className="idx">02</span> {t.nav.projects}</h2><div className="sub">{t.portfolio.subtitle}</div></Reveal>
      <div className="projs">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.id} className="card" onClick={() => onOpen(i)}>
            <div className="thumb">
              <img src={p.images[0]} alt={p.name} loading="lazy" />
              <div className="gloss"></div>
              <span className="num">{p.num}</span>
              <span className="open"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
            </div>
            <div className="body">
              <h3>{p.name}</h3>
              <p className="desc">{p.desc}</p>
              <div className="tags">{p.tags.map(tg => <span className="tag" key={tg}>{tg}</span>)}</div>
              <span className="more">{t.portfolio.seeMore} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
}

function Timeline() {
  const t = useTranslation()
  const experiences = useExperiences()
  const ref = useRef(null), fill = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current || !fill.current) return
      const r = ref.current.getBoundingClientRect()
      const passed = Math.max(0, innerHeight * 0.55 - r.top)
      fill.current.style.height = Math.min(r.height, passed) + 'px'
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return <section id="experiencias">
    <div className="wrap">
      <Reveal className="shead"><h2><span className="idx">03</span> {t.nav.experience}</h2><div className="sub">{t.experience.title}</div></Reveal>
      <div className="tl" ref={ref}>
        <div className="fill" ref={fill}></div>
        {experiences.map((e, i) => (
          <Reveal className="tlitem" key={i}>
            <div className="dot"></div>
            <div className="when">{e.when}</div>
            <h3>{e.role}</h3>
            <div className="org">{e.org}</div>
            <ul className="resp">{e.resp.map((r, j) => <li key={j}>{r}</li>)}</ul>
            <div className="etags">{e.tags.map(tg => <span className="tag" key={tg}>{tg}</span>)}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
}

function StackTabs() {
  const STACKS = useStacks()
  const keys = Object.keys(STACKS)
  const [tab, setTab] = useState(0)
  const tref = useRef(null), tp = useRef(null)
  const measure = () => {
    const b = tref.current?.querySelectorAll('button'); if (!b) return
    const el = b[tab]
    if (el && tp.current && el.offsetWidth) { tp.current.style.left = el.offsetLeft + 'px'; tp.current.style.width = el.offsetWidth + 'px' }
  }
  useLayoutEffect(() => { measure() }, [tab])
  useEffect(() => { const r = () => requestAnimationFrame(measure); document.fonts?.ready.then(r); addEventListener('resize', r); return () => removeEventListener('resize', r) }, [])
  return <>
    <div className="tabs" ref={tref}>
      <span className="tpill" ref={tp}></span>
      {keys.map((k, i) => <button key={k} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{k}</button>)}
    </div>
    <div className="stackgrid">
      {STACKS[keys[tab]].map(([nm, ic]) => (
        <div className="stk" key={nm}><div className="ic">{ic}</div><div className="nm">{nm}</div></div>
      ))}
    </div>
  </>
}

function DevTools() {
  const t = useTranslation()
  return <section id="devtools">
    <div className="wrap">
      <Reveal className="shead"><h2><span className="idx">04</span> {t.devtools.title}</h2><div className="sub">{t.devtools.subtitle}</div></Reveal>
      <Reveal><StackTabs /></Reveal>
    </div>
  </section>
}

function MailButton() {
  const [copied, setCopied] = useState(false)
  const mail = SOCIAL_LINKS.email
  return <a className="mailbtn" href={'mailto:' + mail}
    onClick={() => { navigator.clipboard?.writeText(mail); setCopied(true); setTimeout(() => setCopied(false), 1600) }}>
    <span className="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg></span>
    {copied ? 'copiado ✓' : mail}
  </a>
}

function Contact() {
  const t = useTranslation()
  return <section id="contato">
    <div className="wrap contact">
      <Reveal className="eyebrow" style={{ justifyContent: 'center' }}>{t.nav.contact}</Reveal>
      <Reveal as="h2">{t.contact.title}</Reveal>
      <Reveal as="p">{t.contact.subtitle}</Reveal>
      <Reveal><MailButton /></Reveal>
      <Reveal className="csocial">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z" /></svg> GitHub</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6 2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3 0-3-1.85-3s-2.13 1.44-2.13 2.9V21h-4z" /></svg> LinkedIn</a>
      </Reveal>
    </div>
  </section>
}

/* ---------------- project detail ---------------- */
function Detail({ index, onClose, onGoto }) {
  const t = useTranslation()
  const { language } = useLanguage()
  const projects = useProjects()
  const open = index != null
  const p = open ? projects[index] : null
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose() }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [onClose])
  if (!open) return null
  const prev = (index - 1 + projects.length) % projects.length
  const next = (index + 1) % projects.length
  const L = language === 'pt'
    ? { prob: 'Problema', sol: 'Solução', access: 'Acessar projeto', prev: '← Anterior', next: 'Próximo →' }
    : { prob: 'Problem', sol: 'Solution', access: 'Access project', prev: '← Previous', next: 'Next →' }
  return <div className="detail">
    <div className="dbar"><div className="dbar-in">
      <button className="back" onClick={onClose}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17"><path d="M19 12H5M11 6l-6 6 6 6" /></svg> {t.projects.back}</button>
      <div className="dtitlebar">{`{ ${t.nav.projects} }`}</div>
      <span style={{ width: 60 }}></span>
    </div></div>
    <div className="dwrap">
      <div className="dgrid">
        <div className="dshot">
          <div className="pic"><img src={p.images[0]} alt={p.name} /></div>
          {p.images.length > 1 && (
            <div className="gal">
              {p.images.slice(1).map((img, i) => <div className="pic" key={i}><img src={img} alt={`${p.name} ${i + 2}`} /></div>)}
            </div>
          )}
        </div>
        <div>
          <span className="dnum">{p.num}</span>
          <h1>{p.name}</h1>
          <div className="dtags">{p.tags.map(tg => <span className="dtag" key={tg}>{tg}</span>)}</div>
          <div className="block prob"><div className="lbl"><span className="led"></span> {L.prob}</div><p>{p.problema}</p></div>
          <div className="block sol"><div className="lbl"><span className="led"></span> {L.sol}</div><p>{p.solucao}</p></div>
          {p.href && <a className="access" href={p.href} target="_blank" rel="noopener noreferrer">{L.access} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17"><path d="M7 17L17 7M9 7h8v8" /></svg></a>}
          <div className="dnavpair">
            <button onClick={() => onGoto(prev)}><div>{L.prev}</div><h4>{projects[prev].name}</h4></button>
            <button className="nx" onClick={() => onGoto(next)}><div>{L.next}</div><h4>{projects[next].name}</h4></button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

/* ---------------- app ---------------- */
const SECTION_IDS = ['home', 'projetos', 'experiencias', 'devtools', 'contato']

export default function Site() {
  const t = useTranslation()
  const [active, setActive] = useState(0)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const bar = document.getElementById('prog')
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const sc = scrollY, h = document.documentElement.scrollHeight - innerHeight
        if (bar) bar.style.width = (h > 0 ? (sc / h * 100) : 0) + '%'
        let cur = 0
        SECTION_IDS.forEach((id, i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) cur = i })
        setActive(cur)
      })
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const goNav = (i) => { const el = document.getElementById(SECTION_IDS[i]); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return <>
    <Preloader />
    <Cursor />
    <Stars />
    <div className="progress" id="prog"></div>
    <Header active={active} onNav={goNav} />
    <div className="shell">
      <Hero />
      <Stats />
      <Marquee />
      <Projects onOpen={(i) => setDetail(i)} />
      <Timeline />
      <DevTools />
      <Contact />
      <footer>
        <div className="wrap">
          {t.footer.developed}.<br />
          <b>© 2026 Mauricio Santos.</b> {t.footer.rights}
        </div>
      </footer>
    </div>
    <Detail index={detail} onClose={() => setDetail(null)} onGoto={(i) => setDetail(i)} />
  </>
}
