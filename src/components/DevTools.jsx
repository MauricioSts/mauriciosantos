import Reveal from './Reveal'
import Dock from './Dock'
import GooeyNav from './GooeyNav'
import { SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiVite, SiGithub, SiVercel, SiJavascript, SiHtml5, SiCss3, SiFlutter, SiDart, SiDocker, SiPostgresql, SiFirebase } from 'react-icons/si'

import { useState } from 'react'

function DevTools() {
  const groups = [
    {
      title: 'Web',
      items: [
        { icon: <SiReact size={22} />, label: 'React', onClick: () => window.open('https://react.dev/', '_blank') },
        { icon: <SiTypescript size={22} />, label: 'TypeScript', onClick: () => window.open('https://www.typescriptlang.org/', '_blank') },
        { icon: <SiJavascript size={22} />, label: 'JavaScript', onClick: () => window.open('https://developer.mozilla.org/docs/Web/JavaScript', '_blank') },
        { icon: <SiHtml5 size={22} />, label: 'HTML', onClick: () => window.open('https://developer.mozilla.org/docs/Web/HTML', '_blank') },
        { icon: <SiCss3 size={22} />, label: 'CSS', onClick: () => window.open('https://developer.mozilla.org/docs/Web/CSS', '_blank') },
        { icon: <SiTailwindcss size={22} />, label: 'Tailwind', onClick: () => window.open('https://tailwindcss.com/', '_blank') },
        { icon: <SiVite size={22} />, label: 'Vite', onClick: () => window.open('https://vitejs.dev/', '_blank') },
      ],
    },
    {
      title: 'Mobile',
      items: [
        { icon: <SiFlutter size={22} />, label: 'Flutter', onClick: () => window.open('https://flutter.dev/', '_blank') },
        { icon: <SiDart size={22} />, label: 'Dart', onClick: () => window.open('https://dart.dev/', '_blank') },
      ],
    },
    {
      title: 'Back-end & DevOps',
      items: [
        { icon: <SiNodedotjs size={22} />, label: 'Node.js', onClick: () => window.open('https://nodejs.org/', '_blank') },
        { icon: <SiDocker size={22} />, label: 'Docker', onClick: () => window.open('https://www.docker.com/', '_blank') },
        { icon: <SiGithub size={22} />, label: 'GitHub', onClick: () => window.open('https://github.com/', '_blank') },
        { icon: <SiVercel size={22} />, label: 'Vercel', onClick: () => window.open('https://vercel.com/', '_blank') },
      ],
    },
    {
      title: 'Banco de Dados',
      items: [
        { icon: <SiPostgresql size={22} />, label: 'PostgreSQL', onClick: () => window.open('https://www.postgresql.org/', '_blank') },
        { icon: <SiFirebase size={22} />, label: 'Firebase', onClick: () => window.open('https://firebase.google.com/', '_blank') },
      ],
    },
  ]

  const [active, setActive] = useState(0)

  const navItems = groups.map((g) => ({ label: g.title, href: '#devtools' }))

  return (
    <section id="devtools" className="py-16 px-5">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl mb-6 font-bold tracking-tight text-white">DevTools</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-gray-300 mb-8">Stack e ferramentas que uso no dia a dia.</p>
        </Reveal>

        {/* Selector as gooey tabs */}
        <div className="flex justify-center mb-8 w-full overflow-x-auto">
          <GooeyNav
            items={navItems}
            initialActiveIndex={active}
            controlledActiveIndex={active}
            onChange={setActive}
            enableScrollSpy={false}
            animationTime={500}
          />
        </div>

        <Reveal delay={0.06}>
          <div className="flex justify-center w-full overflow-x-auto">
            <Dock items={groups[active]?.items || []} panelHeight={72} baseItemSize={52} magnification={74} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default DevTools


