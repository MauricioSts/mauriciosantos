import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Particles from '../components/Particles'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

function AllProjects() {
  const t = useTranslation()
  const { language, toggleLanguage } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 400)
      }
    }
  }, [location.hash])

  const projects = [
    {
      id: 1,
      title: 'BridgeAndBits',
      problem: t.projects.bridgeAndBits.problem,
      solution: t.projects.bridgeAndBits.solution,
      images: ['/bridge.png'],
      href: 'https://bridgeandbits.mauriciosts.com/',
      tags: ['React.js', 'PostgreSQL', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      problem: t.projects.jerseyAndBits.problem,
      solution: t.projects.jerseyAndBits.solution,
      images: ['/jersey.jpeg'],
      href: 'https://jerseyandbits.vercel.app/',
      tags: ['React.js', 'Firebase', 'Tailwind CSS'],
    },
    {
      id: 3,
      title: 'Salviano Burguer',
      problem: t.projects.salvianoBurguer.problem,
      solution: t.projects.salvianoBurguer.solution,
      images: ['/salvianoburguer.png'],
      href: 'https://salvianoburguer.vercel.app/',
      tags: ['JavaScript', 'Tailwind CSS', 'WhatsApp API'],
    },
    {
      id: 4,
      title: 'Chovinista',
      problem: t.projects.chovinista.problem,
      solution: t.projects.chovinista.solution,
      images: ['/chovinista.jpeg'],
      href: null,
      tags: ['React.js', 'Tailwind CSS'],
    },
    {
      id: 5,
      title: 'Comidas da Copa',
      problem: t.projects.comidasDaCopa.problem,
      solution: t.projects.comidasDaCopa.solution,
      images: ['/comidas-da-copa.png', '/comidas-da-copa-2.png', '/comidas-da-copa-3.png'],
      href: 'http://147.15.7.227:3000',
      tags: ['Next.js 16', 'Supabase', 'Realtime', 'TypeScript'],
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="min-h-screen relative bg-gray-950 text-gray-200">
      <Particles />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-all duration-300 text-sm sm:text-base group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>{t.projects.back}</span>
          </Link>
          <div className="font-bold text-emerald-400 text-sm sm:text-base md:text-lg tracking-wider font-mono">
            {`{ ${t.projects.projectsTitle} }`}
          </div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs sm:text-sm font-mono text-gray-400 hover:text-emerald-400 border border-gray-700/60 hover:border-emerald-500/60 rounded-lg transition-all duration-300"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">

        {/* Page Title */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-emerald-500" />
            <span className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase">Work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            {t.projects.allWorks}
          </h1>
        </motion.div>

        {/* Projects */}
        <motion.div
          className="space-y-24 sm:space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((p, idx) => {
            const isEven = idx % 2 === 0
            return (
              <motion.section
                key={p.id}
                id={`projeto-${p.id}`}
                variants={cardVariants}
                className="scroll-mt-24"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${!isEven ? 'lg:[direction:rtl]' : ''}`}>

                  {/* Image Side */}
                  <div className={`${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                    <motion.div
                      className="relative group"
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Glow */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Number badge */}
                      <div className="absolute -top-4 -left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <span className="text-gray-900 font-extrabold text-base font-mono">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Main image */}
                      <div className="relative overflow-hidden rounded-2xl border border-gray-700/40">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Additional screenshots (for Comidas da Copa) */}
                      {p.images.length > 1 && (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {p.images.slice(1).map((img, i) => (
                            <div key={i} className="relative overflow-hidden rounded-xl border border-gray-700/40">
                              <img
                                src={img}
                                alt={`${p.title} screenshot ${i + 2}`}
                                className="w-full h-32 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <div className={`${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                    <div className="space-y-5 sm:space-y-6">

                      {/* Title & Tags */}
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                          {p.title}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-mono border border-emerald-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Problem */}
                      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                          <span className="text-red-400 font-semibold text-xs sm:text-sm font-mono uppercase tracking-wider">
                            {t.projects.problem}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{p.problem}</p>
                      </div>

                      {/* Solution */}
                      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                          <span className="text-emerald-400 font-semibold text-xs sm:text-sm font-mono uppercase tracking-wider">
                            {t.projects.solution}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{p.solution}</p>
                      </div>

                      {/* CTA */}
                      {p.href && (
                        <motion.a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 bg-emerald-500 text-gray-900 font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 text-sm sm:text-base"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {t.projects.accessProject}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {idx < projects.length - 1 && (
                  <div className="flex items-center justify-center mt-20 sm:mt-24">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-700" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/40 mx-4" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-700" />
                  </div>
                )}
              </motion.section>
            )
          })}
        </motion.div>

        <div className="h-20" />
      </main>
    </div>
  )
}

export default AllProjects
