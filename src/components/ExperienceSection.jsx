import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

function ExperienceSection() {
  const t = useTranslation()
  
  const experiences = [
    {
      id: 1,
      company: 'IFRN',
      role: t.experience.ifrnFlutter.role,
      period: '2025',
      responsibilities: t.experience.ifrnFlutter.responsibilities,
      tags: ['Flutter', 'Dart']
    },
    {
      id: 2,
      company: 'Inspire Logic',
      role: t.experience.inspireLogic.role,
      period: '2025',
      responsibilities: t.experience.inspireLogic.responsibilities,
      tags: ['React.js', 'PostgreSQL']
    },
    {
      id: 3,
      company: 'IFRN',
      role: t.experience.ifrnAR.role,
      period: '2024',
      responsibilities: t.experience.ifrnAR.responsibilities,
      tags: ['Unity', 'C#', 'AR', 'VR']
    },
    {
      id: 4,
      company: 'Secretaría de Infraestrutura do Rio Grande do Norte',
      role: t.experience.secretaria.role,
      period: '2023',
      responsibilities: t.experience.secretaria.responsibilities,
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
    <section className="py-12 sm:py-16 px-4 sm:px-5 bg-gray-900 text-gray-200" id="experience">
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 font-bold text-center tracking-tight text-white font-mono px-4">
        {t.experience.title}
      </h2>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              <div className="flex lg:flex-col gap-2 lg:gap-0 min-w-max lg:min-w-0">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleSelectExperience(exp)}
                    className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 font-mono text-xs sm:text-sm whitespace-nowrap lg:whitespace-normal ${
                      selectedExperience.id === exp.id
                        ? 'bg-emerald-500/20 text-emerald-400 border-l-4 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 border-l-4 border-transparent'
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-h-[300px] sm:min-h-[400px]">
            <div
              key={selectedExperience.id}
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
                {/* Cabeçalho */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-mono mb-2">
                    {selectedExperience.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-emerald-400 font-mono font-semibold text-sm sm:text-base">
                      {selectedExperience.company}
                    </span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span className="text-gray-400 font-mono text-xs sm:text-sm">
                      {selectedExperience.period}
                    </span>
                  </div>
                </div>

                {/* Responsabilidades */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-emerald-400 font-mono font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                    {t.experience.responsibilities}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedExperience.responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 sm:gap-3 text-gray-300 font-mono text-xs sm:text-sm leading-relaxed"
                      >
                        <span className="text-emerald-500 mt-1 sm:mt-1.5 flex-shrink-0">▸</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                {selectedExperience.tags && selectedExperience.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-gray-700/50">
                    {selectedExperience.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-mono border border-emerald-500/20"
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

