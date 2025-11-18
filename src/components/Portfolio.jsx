import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'
import Reveal from './Reveal'

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'BridgeAndBits',
      description: 'Dashboard completo para gerenciamento de múltiplos provedores de internet, com cadastro, consulta, acompanhamento de status de conformidade, KPIs e geração automatizada de relatórios mensais.',
      link: '/projetos',
      linkText: 'Ver mais'
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      description: 'Sistema de gestão de pedidos e clientes para lojas de camisas de time, com controle financeiro completo e disponibilizado para outros donos de loja.',
      link: '/projetos',
      linkText: 'Ver mais'
    },
    {
      id: 3,
      title: 'Chovinista',
      description: 'Sistema de gestão financeira pessoal para controle e visualização de rendimento fixo, permitindo anotações e acompanhamento da renda mensal.',
      link: '/projetos',
      linkText: 'Ver mais'
    }
  ]

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-16 px-5 bg-white text-gray-900 shadow-sm" id="portfolio">
      <div className="max-w-5xl mx-auto">
      <Reveal>
        <h2 className="text-3xl md:text-4xl mb-10 font-bold text-center tracking-tight">Projetos</h2>
      </Reveal>
      <Reveal delay={0.05}>
      <h3 className="text-xl md:text-2xl text-center mb-10 font-semibold text-emerald-600">
        Meus principais projetos
      </h3>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1} y={20}>
            <SpotlightCard
              className="hover:-translate-y-1 transition-transform duration-200"
              spotlightColor="rgba(16, 185, 129, 0.15)"
            >
              <h3 className="text-xl md:text-2xl mb-4 font-semibold">{project.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
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