import Dock from './Dock'
import { VscHome, VscArchive, VscAccount } from 'react-icons/vsc'
import { SiLinkedin } from 'react-icons/si'
import Reveal from './Reveal'
import TextType from './TextType'
import DecryptedText from './DecryptedText'
import TrueFocus from './TrueFocus'
import { useTranslation } from '../hooks/useTranslation'

const GitHubIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-6 h-6' fill='currentColor' aria-hidden='true'>
    <path fillRule='evenodd' d='M12 2C6.477 2 2 6.486 2 12.02c0 4.43 2.865 8.185 6.839 9.504.5.094.683-.217.683-.484 0-.238-.009-.868-.014-1.704-2.782.606-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.636-1.338-2.221-.253-4.555-1.114-4.555-4.956 0-1.094.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.396.1 2.65.64.7 1.028 1.594 1.028 2.688 0 3.852-2.338 4.7-4.566 4.949.359.31.678.924.678 1.861 0 1.342-.012 2.424-.012 2.754 0 .269.18.582.689.483A10.02 10.02 0 0 0 22 12.02C22 6.486 17.523 2 12 2Z' clipRule='evenodd' />
  </svg>
)

function Hero() {
  const t = useTranslation()

  const dockItems = [
    {
      icon: <VscHome size={22} />,
      label: t.hero.dock.home,
      onClick: () => document.getElementById('tagline')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
    {
      icon: <GitHubIcon />,
      label: t.hero.dock.github,
      onClick: () => window.open('https://github.com/MauricioSts', '_blank')
    },
    {
      icon: <SiLinkedin size={22} />,
      label: t.hero.dock.linkedin,
      onClick: () => window.open('https://linkedin.com/in/mauriciosts', '_blank')
    },
    {
      icon: <VscArchive size={22} />,
      label: t.hero.dock.projects,
      onClick: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: <VscAccount size={22} />,
      label: t.hero.dock.contact,
      onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-5" id="home">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">

        {/* Photo Column */}
        <Reveal y={30}>
          <div className="flex flex-col items-center gap-5 flex-shrink-0">
            <div className="infinite-border-circle">
              <img
                src="/profile.jpeg"
                alt="Foto de perfil"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-xs font-mono">{t.hero.available}</span>
            </div>
          </div>
        </Reveal>

        {/* Text Column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0">
          <Reveal>
            <p className="section-label mb-3">{t.hero.greeting}</p>
          </Reveal>

          <Reveal>
            <TextType
              as="h1"
              text="Mauricio Santos"
              typingSpeed={55}
              variableSpeed={{ min: 35, max: 75 }}
              initialDelay={200}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-3.5 font-bold tracking-tight text-white"
              cursorClassName="text-emerald-400"
              textColors={["#ffffff"]}
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div id="tagline" className="mb-7 sm:mb-8">
              <TrueFocus
                sentence={t.hero.tagline}
                manualMode={false}
                blurAmount={4}
                borderColor="#34d399"
                glowColor="rgba(52, 211, 153, 0.55)"
                animationDuration={0.4}
                pauseBetweenAnimations={0.7}
                wordClass="text-lg sm:text-xl md:text-2xl"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-9 sm:mb-10 flex justify-center lg:justify-start">
              <Dock
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
                items={dockItems}
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="max-w-xl text-sm sm:text-base leading-relaxed text-gray-300 tracking-wide space-y-4">
              <p>
                <DecryptedText
                  text={t.hero.description1}
                  className="inline"
                  animateOn="view"
                  speed={18}
                  maxIterations={5}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                />
              </p>
              <p>
                <DecryptedText
                  text={t.hero.description2}
                  className="inline"
                  animateOn="view"
                  speed={18}
                  maxIterations={5}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                />
              </p>
              <p>
                <DecryptedText
                  text={t.hero.description3}
                  className="inline"
                  animateOn="view"
                  speed={18}
                  maxIterations={5}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
                />
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}

export default Hero
