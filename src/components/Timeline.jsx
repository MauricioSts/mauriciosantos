import { motion } from 'framer-motion'

function Timeline() {
  const experiences = [
    {
      id: 2,
      date: '2025',
      title: 'IFRN',
      subtitle: 'Flutter Developer',
      description: 'Fui bolsista voluntário no projeto de desenvolvimento de aplicativos em Flutter para o IFRN, com o objetivo de criar umsoftware com o intuito de apoiar e gerenciar as ações dos agentes de campo. ',
      tags: ['Flutter', 'Dart']
    },
    {
      id: 3,
      date: '2025',
      title: 'Inspire Logic',
      subtitle: 'Desenvolvedor Front-end freelancer',
      description: 'Contribuí para o desenvolvimento do site de gerenciamento de alunos e professores da startup Inspire Logic, aprimorando a segurança escolar por meio da integração de catracas digitais e de um sistema de reconhecimento facial (Face ID) para controle de acesso.',
      tags: ['React.js', 'PostgreSQL']
    },
    {
      id: 4,
      date: '2024',
      title: 'IFRN',
      subtitle: 'Desenvolvedor de aplicativos em realidade aumentada',
      description: 'Fui bolsista voluntário no projeto de desenvolvimento de aplicativos em realidade aumentada para o IFRN, com o objetivo a unir biologia e tecnologia',
      tags: ['Unity', 'C#', 'AR', 'VR']
    },
    {
      id: 5,
      date: '2023',
      title: 'Secretaría de infraestrutura do Rio Grande do Norte',
      subtitle: 'Estagiario',
      description: 'Suporte de TI e manutenção de redes e computadores',
      tags: ["Suporte de TI",]
    }
  ]

  return (
    <section className="py-16 px-5" id="timeline">
      <h2 className="text-3xl md:text-4xl mb-16 font-bold text-center tracking-tight text-white">Timeline</h2>

      {/* eixo central */}
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0 border-l-4 border-dashed border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.35)]" aria-hidden="true" />

        <div className="space-y-12 md:space-y-20">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-start">
                {/* lado esquerdo */}
                <div className={`${isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-1 md:invisible md:h-0'}`}>
                  {isLeft && (
                    <motion.div
                      className="relative md:pr-12"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <div className="hidden md:block absolute right-[-9px] top-2 w-4 h-4 rounded-full bg-green-400 border-2 border-gray-900" />
                      <motion.div
                        whileHover={{ x: -16, y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.6 }}
                        className="inline-block text-left md:text-right bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-xl focus:outline-none"
                        tabIndex={0}
                        role="button"
                      >
                        <div className="text-sm text-gray-500 mb-1 font-medium">{exp.date}</div>
                        <div className="text-xl md:text-2xl font-semibold mb-1 text-gray-900">{exp.title}</div>
                        <div className="text-lg md:text-xl text-gray-700 mb-2.5 font-medium">{exp.subtitle}</div>
                        <div className="text-gray-700 leading-relaxed mt-2.5">{exp.description}</div>
                        {exp.tags && exp.tags.length > 0 && (
                          <div className="flex md:justify-end flex-wrap gap-2 mt-2.5">
                            {exp.tags.map((tag, index) => (
                              <span key={index} className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded text-sm">{tag}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* lado direito */}
                <div className={`${!isLeft ? 'md:col-start-2' : 'md:col-start-2 md:invisible md:h-0'}`}>
                  {!isLeft && (
                    <motion.div
                      className="relative md:pl-12"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <div className="hidden md:block absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-green-400 border-2 border-gray-900" />
                      <motion.div
                        whileHover={{ x: 16, y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.6 }}
                        className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-xl focus:outline-none"
                        tabIndex={0}
                        role="button"
                      >
                        <div className="text-sm text-gray-500 mb-1 font-medium">{exp.date}</div>
                        <div className="text-xl md:text-2xl font-semibold mb-1 text-gray-900">{exp.title}</div>
                        <div className="text-lg md:text-xl text-gray-700 mb-2.5 font-medium">{exp.subtitle}</div>
                        <div className="text-gray-700 leading-relaxed mt-2.5">{exp.description}</div>
                        {exp.tags && exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {exp.tags.map((tag, index) => (
                              <span key={index} className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded text-sm">{tag}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* mobile: linha e marcador à esquerda */}
                <div className="md:hidden relative pl-8 border-l-4 border-dashed border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.25)] col-span-1">
                  <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-green-400 border-2 border-gray-900" />
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1 font-medium">{exp.date}</div>
                    <div className="text-xl font-semibold mb-1 text-gray-900">{exp.title}</div>
                    <div className="text-lg text-gray-700 mb-2.5 font-medium">{exp.subtitle}</div>
                    <div className="text-gray-700 leading-relaxed mt-2.5">{exp.description}</div>
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5">
                        {exp.tags.map((tag, index) => (
                          <span key={index} className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded text-sm">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Timeline