import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { useTranslation } from '../hooks/useTranslation'

function Portfolio() {
  const t = useTranslation()

  const projects = [
    {
      id: 1,
      title: 'BridgeAndBits',
      description: t.projects.bridgeAndBits.description,
      link: '/projetos#projeto-1',
      image: '/bridge.png',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      accent: 'from-emerald-500/20 to-emerald-400/5'
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      description: t.projects.jerseyAndBits.description,
      link: '/projetos#projeto-2',
      image: '/jersey.jpeg',
      tags: ['React', 'Firebase', 'Tailwind'],
      accent: 'from-emerald-400/20 to-emerald-500/5'
    },
    {
      id: 3,
      title: 'Salviano Burguer',
      description: t.projects.salvianoBurguer.description,
      link: '/projetos#projeto-3',
      image: '/salvianoburguer.png',
      tags: ['WhatsApp API', 'React'],
      accent: 'from-emerald-500/20 to-emerald-300/5'
    },
    {
      id: 4,
      title: 'Chovinista',
      description: t.projects.chovinista.description,
      link: '/projetos#projeto-4',
      image: '/chovinista.jpeg',
      tags: ['E-commerce', 'React'],
      accent: 'from-emerald-400/20 to-emerald-500/5'
    },
    {
      id: 5,
      title: 'Comidas da Copa',
      description: t.projects.comidasDaCopa.description,
      link: '/projetos#projeto-5',
      image: '/comidas-da-copa.png',
      tags: ['Next.js', 'Supabase', 'Realtime'],
      accent: 'from-emerald-500/20 to-emerald-400/5'
    }
  ]

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-5 bg-white text-gray-900"
      id="portfolio"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-4 mb-3 px-4">
            <div className="w-6 h-px bg-emerald-500" />
            <span className="text-emerald-600 text-xs font-mono tracking-[0.3em] uppercase font-semibold">Work</span>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 px-4">
            {t.portfolio.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg sm:text-xl text-gray-500 font-mono mb-14 sm:mb-18 px-4">
            {t.portfolio.subtitle}
          </p>
        </Reveal>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} y={24}>
              <Link to={project.link} className="no-underline group block h-full">
                <article className="relative h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5">

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 bg-gray-900/90 backdrop-blur-sm rounded-lg flex items-center justify-center border border-emerald-500/40 shadow">
                      <span className="text-emerald-400 font-extrabold text-xs font-mono">
                        {String(project.id).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-gray-50 text-gray-600 rounded-md text-xs font-mono border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold pt-2 group-hover:gap-3 transition-all">
                      <span>{t.portfolio.seeMore}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
