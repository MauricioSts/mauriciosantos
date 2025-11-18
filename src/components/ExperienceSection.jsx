import { useState } from 'react'

function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      company: 'IFRN',
      role: 'Flutter Developer',
      period: '2025',
      responsibilities: [
        'Bolsista voluntário no projeto de desenvolvimento de aplicativos em Flutter',
        'Criação de software para apoiar e gerenciar as ações dos agentes de campo',
        'Desenvolvimento de interfaces responsivas e funcionais',
        'Colaboração em equipe multidisciplinar'
      ],
      tags: ['Flutter', 'Dart']
    },
    {
      id: 2,
      company: 'Inspire Logic',
      role: 'Desenvolvedor Front-end Freelancer',
      period: '2025',
      responsibilities: [
        'Desenvolvimento do site de gerenciamento de alunos e professores',
        'Aprimoramento da segurança escolar',
        'Integração de catracas digitais',
        'Implementação de sistema de reconhecimento facial (Face ID) para controle de acesso'
      ],
      tags: ['React.js', 'PostgreSQL']
    },
    {
      id: 3,
      company: 'IFRN',
      role: 'Desenvolvedor de Aplicativos em Realidade Aumentada',
      period: '2024',
      responsibilities: [
        'Bolsista voluntário no projeto de desenvolvimento de aplicativos em AR',
        'União de biologia e tecnologia através de realidade aumentada',
        'Criação de experiências imersivas educacionais',
        'Desenvolvimento de interfaces 3D interativas'
      ],
      tags: ['Unity', 'C#', 'AR', 'VR']
    },
    {
      id: 4,
      company: 'Secretaría de Infraestrutura do Rio Grande do Norte',
      role: 'Estagiário',
      period: '2023',
      responsibilities: [
        'Suporte de TI para funcionários',
        'Manutenção de redes e computadores',
        'Resolução de problemas técnicos',
        'Atendimento presencial e remoto'
      ],
      tags: ['Suporte de TI']
    }
  ]

  const [selectedExperience, setSelectedExperience] = useState(experiences[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSelectExperience = (experience) => {
    if (experience.id === selectedExperience.id) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedExperience(experience)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section className="py-16 px-5 bg-gray-900 text-gray-200" id="experience">
      <h2 className="text-3xl md:text-4xl mb-12 font-bold text-center tracking-tight text-white font-mono">
        Experiências Profissionais
      </h2>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-2">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExperience(exp)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                    selectedExperience.id === exp.id
                      ? 'bg-emerald-500/20 text-emerald-400 border-l-4 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 border-l-4 border-transparent'
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-h-[400px]">
            <div
              key={selectedExperience.id}
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700/50">
                {/* Cabeçalho */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-mono mb-2">
                    {selectedExperience.role}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-400 font-mono font-semibold">
                      {selectedExperience.company}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 font-mono text-sm">
                      {selectedExperience.period}
                    </span>
                  </div>
                </div>

                {/* Responsabilidades */}
                <div className="mb-6">
                  <h4 className="text-emerald-400 font-mono font-semibold mb-4 text-sm uppercase tracking-wider">
                    Responsabilidades
                  </h4>
                  <ul className="space-y-3">
                    {selectedExperience.responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300 font-mono text-sm leading-relaxed"
                      >
                        <span className="text-emerald-500 mt-1.5 flex-shrink-0">▸</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                {selectedExperience.tags && selectedExperience.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
                    {selectedExperience.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-mono border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection

