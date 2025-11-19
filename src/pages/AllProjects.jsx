import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from '../components/Particles'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

function AllProjects() {
  const t = useTranslation()
  const { language, toggleLanguage } = useLanguage()
  
  const projects = [
    {
      id: 1,
      title: 'BridgeAndBits',
      problem: t.projects.bridgeAndBits.problem,
      solution: t.projects.bridgeAndBits.solution,
      image: '/provedores.png',
      href: 'https://providersmanagement.vercel.app/',
    },
    {
      id: 2,
      title: 'JerseyAndBits',
      problem: t.projects.jerseyAndBits.problem,
      solution: t.projects.jerseyAndBits.solution,
      image: '/jersey.jpeg',
      href: 'https://jerseyandbits.vercel.app/',
    },
    {
      id: 3,
      title: 'Chovinista',
      problem: t.projects.chovinista.problem,
      solution: t.projects.chovinista.solution,
      image: '/chovinista.jpeg',
      href: '#',
    },
  ]
  return (
    <div className="min-h-screen relative bg-gray-900 text-gray-200">
      <Particles />
      <header className="sticky top-0 z-40 bg-gray-900/85 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-200 hover:text-emerald-400 transition-colors text-sm sm:text-base">{t.projects.back}</Link>
          <div className="font-bold text-emerald-400 text-sm sm:text-base md:text-lg">{`{ ${t.projects.projectsTitle} }`}</div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs sm:text-sm font-mono text-gray-300 hover:text-emerald-400 border border-gray-700 hover:border-emerald-500 rounded-md transition-colors"
            aria-label="Toggle language"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-8 md:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 md:mb-12 tracking-tight text-emerald-400 px-4 sm:px-0">{`{ ${t.projects.allWorks} }`}</h1>

        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          {projects.map((p, idx) => (
            <section key={p.id} className={`group relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-36 xl:gap-44 items-center px-4 sm:px-0`}>
              <div className={`order-1 ${idx % 2 === 1 ? 'md:order-last md:flex md:justify-end md:pr-6 lg:pr-10 xl:pr-12' : 'md:order-none md:pl-6 lg:pl-10 xl:pl-12'}`}>
                <div className="relative [perspective:1400px]">
                  {/* 3D picture frame - tilt towards text */}
                  <div className={`relative z-0 inline-block w-full md:w-[140%] max-w-none overflow-visible [transform-style:preserve-3d] transform-gpu ${idx % 2 === 1 ? 'origin-right' : 'origin-left'}`}>
                    <motion.div
                      className="relative"
                      initial={{ rotateY: idx % 2 === 1 ? -18 : 18, rotateX: 2, rotateZ: idx % 2 === 1 ? 2 : -2, x: idx % 2 === 1 ? 8 : -8 }}
                      whileHover={{ rotateY: 0, rotateX: 0, rotateZ: 0, x: 0, scale: 1.05, y: -2, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }}
                    >
                      <img src={p.image} alt={p.title} className="w-full h-auto rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className={`${idx % 2 === 1
                ? 'md:pr-8 lg:pr-12 xl:pr-20 md:text-right'
                : 'md:pl-8 lg:pl-12 xl:pl-20'} relative z-10`}> 
                <div className="inline-block border-2 border-emerald-500 text-emerald-300 rounded-md px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 mb-4 sm:mb-5 md:mb-6 font-semibold tracking-wide text-base sm:text-lg md:text-xl shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  {p.title.toUpperCase()}
                </div>
                <div className="max-w-3xl text-sm sm:text-base md:text-[1.08rem] lg:text-[1.2rem] text-gray-300 leading-6 sm:leading-7 md:leading-8 lg:leading-9 tracking-normal">
                  <div className="mb-2 sm:mb-3"><span className="text-emerald-400 font-semibold">{t.projects.problem}</span> {p.problem}</div>
                  <div><span className="text-emerald-400 font-semibold">{t.projects.solution}</span> {p.solution}</div>
                </div>
                {p.href && p.href !== '#' && (
                  <div className="mt-6 sm:mt-8">
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-gray-900 font-semibold px-5 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-md shadow hover:brightness-95 transition text-sm sm:text-base md:text-lg blink-attention">{t.projects.accessProject}</a>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AllProjects


