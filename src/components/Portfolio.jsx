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
      link: '/projetos',
      linkText: t.portfolio.seeMore
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      description: t.projects.jerseyAndBits.description,
      link: '/projetos',
      linkText: t.portfolio.seeMore
    },
    {
      id: 3,
      title: 'Chovinista',
      description: t.projects.chovinista.description,
      link: '/projetos',
      linkText: t.portfolio.seeMore
    }
  ]

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-12 sm:py-16 px-4 sm:px-5 bg-white text-gray-900 shadow-sm" id="portfolio">
      <div className="max-w-5xl mx-auto">
      <Reveal>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-10 font-bold text-center tracking-tight px-4">{t.portfolio.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
      <h3 className="text-lg sm:text-xl md:text-2xl text-center mb-6 sm:mb-8 md:mb-10 font-semibold text-emerald-600 px-4">
        {t.portfolio.subtitle}
      </h3>
      </Reveal>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1} y={20}>
            <SpotlightCard
              className="hover:-translate-y-1 transition-transform duration-200"
              spotlightColor="rgba(16, 185, 129, 0.15)"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-semibold">{project.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
              <Link
                to={project.link}
                className="inline-block text-emerald-600 font-medium hover:text-emerald-500 transition-colors no-underline"
              >
                {project.linkText} →
              </Link>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Portfolio