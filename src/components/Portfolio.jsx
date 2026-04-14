import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'
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
      linkText: t.portfolio.seeMore,
      image: '/bridge.png',
      tags: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      description: t.projects.jerseyAndBits.description,
      link: '/projetos#projeto-2',
      linkText: t.portfolio.seeMore,
      image: '/jersey.jpeg',
      tags: ['React', 'Firebase', 'Tailwind']
    },
    {
      id: 3,
      title: 'Salviano Burguer',
      description: t.projects.salvianoBurguer.description,
      link: '/projetos#projeto-3',
      linkText: t.portfolio.seeMore,
      image: '/salvianoburguer.png',
      tags: ['WhatsApp API', 'React']
    },
    {
      id: 4,
      title: 'Chovinista',
      description: t.projects.chovinista.description,
      link: '/projetos#projeto-4',
      linkText: t.portfolio.seeMore,
      image: '/chovinista.jpeg',
      tags: ['E-commerce', 'React']
    }
  ]

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-0 pb-16 sm:pb-20 px-4 sm:px-5 bg-white text-gray-900" id="portfolio">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-10 font-bold text-center tracking-tight px-4">{t.portfolio.title}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-lg sm:text-xl md:text-2xl text-center mb-8 sm:mb-10 md:mb-12 font-semibold text-emerald-600 px-4">
            {t.portfolio.subtitle}
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1} y={20}>
              <Link to={project.link} className="no-underline group block">
                <SpotlightCard
                  className="h-full overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                  spotlightColor="rgba(16, 185, 129, 0.2)"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-lg -m-6 mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-emerald-600 font-semibold pt-2 group-hover:translate-x-2 transition-transform">
                      {project.linkText}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio